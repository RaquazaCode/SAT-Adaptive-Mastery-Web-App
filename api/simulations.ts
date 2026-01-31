import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  estimateTheta,
  routeToModule2,
  calculateScore,
  getDifficultyIRTParams,
} from '../src/lib/simulation-routing';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Start simulation
  if (req.method === 'POST' && !req.query.id) {
    const { user_id, section } = req.body;

    if (!user_id || !section) {
      return res.status(400).json({
        error: 'user_id and section are required',
      });
    }

    if (section !== 'ReadingAndWriting' && section !== 'Math') {
      return res.status(400).json({
        error: 'section must be ReadingAndWriting or Math',
      });
    }

    // Generate Module 1 items (broad mix D1-D5)
    const { data: module1Items, error: itemsError } = await supabase
      .from('items')
      .select('id, difficulty, question_type_id')
      .in('difficulty', ['D1', 'D2', 'D3', 'D4', 'D5'])
      .limit(section === 'ReadingAndWriting' ? 27 : 22)
      .order('difficulty', { ascending: true });

    if (itemsError) {
      return res.status(500).json({ error: itemsError.message });
    }

    const module1ItemIds = module1Items?.map((item) => item.id) || [];

    const { data: simulation, error: simError } = await supabase
      .from('simulations')
      .insert({
        user_id,
        section,
        module1_item_ids: module1ItemIds,
        state: 'MODULE1_IN_PROGRESS',
      })
      .select()
      .single();

    if (simError) {
      return res.status(500).json({ error: simError.message });
    }

    return res.status(201).json({
      simulation_id: simulation.id,
      module1_item_ids: module1ItemIds,
      state: simulation.state,
    });
  }

  // Submit Module 1 and get routing
  if (req.method === 'POST' && req.query.id && req.query.action === 'module1') {
    const { id } = req.query;
    const { responses } = req.body; // Array of { item_id, answer, time_spent_s }

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: 'responses array is required' });
    }

    // Get simulation
    const { data: simulation, error: simError } = await supabase
      .from('simulations')
      .select('*')
      .eq('id', id)
      .single();

    if (simError || !simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }

    // Get items to check answers
    const { data: items, error: itemsError } = await supabase
      .from('items')
      .select('id, correct_answer, difficulty')
      .in('id', simulation.module1_item_ids);

    if (itemsError) {
      return res.status(500).json({ error: itemsError.message });
    }

    // Process responses
    const module1Responses = responses.map((resp: any) => {
      const item = items?.find((i) => i.id === resp.item_id);
      return {
        item_id: resp.item_id,
        answer: resp.answer,
        correct: item?.correct_answer === resp.answer,
        time_spent_s: resp.time_spent_s || 0,
      };
    });

    // Estimate theta using IRT
    const itemParams = items?.map((item) =>
      getDifficultyIRTParams(item.difficulty as any, true),
    ) || [];
    const theta1 = estimateTheta(module1Responses, itemParams);

    // Route to Module 2
    const module2Form = routeToModule2(theta1);

    // Generate Module 2 items based on routing
    const module2DifficultyRange =
      module2Form === 'M2_H' ? ['D3', 'D4', 'D5'] : ['D1', 'D2', 'D3'];
    const module2ItemCount = simulation.section === 'ReadingAndWriting' ? 27 : 22;

    const { data: module2Items, error: m2ItemsError } = await supabase
      .from('items')
      .select('id')
      .in('difficulty', module2DifficultyRange)
      .limit(module2ItemCount);

    if (m2ItemsError) {
      return res.status(500).json({ error: m2ItemsError.message });
    }

    const module2ItemIds = module2Items?.map((item) => item.id) || [];

    // Update simulation
    const { data: updatedSim, error: updateError } = await supabase
      .from('simulations')
      .update({
        module2_form: module2Form,
        module2_item_ids: module2ItemIds,
        theta_estimate: theta1,
        state: 'MODULE1_COMPLETE',
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // Log error events
    module1Responses.forEach(async (resp: any) => {
      if (!resp.correct) {
        await supabase.from('error_events').insert({
          item_id: resp.item_id,
          user_id: simulation.user_id,
          outcome: resp.time_spent_s > 90 ? 'TIMEOUT' : 'WRONG_TRAP',
          time_spent_s: resp.time_spent_s,
        });
      }
    });

    return res.status(200).json({
      simulation_id: id,
      routing_result: module2Form,
      module2_item_ids: module2ItemIds,
      theta_estimate: theta1,
      state: updatedSim.state,
    });
  }

  // Submit Module 2 and get final score
  if (req.method === 'POST' && req.query.id && req.query.action === 'module2') {
    const { id } = req.query;
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: 'responses array is required' });
    }

    // Get simulation
    const { data: simulation, error: simError } = await supabase
      .from('simulations')
      .select('*')
      .eq('id', id)
      .single();

    if (simError || !simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }

    // Get all items (Module 1 + Module 2)
    const allItemIds = [
      ...(simulation.module1_item_ids || []),
      ...(simulation.module2_item_ids || []),
    ];

    const { data: items, error: itemsError } = await supabase
      .from('items')
      .select('id, correct_answer, difficulty')
      .in('id', allItemIds);

    if (itemsError) {
      return res.status(500).json({ error: itemsError.message });
    }

    // Combine Module 1 and Module 2 responses
    // In production, Module 1 responses would be stored in simulation state
    const allResponses = responses.map((resp: any) => {
      const item = items?.find((i) => i.id === resp.item_id);
      return {
        item_id: resp.item_id,
        answer: resp.answer,
        correct: item?.correct_answer === resp.answer,
        time_spent_s: resp.time_spent_s || 0,
      };
    });

    // Estimate final theta
    const itemParams = items?.map((item) =>
      getDifficultyIRTParams(item.difficulty as any, true),
    ) || [];
    const theta2 = estimateTheta(allResponses, itemParams);

    // Calculate score
    const scoreResult = calculateScore(theta2, simulation.section as 'RW' | 'Math');

    // Update simulation
    const { data: updatedSim, error: updateError } = await supabase
      .from('simulations')
      .update({
        theta_estimate: theta2,
        score_estimate: scoreResult.score_estimate,
        state: 'SECTION_COMPLETE',
        completed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // Log error events for Module 2
    allResponses.forEach(async (resp: any) => {
      if (!resp.correct) {
        await supabase.from('error_events').insert({
          item_id: resp.item_id,
          user_id: simulation.user_id,
          outcome: resp.time_spent_s > 90 ? 'TIMEOUT' : 'WRONG_TRAP',
          time_spent_s: resp.time_spent_s,
        });
      }
    });

    return res.status(200).json({
      simulation_id: id,
      section_score: scoreResult.score_estimate,
      score_ci90: scoreResult.score_ci90,
      theta_estimate: theta2,
      state: updatedSim.state,
    });
  }

  // Get simulation state
  if (req.method === 'GET' && req.query.id) {
    const { id } = req.query;

    const { data: simulation, error } = await supabase
      .from('simulations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }

    return res.status(200).json({ simulation });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

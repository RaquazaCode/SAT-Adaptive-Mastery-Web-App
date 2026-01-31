import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateDrill } from '../../src/lib/adaptive-engine';

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

  if (req.method === 'POST') {
    const { user_id, target_skill_ids, difficulty_range, item_count } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    try {
      // Get recent error events (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: recentErrors, error: errorEventsError } = await supabase
        .from('error_events')
        .select('*, items(question_type_id)')
        .eq('user_id', user_id)
        .gte('timestamp', sevenDaysAgo.toISOString())
        .order('timestamp', { ascending: false })
        .limit(100);

      if (errorEventsError) {
        console.error('Error fetching error events:', errorEventsError);
      }

      // Get user skill states
      const { data: skillStates, error: skillStatesError } = await supabase
        .from('user_skill_states')
        .select('*')
        .eq('user_id', user_id);

      if (skillStatesError) {
        console.error('Error fetching skill states:', skillStatesError);
      }

      // Identify question types with highest error rates
      const errorCounts: Record<string, number> = {};
      recentErrors?.forEach((error: any) => {
        const questionTypeId = error.items?.question_type_id;
        if (questionTypeId) {
          errorCounts[questionTypeId] = (errorCounts[questionTypeId] || 0) + 1;
        }
      });

      // Sort by error count
      const topQuestionTypes = Object.entries(errorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([typeId]) => typeId);

      // Use target_skill_ids if provided, otherwise use top error types
      const questionTypeIds =
        target_skill_ids && target_skill_ids.length > 0
          ? target_skill_ids
          : topQuestionTypes;

      // Query items matching criteria
      let query = supabase.from('items').select('id, question_type_id, difficulty');

      if (questionTypeIds.length > 0) {
        query = query.in('question_type_id', questionTypeIds);
      }

      if (difficulty_range && difficulty_range.length > 0) {
        query = query.in('difficulty', difficulty_range);
      } else {
        // Default difficulty range based on user's skill states
        const avgDifficulty =
          skillStates && skillStates.length > 0
            ? skillStates.reduce(
                (sum, s) => {
                  const bandNum = parseInt(s.difficulty_band.replace('D', ''));
                  return sum + bandNum;
                },
                0,
              ) / skillStates.length
            : 2;
        const baseBand = Math.round(avgDifficulty);
        const bands = ['D1', 'D2', 'D3', 'D4', 'D5'];
        const startIdx = Math.max(0, baseBand - 1);
        const endIdx = Math.min(bands.length - 1, baseBand + 1);
        query = query.in('difficulty', bands.slice(startIdx, endIdx + 1));
      }

      // Exclude recently attempted items (last 3 days)
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const { data: recentItems } = await supabase
        .from('error_events')
        .select('item_id')
        .eq('user_id', user_id)
        .gte('timestamp', threeDaysAgo.toISOString());

      const recentItemIds = recentItems?.map((e) => e.item_id) || [];
      if (recentItemIds.length > 0) {
        query = query.not('id', 'in', `(${recentItemIds.join(',')})`);
      }

      const { data: items, error: itemsError } = await query.limit(
        item_count || 10,
      );

      if (itemsError) {
        return res.status(500).json({ error: itemsError.message });
      }

      // Create drill record
      const itemIds = items?.map((item) => item.id) || [];

      const { data: drill, error: drillError } = await supabase
        .from('drills')
        .insert({
          user_id,
          question_type_ids: questionTypeIds,
          difficulty_range: difficulty_range || ['D2', 'D3', 'D4'],
          item_ids: itemIds,
        })
        .select()
        .single();

      if (drillError) {
        return res.status(500).json({ error: drillError.message });
      }

      return res.status(201).json({
        drill_id: drill.id,
        item_ids: itemIds,
        question_types: questionTypeIds,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

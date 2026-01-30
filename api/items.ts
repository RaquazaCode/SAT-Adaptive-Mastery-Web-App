import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  if (req.method === 'GET') {
    const { question_type_id, difficulty, limit = '10' } = req.query;

    let query = supabase.from('items').select('*');

    if (question_type_id) {
      query = query.eq('question_type_id', question_type_id);
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    query = query.limit(parseInt(limit as string));

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ items: data });
  }

  if (req.method === 'POST') {
    // For MVP, this is admin-only. In production, add auth check.
    const { question_type_id, difficulty, stimulus, options, correct_answer, explanation, trap_ids, irt_b } = req.body;

    if (!question_type_id || !difficulty || !stimulus || !correct_answer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('items')
      .insert({
        question_type_id,
        difficulty,
        stimulus,
        options: options || null,
        correct_answer,
        explanation: explanation || null,
        trap_ids: trap_ids || [],
        irt_b: irt_b || (difficulty === 'D1' ? -1.5 : difficulty === 'D2' ? -0.5 : difficulty === 'D3' ? 0.5 : difficulty === 'D4' ? 1.5 : 2.5),
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ item: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

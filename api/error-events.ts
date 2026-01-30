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

  if (req.method === 'POST') {
    const { item_id, user_id, outcome, error_root_cause, time_spent_s } = req.body;

    if (!item_id || !user_id || !outcome) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('error_events')
      .insert({
        item_id,
        user_id,
        outcome,
        error_root_cause: error_root_cause || null,
        time_spent_s: time_spent_s || null,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ event: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

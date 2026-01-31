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
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const { data: skillStates, error } = await supabase
      .from('user_skill_states')
      .select('*')
      .eq('user_id', user_id)
      .order('accuracy', { ascending: true }); // Weakest first

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      skills: skillStates || [],
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

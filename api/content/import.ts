import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  validateQuestionType,
  validateItem,
  validateSkill,
  validateTrapType,
  getDefaultIrtB,
  type QuestionTypeInput,
  type ItemInput,
  type SkillInput,
  type TrapTypeInput,
} from './validate';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

interface BulkImportBody {
  skills?: SkillInput[];
  trap_types?: TrapTypeInput[];
  question_types?: QuestionTypeInput[];
  items?: ItemInput[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const body = req.body as BulkImportBody;

  const skills = Array.isArray(body.skills) ? body.skills : [];
  const trapTypes = Array.isArray(body.trap_types) ? body.trap_types : [];
  const questionTypes = Array.isArray(body.question_types) ? body.question_types : [];
  const items = Array.isArray(body.items) ? body.items : [];

  // Step 1: Validate skills
  for (let i = 0; i < skills.length; i++) {
    const result = validateSkill(skills[i]);
    if (!result.valid) {
      return res.status(400).json({ error: result.error, step: 'skills', index: i });
    }
  }

  // Step 2: Validate trap types
  for (let i = 0; i < trapTypes.length; i++) {
    const result = validateTrapType(trapTypes[i]);
    if (!result.valid) {
      return res.status(400).json({ error: result.error, step: 'trap_types', index: i });
    }
  }

  const skillIds = new Set(skills.map((s) => s.id));
  const trapIds = new Set(trapTypes.map((t) => t.id));

  // Step 3: Validate question types (after skills exist)
  for (let i = 0; i < questionTypes.length; i++) {
    const result = validateQuestionType(questionTypes[i], skillIds);
    if (!result.valid) {
      return res.status(400).json({ error: result.error, step: 'question_types', index: i });
    }
  }

  const questionTypeIds = new Set(questionTypes.map((qt) => qt.id));

  // Step 4: Validate items (after question types and trap types exist)
  for (let i = 0; i < items.length; i++) {
    const result = validateItem(items[i], questionTypeIds, trapIds);
    if (!result.valid) {
      return res.status(400).json({ error: result.error, step: 'items', index: i });
    }
  }

  // Insert in order: skills, trap_types, question_types, items
  const inserted = { skills: 0, trap_types: 0, question_types: 0, items: 0 };

  if (skills.length > 0) {
    const { error } = await supabase.from('skills').upsert(
      skills.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description ?? null,
        domain: s.domain,
      })),
      { onConflict: 'id' },
    );
    if (error) {
      return res.status(500).json({ error: error.message, step: 'skills' });
    }
    inserted.skills = skills.length;
  }

  if (trapTypes.length > 0) {
    const { error } = await supabase.from('trap_types').upsert(
      trapTypes.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description ?? null,
        question_type_ids: t.question_type_ids ?? [],
      })),
      { onConflict: 'id' },
    );
    if (error) {
      return res.status(500).json({ error: error.message, step: 'trap_types' });
    }
    inserted.trap_types = trapTypes.length;
  }

  if (questionTypes.length > 0) {
    const { error } = await supabase.from('question_types').upsert(
      questionTypes.map((qt) => ({
        id: qt.id,
        domain: qt.domain,
        skill_ids: qt.skill_ids ?? [],
        stimulus_format: qt.stimulus_format ?? null,
        time_budget_s: qt.time_budget_s ?? null,
        difficulty_markers: qt.difficulty_markers ?? [],
        trap_types: qt.trap_types ?? [],
      })),
      { onConflict: 'id' },
    );
    if (error) {
      return res.status(500).json({ error: error.message, step: 'question_types' });
    }
    inserted.question_types = questionTypes.length;
  }

  if (items.length > 0) {
    const rows = items.map((item) => ({
      question_type_id: item.question_type_id,
      difficulty: item.difficulty,
      stimulus: item.stimulus,
      options: item.options ?? null,
      correct_answer: item.correct_answer,
      explanation: item.explanation ?? null,
      trap_ids: item.trap_ids ?? [],
      irt_a: 1.0,
      irt_b: getDefaultIrtB(item.difficulty),
      irt_c: item.options?.length === 4 ? 0.25 : 0,
    }));
    const { error } = await supabase.from('items').insert(rows);
    if (error) {
      return res.status(500).json({ error: error.message, step: 'items' });
    }
    inserted.items = items.length;
  }

  return res.status(200).json({
    message: 'Bulk import completed',
    inserted,
  });
}

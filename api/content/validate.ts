/**
 * Content validation per PRD 04 and ChatGPT spec.
 * Question type ID pattern: [RW|M]_[DOMAIN]_[TYPE]_[SUBTYPE]
 */

/** PRD 04: [RW|M]_[DOMAIN]_[TYPE]_[SUBTYPE] */
const QUESTION_TYPE_ID_PATTERN = /^(RW|M)_[A-Z0-9_]+_[A-Z0-9_]+_[A-Z0-9_]+$/i;

const DIFFICULTY_BANDS = ['D1', 'D2', 'D3', 'D4', 'D5'] as const;

export interface QuestionTypeInput {
  id: string;
  domain: string;
  skill_ids?: string[];
  stimulus_format?: string;
  time_budget_s?: number;
  difficulty_markers?: string[];
  trap_types?: string[];
}

export interface ItemInput {
  question_type_id: string;
  difficulty: string;
  stimulus: string;
  options?: string[] | null;
  correct_answer: string;
  explanation?: string | null;
  trap_ids?: string[];
}

export interface SkillInput {
  id: string;
  name: string;
  description?: string | null;
  domain: string;
}

export interface TrapTypeInput {
  id: string;
  name: string;
  description?: string | null;
  question_type_ids?: string[];
}

export function validateQuestionType(
  qt: QuestionTypeInput,
  existingSkillIds: Set<string>,
): { valid: boolean; error?: string } {
  if (!QUESTION_TYPE_ID_PATTERN.test(qt.id)) {
    return {
      valid: false,
      error: `question_types[].id must match pattern [RW|M]_[DOMAIN]_[TYPE]_[SUBTYPE], got: ${qt.id}`,
    };
  }
  if (!qt.domain || typeof qt.domain !== 'string') {
    return { valid: false, error: `question_types[].domain is required, id: ${qt.id}` };
  }
  if (qt.time_budget_s != null) {
    const t = Number(qt.time_budget_s);
    if (t <= 0 || t >= 300) {
      return {
        valid: false,
        error: `question_types[].time_budget_s must be in (0, 300), id: ${qt.id}`,
      };
    }
  }
  if (qt.skill_ids?.length) {
    for (const sid of qt.skill_ids) {
      if (!existingSkillIds.has(sid)) {
        return {
          valid: false,
          error: `question_types[].skill_ids references unknown skill: ${sid}, id: ${qt.id}`,
        };
      }
    }
  }
  return { valid: true };
}

export function validateItem(
  item: ItemInput,
  existingQuestionTypeIds: Set<string>,
  existingTrapIds: Set<string>,
): { valid: boolean; error?: string } {
  if (!existingQuestionTypeIds.has(item.question_type_id)) {
    return {
      valid: false,
      error: `items[].question_type_id must reference existing question_type: ${item.question_type_id}`,
    };
  }
  if (!DIFFICULTY_BANDS.includes(item.difficulty as (typeof DIFFICULTY_BANDS)[number])) {
    return {
      valid: false,
      error: `items[].difficulty must be one of D1-D5, got: ${item.difficulty}`,
    };
  }
  if (typeof item.stimulus !== 'string') {
    return { valid: false, error: 'items[].stimulus must be a string' };
  }
  const len = item.stimulus.length;
  if (len < 10 || len > 2000) {
    return {
      valid: false,
      error: `items[].stimulus length must be 10-2000 characters, got: ${len}`,
    };
  }
  if (item.options != null && Array.isArray(item.options)) {
    if (item.options.length !== 4) {
      return {
        valid: false,
        error: 'items[].options must have exactly 4 options for MCQ',
      };
    }
    const nonEmpty = item.options.every((o) => typeof o === 'string' && o.trim().length > 0);
    if (!nonEmpty) {
      return { valid: false, error: 'items[].options entries must be non-empty strings' };
    }
    if (!item.options.includes(item.correct_answer)) {
      return {
        valid: false,
        error: 'items[].correct_answer must match one of the options for MCQ',
      };
    }
  }
  if (item.trap_ids?.length) {
    for (const tid of item.trap_ids) {
      if (!existingTrapIds.has(tid)) {
        return {
          valid: false,
          error: `items[].trap_ids references unknown trap_type: ${tid}`,
        };
      }
    }
  }
  return { valid: true };
}

export function validateSkill(skill: SkillInput): { valid: boolean; error?: string } {
  if (!skill.id || typeof skill.id !== 'string') {
    return { valid: false, error: 'skills[].id is required' };
  }
  if (!skill.name || typeof skill.name !== 'string') {
    return { valid: false, error: `skills[].name is required, id: ${skill.id}` };
  }
  if (!skill.domain || typeof skill.domain !== 'string') {
    return { valid: false, error: `skills[].domain is required, id: ${skill.id}` };
  }
  return { valid: true };
}

export function validateTrapType(trap: TrapTypeInput): { valid: boolean; error?: string } {
  if (!trap.id || typeof trap.id !== 'string') {
    return { valid: false, error: 'trap_types[].id is required' };
  }
  if (!trap.name || typeof trap.name !== 'string') {
    return { valid: false, error: `trap_types[].name is required, id: ${trap.id}` };
  }
  return { valid: true };
}

/** Map difficulty band to default irt_b (PRD 02 / ChatGPT) */
export function getDefaultIrtB(difficulty: string): number {
  const map: Record<string, number> = {
    D1: -1.5,
    D2: -0.5,
    D3: 0.5,
    D4: 1.5,
    D5: 2.5,
  };
  return map[difficulty] ?? 0;
}

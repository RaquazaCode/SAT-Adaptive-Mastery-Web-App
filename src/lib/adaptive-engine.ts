/**
 * Adaptive Engine - Core logic for drill generation and skill tracking
 * Based on PRD 02-adaptive-engine.md
 */

export interface DrillOptions {
  user_id: string;
  target_skill_ids?: string[];
  difficulty_range?: string[];
  item_count?: number;
}

export interface SkillState {
  skill_id: string;
  difficulty_band: string;
  accuracy: number;
  speed: number;
  last_updated: string;
}

export interface ErrorEvent {
  item_id: string;
  user_id: string;
  outcome: string;
  error_root_cause?: string;
  time_spent_s?: number;
  timestamp: string;
}

/**
 * Calculate weakness score for a skill
 * Formula: (1 - accuracy) * error_frequency_weight * time_penalty
 */
export function calculateWeaknessScore(
  skillId: string,
  userId: string,
  recentErrors: ErrorEvent[],
  skillState?: SkillState,
): number {
  const accuracy = skillState?.accuracy || 0.5; // Default if no data
  const skillErrors = recentErrors.filter(
    (e) => e.error_root_cause && e.outcome.startsWith('WRONG'),
  );

  const errorFrequencyWeight = 1.0 + skillErrors.length / 10;
  const avgTime = skillState?.speed || 60;
  const timeBudget = 75; // Average time budget
  const timePenalty = avgTime > timeBudget * 1.2 ? 1.5 : 1.0;

  return (1 - accuracy) * errorFrequencyWeight * timePenalty;
}

/**
 * Update skill state based on outcome
 */
export function updateSkillState(
  currentState: SkillState | null,
  outcome: string,
  timeSpent: number,
  difficulty: string,
): Partial<SkillState> {
  const isCorrect = outcome.startsWith('CORRECT');
  const isFast = outcome.includes('FAST');

  // Calculate new accuracy (weighted average)
  const currentAccuracy = currentState?.accuracy || 0.5;
  const newAccuracy = currentAccuracy * 0.8 + (isCorrect ? 1.0 : 0.0) * 0.2;

  // Calculate new speed (weighted average)
  const currentSpeed = currentState?.speed || 60;
  const newSpeed = currentSpeed * 0.8 + timeSpent * 0.2;

  // Determine difficulty band adjustment
  let newDifficultyBand = difficulty;
  if (isCorrect && isFast && currentState) {
    // Increase difficulty
    const bands = ['D1', 'D2', 'D3', 'D4', 'D5'];
    const currentIndex = bands.indexOf(currentState.difficulty_band);
    if (currentIndex < bands.length - 1) {
      newDifficultyBand = bands[currentIndex + 1];
    }
  } else if (!isCorrect && currentState) {
    // Decrease difficulty
    const bands = ['D1', 'D2', 'D3', 'D4', 'D5'];
    const currentIndex = bands.indexOf(currentState.difficulty_band);
    if (currentIndex > 0) {
      newDifficultyBand = bands[currentIndex - 1];
    }
  }

  return {
    accuracy: newAccuracy,
    speed: newSpeed,
    difficulty_band: newDifficultyBand,
    last_updated: new Date().toISOString(),
  };
}

/**
 * Generate drill based on user's error patterns and skill states
 * This is a simplified version - full implementation would query Supabase
 */
export function generateDrill(
  userId: string,
  options: DrillOptions = { user_id: userId },
): {
  question_type_ids: string[];
  difficulty_range: string[];
  item_count: number;
} {
  const {
    target_skill_ids,
    difficulty_range = ['D2', 'D3', 'D4'],
    item_count = 10,
  } = options;

  // In full implementation, this would:
  // 1. Query error_events for recent errors (last 7 days)
  // 2. Identify question types with highest error rates
  // 3. Query items matching those types and difficulty range
  // 4. Select items ensuring domain mix for R&W
  // 5. Return drill configuration

  return {
    question_type_ids: target_skill_ids || [],
    difficulty_range,
    item_count,
  };
}

/**
 * Check if user is at routing risk in Module 1
 */
export function checkRoutingRisk(
  module1Responses: Array<{ correct: boolean; time_spent_s: number }>,
  timeBudget: number = 71,
): {
  isAtRisk: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  const first10 = module1Responses.slice(0, 10);
  const accuracy = first10.filter((r) => r.correct).length / first10.length;
  const avgTime =
    first10.reduce((sum, r) => sum + r.time_spent_s, 0) / first10.length;
  const errorCount = first10.filter((r) => !r.correct).length;

  if (accuracy < 0.6) {
    reasons.push('Accuracy below 60% in first 10 questions');
  }
  if (avgTime > timeBudget * 1.2) {
    reasons.push('Average time exceeds time budget by 20%');
  }
  if (errorCount > 3) {
    reasons.push('More than 3 errors in first 10 questions');
  }

  return {
    isAtRisk: reasons.length > 0,
    reasons,
  };
}

/**
 * Simulation Routing Logic - Module 1 → Module 2 routing and scoring
 * Based on PRD 03-simulation.md and 02-adaptive-engine.md
 */

export interface ModuleResponse {
  item_id: string;
  answer: string;
  correct: boolean;
  time_spent_s: number;
}

export interface IRTParameters {
  a: number; // Discrimination
  b: number; // Difficulty
  c: number; // Guessing (0.25 for MCQ, 0.0 for SPR)
}

/**
 * Simplified 2PL IRT model to estimate ability (theta)
 * In production, use a proper IRT library
 */
export function estimateTheta(
  responses: ModuleResponse[],
  itemParams: IRTParameters[],
): number {
  // Simplified theta estimation using maximum likelihood
  // In production, use Newton-Raphson or other optimization methods

  if (responses.length === 0) return 0.0;

  // Simple approximation: average of item difficulties weighted by correctness
  let sum = 0;
  let count = 0;

  responses.forEach((response, index) => {
    const params = itemParams[index] || { a: 1.0, b: 0.0, c: 0.25 };
    if (response.correct) {
      sum += params.b - 0.5; // Correct answers suggest higher ability
      count++;
    } else {
      sum += params.b + 0.5; // Wrong answers suggest lower ability
      count++;
    }
  });

  return count > 0 ? sum / count : 0.0;
}

/**
 * Route to Module 2 form based on Module 1 performance
 * Route cutoff is approximately theta = 0.0
 */
export function routeToModule2(theta: number): 'M2_H' | 'M2_L' {
  const routeCutoff = 0.0;
  return theta >= routeCutoff ? 'M2_H' : 'M2_L';
}

/**
 * Map theta to SAT score (200-800 per section)
 * Simplified mapping - in production, use lookup tables from practice tests
 */
export function calculateScore(theta: number, section: 'RW' | 'Math'): {
  score_estimate: number;
  score_ci90: [number, number];
  routing_prob_M2_H?: number;
} {
  // Simplified linear mapping
  // In production, use IRT-based scaling with proper equating curves

  // Theta range approximately -3 to +3
  // Map to 200-800 scale
  const minTheta = -3.0;
  const maxTheta = 3.0;
  const minScore = 200;
  const maxScore = 800;

  const normalizedTheta = (theta - minTheta) / (maxTheta - minTheta);
  const scoreEstimate = Math.round(
    minScore + normalizedTheta * (maxScore - minScore),
  );

  // Clamp to valid range
  const clampedScore = Math.max(minScore, Math.min(maxScore, scoreEstimate));

  // Calculate confidence interval (simplified)
  const uncertainty = 30; // Points
  const score_ci90: [number, number] = [
    Math.max(minScore, clampedScore - uncertainty),
    Math.min(maxScore, clampedScore + uncertainty),
  ];

  // Calculate routing probability for Module 2 Hard
  const routing_prob_M2_H = theta >= 0.0 ? 0.7 + theta * 0.1 : 0.3 + theta * 0.1;
  const clampedProb = Math.max(0.0, Math.min(1.0, routing_prob_M2_H));

  return {
    score_estimate: clampedScore,
    score_ci90,
    routing_prob_M2_H: clampedProb,
  };
}

/**
 * Get default IRT parameters for a difficulty band
 */
export function getDifficultyIRTParams(
  difficulty: 'D1' | 'D2' | 'D3' | 'D4' | 'D5',
  isMCQ: boolean = true,
): IRTParameters {
  const difficultyMap: Record<string, number> = {
    D1: -1.5,
    D2: -0.5,
    D3: 0.5,
    D4: 1.5,
    D5: 2.5,
  };

  return {
    a: 1.0, // Discrimination (default)
    b: difficultyMap[difficulty] || 0.0, // Difficulty parameter
    c: isMCQ ? 0.25 : 0.0, // Guessing parameter
  };
}

/**
 * Calculate total score from section scores
 */
export function calculateTotalScore(
  rwScore: number,
  mathScore: number,
): number {
  return rwScore + mathScore; // 400-1600 range
}

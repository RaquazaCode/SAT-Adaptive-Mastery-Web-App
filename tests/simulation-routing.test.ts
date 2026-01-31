import { describe, it, expect } from 'vitest';
import {
  estimateTheta,
  routeToModule2,
  calculateScore,
  getDifficultyIRTParams,
  checkRoutingRisk,
} from '../src/lib/simulation-routing';

describe('Theta Estimation', () => {
  it('should estimate theta for correct responses', () => {
    const responses = [
      { item_id: '1', answer: 'A', correct: true, time_spent_s: 60 },
      { item_id: '2', answer: 'B', correct: true, time_spent_s: 65 },
      { item_id: '3', answer: 'C', correct: true, time_spent_s: 70 },
    ];
    const itemParams = [
      getDifficultyIRTParams('D2'),
      getDifficultyIRTParams('D2'),
      getDifficultyIRTParams('D3'),
    ];

    const theta = estimateTheta(responses, itemParams);
    expect(theta).toBeGreaterThan(-3);
    expect(theta).toBeLessThan(3);
  });

  it('should estimate lower theta for incorrect responses', () => {
    const responses = [
      { item_id: '1', answer: 'A', correct: false, time_spent_s: 60 },
      { item_id: '2', answer: 'B', correct: false, time_spent_s: 65 },
    ];
    const itemParams = [
      getDifficultyIRTParams('D2'),
      getDifficultyIRTParams('D2'),
    ];

    const theta = estimateTheta(responses, itemParams);
    expect(theta).toBeLessThan(0);
  });
});

describe('Module 2 Routing', () => {
  it('should route to M2_H for high theta', () => {
    const route = routeToModule2(0.5);
    expect(route).toBe('M2_H');
  });

  it('should route to M2_L for low theta', () => {
    const route = routeToModule2(-0.5);
    expect(route).toBe('M2_L');
  });

  it('should route to M2_H at cutoff', () => {
    const route = routeToModule2(0.0);
    expect(route).toBe('M2_H');
  });
});

describe('Score Calculation', () => {
  it('should calculate score in valid range', () => {
    const result = calculateScore(0.5, 'RW');
    expect(result.score_estimate).toBeGreaterThanOrEqual(200);
    expect(result.score_estimate).toBeLessThanOrEqual(800);
    expect(result.score_ci90[0]).toBeGreaterThanOrEqual(200);
    expect(result.score_ci90[1]).toBeLessThanOrEqual(800);
  });

  it('should include routing probability', () => {
    const result = calculateScore(0.5, 'RW');
    expect(result.routing_prob_M2_H).toBeGreaterThan(0);
    expect(result.routing_prob_M2_H).toBeLessThanOrEqual(1);
  });
});

describe('Routing Risk Detection', () => {
  it('should detect routing risk for low accuracy', () => {
    const responses = Array(10)
      .fill(null)
      .map((_, i) => ({
        correct: i < 5, // 50% accuracy
        time_spent_s: 60,
      }));

    const risk = checkRoutingRisk(responses);
    expect(risk.isAtRisk).toBe(true);
    expect(risk.reasons.length).toBeGreaterThan(0);
  });

  it('should detect routing risk for slow responses', () => {
    const responses = Array(10)
      .fill(null)
      .map(() => ({
        correct: true,
        time_spent_s: 100, // Exceeds 71s budget by >20%
      }));

    const risk = checkRoutingRisk(responses);
    expect(risk.isAtRisk).toBe(true);
  });

  it('should not flag risk for good performance', () => {
    const responses = Array(10)
      .fill(null)
      .map(() => ({
        correct: true,
        time_spent_s: 60,
      }));

    const risk = checkRoutingRisk(responses);
    expect(risk.isAtRisk).toBe(false);
  });
});

describe('IRT Parameters', () => {
  it('should return correct parameters for each difficulty', () => {
    const d1 = getDifficultyIRTParams('D1');
    expect(d1.b).toBe(-1.5);
    expect(d1.c).toBe(0.25); // MCQ

    const d5 = getDifficultyIRTParams('D5');
    expect(d5.b).toBe(2.5);
  });

  it('should handle SPR questions', () => {
    const params = getDifficultyIRTParams('D3', false);
    expect(params.c).toBe(0.0); // No guessing for SPR
  });
});

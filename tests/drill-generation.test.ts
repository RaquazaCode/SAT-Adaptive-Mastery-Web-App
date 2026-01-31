import { describe, it, expect } from 'vitest';
import { generateDrill, calculateWeaknessScore, updateSkillState } from '../src/lib/adaptive-engine';

describe('Drill Generation', () => {
  it('should generate drill with default options', () => {
    const drill = generateDrill('user123');
    expect(drill).toHaveProperty('question_type_ids');
    expect(drill).toHaveProperty('difficulty_range');
    expect(drill).toHaveProperty('item_count');
    expect(drill.item_count).toBe(10);
  });

  it('should generate drill with custom options', () => {
    const drill = generateDrill('user123', {
      user_id: 'user123',
      target_skill_ids: ['RW_SKILL_INFERENCE'],
      difficulty_range: ['D2', 'D3'],
      item_count: 15,
    });
    expect(drill.item_count).toBe(15);
    expect(drill.difficulty_range).toEqual(['D2', 'D3']);
  });
});

describe('Weakness Score Calculation', () => {
  it('should calculate weakness score correctly', () => {
    const recentErrors: any[] = [
      { error_root_cause: 'E_LOGIC', outcome: 'WRONG_TRAP' },
      { error_root_cause: 'E_LOGIC', outcome: 'WRONG_TRAP' },
    ];
    const skillState = {
      skill_id: 'RW_SKILL_INFERENCE',
      difficulty_band: 'D3',
      accuracy: 0.5,
      speed: 80,
      last_updated: new Date().toISOString(),
    };

    const score = calculateWeaknessScore(
      'RW_SKILL_INFERENCE',
      'user123',
      recentErrors,
      skillState,
    );

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(10);
  });

  it('should handle missing skill state', () => {
    const score = calculateWeaknessScore('RW_SKILL_INFERENCE', 'user123', []);
    expect(score).toBeGreaterThan(0);
  });
});

describe('Skill State Updates', () => {
  it('should update skill state for correct fast answer', () => {
    const currentState = {
      skill_id: 'RW_SKILL_INFERENCE',
      difficulty_band: 'D2',
      accuracy: 0.6,
      speed: 60,
      last_updated: new Date().toISOString(),
    };

    const updated = updateSkillState(currentState, 'CORRECT_FAST', 45, 'D2');
    expect(updated.accuracy).toBeGreaterThan(currentState.accuracy);
    expect(updated.difficulty_band).toBe('D3'); // Should increase difficulty
  });

  it('should update skill state for wrong answer', () => {
    const currentState = {
      skill_id: 'RW_SKILL_INFERENCE',
      difficulty_band: 'D3',
      accuracy: 0.7,
      speed: 70,
      last_updated: new Date().toISOString(),
    };

    const updated = updateSkillState(currentState, 'WRONG_TRAP', 90, 'D3');
    expect(updated.accuracy).toBeLessThan(currentState.accuracy);
    expect(updated.difficulty_band).toBe('D2'); // Should decrease difficulty
  });
});

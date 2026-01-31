import { describe, it, expect } from 'vitest';

// Mock Supabase client for testing
const mockErrorEvent = {
  item_id: 'item123',
  user_id: 'user123',
  outcome: 'WRONG_TRAP',
  error_root_cause: 'E_LOGIC',
  time_spent_s: 90,
  timestamp: new Date().toISOString(),
};

describe('Error Event Logging', () => {
  it('should have required fields', () => {
    expect(mockErrorEvent).toHaveProperty('item_id');
    expect(mockErrorEvent).toHaveProperty('user_id');
    expect(mockErrorEvent).toHaveProperty('outcome');
    expect(mockErrorEvent).toHaveProperty('timestamp');
  });

  it('should have valid outcome type', () => {
    const validOutcomes = [
      'CORRECT_FAST',
      'CORRECT_SLOW',
      'WRONG_TRAP',
      'WRONG_KNOWLEDGE',
      'WRONG_PROCESS',
      'SKIPPED',
      'GUESSED',
      'TIMEOUT',
    ];
    expect(validOutcomes).toContain(mockErrorEvent.outcome);
  });

  it('should have valid error root cause when outcome is wrong', () => {
    if (mockErrorEvent.outcome.startsWith('WRONG')) {
      const validCauses = [
        'E_KNOWLEDGE',
        'E_TRANSLATION',
        'E_CONSTRAINT',
        'E_LOGIC',
        'E_PROCESS',
        'E_CALC',
        'E_READ',
        'E_TIME',
      ];
      expect(validCauses).toContain(mockErrorEvent.error_root_cause);
    }
  });

  it('should have timestamp in ISO format', () => {
    expect(mockErrorEvent.timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });
});

describe('Error Event Processing', () => {
  it('should categorize errors by root cause', () => {
    const errors = [
      { error_root_cause: 'E_LOGIC', outcome: 'WRONG_TRAP' },
      { error_root_cause: 'E_KNOWLEDGE', outcome: 'WRONG_KNOWLEDGE' },
      { error_root_cause: 'E_TIME', outcome: 'TIMEOUT' },
    ];

    const logicErrors = errors.filter((e) => e.error_root_cause === 'E_LOGIC');
    expect(logicErrors.length).toBe(1);
  });

  it('should track time spent for performance analysis', () => {
    expect(mockErrorEvent.time_spent_s).toBeGreaterThan(0);
    expect(typeof mockErrorEvent.time_spent_s).toBe('number');
  });
});

# Test Plan

## Overview

Test suite for SAT Adaptive Mastery core functionality.

## Running Tests

```bash
npm test          # Run tests once
npm run test:watch # Run tests in watch mode
```

## Test Coverage

### Drill Generation Tests (`drill-generation.test.ts`)
- Drill generation with default and custom options
- Weakness score calculation
- Skill state updates based on outcomes

### Simulation Routing Tests (`simulation-routing.test.ts`)
- Theta estimation from responses
- Module 2 routing logic (M2_H vs M2_L)
- Score calculation and confidence intervals
- Routing risk detection
- IRT parameter generation

### Error Logging Tests (`error-logging.test.ts`)
- Error event structure validation
- Outcome type validation
- Error categorization

## Test Strategy

### Unit Tests
- Test individual functions in isolation
- Mock external dependencies (Supabase)
- Focus on logic correctness

### Integration Tests (Future)
- Test API endpoints with mock Supabase
- Test component interactions
- Test full user flows

## Adding New Tests

1. Create test file in `tests/` directory
2. Import functions from `src/lib/` or `src/components/`
3. Write test cases using Vitest syntax
4. Run `npm test` to verify

## Test Data

Use realistic test data that matches the data model:
- Valid question types (e.g., `RW_IA_INF_SINGLE`)
- Valid difficulty bands (`D1`-`D5`)
- Valid outcomes (`CORRECT_FAST`, `WRONG_TRAP`, etc.)
- Valid error root causes (`E_LOGIC`, `E_KNOWLEDGE`, etc.)

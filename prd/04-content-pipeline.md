# Content Pipeline and Ingestion

## Purpose

This document defines the workflow for ingesting, validating, and managing SAT question content, including question types, items, and associated metadata.

## Content Sources

### Initial Seed Data

For MVP, seed data should include:
- Question type taxonomy (all RW and Math question types)
- Skill definitions
- Trap type definitions
- Sample items (10-20 per question type, covering D1-D5)

### Future Content Sources

- Official College Board practice tests (publicly available)
- Licensed content from prep providers
- User-generated content (future phase)

## Content Structure

### Question Type Definition

Each question type requires:
- `id`: Unique identifier (e.g., `RW_IA_INF_SINGLE`)
- `domain`: Content domain
- `skill_ids`: Array of related skills
- `stimulus_format`: Text, graph, table, equation, etc.
- `stem_templates`: Example question stems
- `solution_logic`: Step-by-step solution approach
- `trap_types`: Common trap patterns
- `time_budget_s`: Expected time to solve
- `difficulty_markers`: Indicators of D1-D5 difficulty
- `mastery_targets`: Accuracy/speed targets for mastery

### Item Definition

Each item requires:
- `id`: UUID
- `question_type_id`: Links to question type
- `difficulty`: D1-D5 band
- `stimulus`: Question text/stimulus
- `options`: For MCQ, array of 4 options
- `correct_answer`: Correct answer value
- `explanation`: Step-by-step explanation
- `trap_ids`: Which traps this item uses
- `irt_a`: Discrimination parameter (default 1.0)
- `irt_b`: Difficulty parameter (mapped from difficulty band)
- `irt_c`: Guessing parameter (0.25 for MCQ, 0.0 for SPR)

## Ingestion Workflow

### Step 1: Question Type Registration

1. Create or update `question_types` record
2. Validate required fields
3. Link to `skills` and `trap_types`

### Step 2: Item Creation

1. Create `items` record with:
   - Required fields (stimulus, options, correct_answer)
   - Question type linkage
   - Difficulty assignment
2. Validate:
   - MCQ has exactly 4 options
   - SPR has no options
   - Correct answer matches format
   - Stimulus is non-empty
3. Auto-assign IRT parameters based on difficulty band

### Step 3: Quality Checks

- Verify trap types are valid
- Check time budget is reasonable for question type
- Ensure explanation is complete
- Validate option formatting (no duplicates, plausible distractors)

## Validation Rules

### Question Type Validation

- `id` must match pattern: `[RW|M]_[DOMAIN]_[TYPE]_[SUBTYPE]`
- `domain` must be valid (RW_DOMAIN_* or M_DOMAIN_*)
- `skill_ids` must reference existing skills
- `time_budget_s` must be > 0 and < 300

### Item Validation

- `stimulus` length: 10-2000 characters
- MCQ: Exactly 4 options, all non-empty
- SPR: No options field
- `correct_answer` matches option format (for MCQ) or is numeric/text (for SPR)
- `difficulty` is one of: D1, D2, D3, D4, D5

### Trap Validation

- Trap IDs must reference existing `trap_types`
- Each trap should have description
- Trap should be linked to appropriate question types

## Content Management

### Bulk Import

For MVP, support JSON import format:
```json
{
  "question_types": [...],
  "items": [...],
  "skills": [...],
  "trap_types": [...]
}
```

### Versioning

- Track content versions (for future updates)
- Maintain audit log of changes
- Support content rollback

### Tagging

- Tag items by:
  - Question type
  - Domain
  - Difficulty
  - Skill
  - Trap type
  - Source (official, licensed, generated)

## Content Quality Metrics

### Item Quality Score

- Distractor quality (are wrong answers plausible?)
- Explanation completeness
- Time budget accuracy
- Difficulty calibration

### Question Type Coverage

- Ensure all question types have items across D1-D5
- Track coverage gaps
- Prioritize seed content for missing combinations

## MVP Content Requirements

### Minimum Seed Data

- All question types defined (from research docs)
- 5-10 items per question type (distributed across D1-D5)
- All skills defined
- Common trap types defined
- Sample explanations for each item

### Content Priority

1. High-frequency question types (RW_IA_INF_SINGLE, M_ALG_LINEAR, etc.)
2. D2-D4 difficulty items (most common in real test)
3. Complete question type taxonomy
4. Basic explanations (can be enhanced later)

## Future Enhancements

- Content authoring UI
- Automated difficulty calibration
- A/B testing for explanations
- User feedback on item quality
- Content moderation workflow

## References

- Source: `research/ChatGPT Deep Research sat_mastery_knowledge_base_spec.md` - Section 1.2
- Source: `research/Gemini Deep Research SAT Knowledge Base Specification.md` - Section 1.2

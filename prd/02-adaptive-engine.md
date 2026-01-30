# Adaptive Engine and Routing Logic

## Purpose

This document defines the adaptive learning engine that selects practice items, sequences drills, and routes users through simulations based on error patterns, timing behavior, and skill mastery.

## Core Principles

1. **Error-driven selection**: Prioritize question types where the user has recent errors
2. **Difficulty progression**: Start at estimated ability level, adjust based on performance
3. **Time awareness**: Flag slow responses and adjust difficulty accordingly
4. **Skill mastery tracking**: Update per-skill state after each attempt

## Routing Rules

### Module 1 → Module 2 Routing (Simulation)

After Module 1 completion:
1. Estimate ability `theta` using IRT-based scoring
2. Apply routing threshold:
   - If `theta >= route_cut`: Route to `M2_H` (higher difficulty)
   - Else: Route to `M2_L` (lower difficulty)

**Routing Criticality**: Missing 30-40% of Module 1 questions (8-10 in RW, 7-9 in Math) risks routing to M2_L, capping score potential around 600-650.

### Drill Sequencing Rules

#### Initial Selection
- Start with question types where user has `accuracy < 0.7` or recent errors
- Prefer difficulty bands matching current `UserSkillState.difficulty_band`
- Mix domains (for R&W: IA, CS, SEC, EOI)

#### Adaptive Adjustment
- If `CORRECT_FAST`: Increase difficulty by 1 band (D2 → D3)
- If `CORRECT_SLOW`: Maintain current difficulty, flag for review
- If `WRONG_TRAP` or `WRONG_KNOWLEDGE`: Decrease difficulty by 1 band, add to review queue
- If `TIMEOUT`: Decrease difficulty, flag time management issue

#### Review Queue
- After drill completion, show items with:
  - `WRONG_TRAP` outcomes
  - `CORRECT_SLOW` outcomes
  - Items where user spent > 2x `time_budget_s`

## Scoring Abstraction

### Two-Layer Scoring Model

1. **Training Score** (Internal)
   - Ability estimate `theta` on stable internal scale
   - Updated after every attempt
   - Range: approximately -3 to +3

2. **SAT Score Estimate** (External)
   - Map `theta` to SAT score band (200-800 per section)
   - Include confidence interval (90% CI)
   - Example mapping:
     ```json
     {
       "section": "RW",
       "theta": 0.85,
       "score_estimate": 720,
       "score_ci90": [690, 750],
       "routing_prob_M2_H": 0.78
     }
     ```

### IRT Parameters (Simplified MVP)

For MVP, use simplified 2PL model:
- `a` (discrimination): Default 1.0 for all items
- `b` (difficulty): Mapped from difficulty band (D1=-1.5, D2=-0.5, D3=0.5, D4=1.5, D5=2.5)
- `c` (guessing): 0.25 for MCQ (4 options), 0.0 for SPR

### Score Explanation Rules

- Missing a harder item can hurt less than missing an easy item
- Routing matters because Module 2 has different difficulty mixes
- Score is not a simple count-right

## Difficulty Progression Logic

### Test-Maker View (Item Design)

- **D1-D2**: Direct retrieval or single rule application, distractors obviously wrong
- **D3**: Two-step reasoning, distractors plausible if you skip a step
- **D4-D5**: Minimal cues, tight wording, multiple constraints, near-paraphrase distractors

### User Progression

- Start diagnostic at D2-D3 mix
- After 5-10 items, estimate initial `theta`
- Adjust drill difficulty to match `theta ± 0.5`
- For simulations, Module 1 uses broad mix (D1-D5), Module 2 uses targeted mix based on routing

## Drill Generation Algorithm

### Inputs
- `user_id`
- `target_skill_ids` (optional, for focused practice)
- `difficulty_range` (optional, defaults to user's current band ± 1)
- `item_count` (default: 10)

### Process
1. Query `error_events` for recent errors (last 7 days)
2. Identify question types with highest error rates
3. Query `items` matching:
   - Question types from step 2 (or `target_skill_ids`)
   - Difficulty in `difficulty_range`
   - Not recently attempted (last 3 days)
4. Select `item_count` items, ensuring domain mix for R&W
5. Create `drill` record with selected `item_ids`

### Output
- `drill` object with `item_ids` array
- Items ordered by estimated difficulty (ascending)

## Weakness Scoring

### Per-Skill Weakness Score

```
weakness_score = (1 - accuracy) * error_frequency_weight * time_penalty
```

Where:
- `accuracy`: From `UserSkillState` or recent attempts
- `error_frequency_weight`: 1.0 + (recent_errors / 10)
- `time_penalty`: 1.0 if average time < time_budget, else 1.5

### Routing Risk Indicator

Flag "Routing Risk" when:
- Module 1 accuracy < 0.6
- Average time per question > time_budget * 1.2
- More than 3 errors in first 10 questions

## References

- Source: `research/ChatGPT Deep Research sat_mastery_knowledge_base_spec.md` - Sections 1.1.2, 1.1.4
- Source: `research/Gemini Deep Research SAT Knowledge Base Specification.md` - Section 1.1.2

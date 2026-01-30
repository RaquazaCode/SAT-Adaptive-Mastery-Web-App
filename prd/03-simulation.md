# Simulation Flow and Timing

## Purpose

This document defines the full-length SAT simulation experience, including module-based routing, timing constraints, and scoring feedback.

## Test Structure

### Section Layout

| Section | Modules | Questions per Module | Total Questions | Time per Module | Total Time |
|---------|---------|---------------------|-----------------|----------------|------------|
| Reading & Writing | 2 | 27 | 54 | 32 min | 64 min |
| Math | 2 | 22 | 44 | 35 min | 70 min |
| **Total Exam** | 4 | - | 98 | - | 134 min |

### Module Navigation Rules

- **Within a module**: User can move freely between questions
- **Module transition**: Once Module 2 starts, Module 1 is locked (no going back)
- **Section transition**: User can review Module 2 before submitting section

### Question Sequencing (R&W)

Reading and Writing modules are grouped by content domain in this order:
1. Craft and Structure
2. Information and Ideas
3. Standard English Conventions
4. Expression of Ideas

**App impact**: Simulations should mirror this domain-block structure for test realism.

## Module 1: Routing Module

### Composition
- Broad mix of Easy (D1-D2), Medium (D3), and Hard (D4-D5) questions
- Covers all domains for the section
- Includes 2 pretest items (unscored, indistinguishable to user)

### Function
- Estimate provisional ability `theta` for the section
- Determine routing to Module 2 form

### Routing Decision

After Module 1 completion:
```pseudocode
theta1 = IRT_estimate_theta(module1_responses)
if theta1 >= route_cut:
    module2 = M2_H  // Higher difficulty
else:
    module2 = M2_L  // Lower difficulty
```

**Route cutoff**: Approximately `theta = 0.0` (varies by section)

### Routing Risk Indicators

Show warnings when:
- Accuracy < 60% after first 10 questions
- Average time > 1.2x time budget
- More than 3 errors in first 10 questions

## Module 2: Targeted Module

### M2_H (Higher Difficulty)
- Higher difficulty distribution (mostly D3-D5)
- Prerequisite for scoring above ~600
- Floor is high, ceiling is 800

### M2_L (Lower Difficulty)
- Lower difficulty items (mostly D1-D3)
- Routing here caps section score around 600-650
- Even perfect performance cannot exceed ~650

## Timing and Pacing

### Time Budgets

- **R&W**: ~71 seconds per question average
- **Math**: ~95 seconds per question average

### Timing UX

- Show countdown timer per module
- Warn when < 5 minutes remaining
- Auto-submit module when time expires
- Show per-question time spent (after submission)

### Pacing Guidance

- Flag questions where user spent > 2x time budget
- Suggest skipping and returning if > 1.5x time budget
- Track "rushing" (answered in < 30% of time budget)

## Scoring and Feedback

### Final Score Calculation

```pseudocode
theta2 = IRT_estimate_theta(module1_responses + module2_responses)
section_score = scale(theta2)  // Map to 200-800 range
total_score = RW_score + Math_score  // 400-1600 range
```

### Score Display

Show:
- Section scores (RW: 200-800, Math: 200-800)
- Total score (400-1600)
- Score confidence interval (90% CI)
- Routing outcome (M2_H vs M2_L) and its impact

### Feedback Breakdown

After simulation completion:
1. **Overall Performance**
   - Total score and section scores
   - Percentile estimate (if available)

2. **Section Analysis**
   - Questions correct/incorrect
   - Time management flags
   - Domain performance (for R&W)

3. **Skill Weaknesses**
   - Top 3-5 skills needing improvement
   - Link to focused drills

4. **Recommended Next Steps**
   - Suggested drill types
   - Focus areas for next simulation

## Pretest Items

- Each module contains 2 pretest items
- Indistinguishable from scored items
- Used for future test calibration
- Do not count toward score
- User cannot know which items are pretest

## Desmos Integration (Math Section)

- Built-in graphing calculator available for entire Math section
- Tag strategies as "Desmos-Active" or "Desmos-Passive"
- For MVP: Embed Desmos calculator widget or link to Desmos

## Simulation States

### State Machine

```
NOT_STARTED → MODULE1_IN_PROGRESS → MODULE1_COMPLETE → 
MODULE2_IN_PROGRESS → MODULE2_COMPLETE → SECTION_COMPLETE → 
FEEDBACK_SHOWN
```

### State Transitions

- Start simulation → `MODULE1_IN_PROGRESS`
- Submit Module 1 → `MODULE1_COMPLETE`, show routing result
- Start Module 2 → `MODULE2_IN_PROGRESS`
- Submit Module 2 → `MODULE2_COMPLETE`
- Submit section → `SECTION_COMPLETE`, calculate scores
- View feedback → `FEEDBACK_SHOWN`

## UX Requirements

### Module Transition Screen

Show:
- Module 1 summary (questions answered, time remaining)
- Routing result (M2_H or M2_L)
- Brief explanation of what Module 2 will contain
- "Continue" button

### During Module

- Question counter (e.g., "Question 5 of 27")
- Timer (countdown)
- Navigation: Previous/Next buttons
- Flag for review checkbox
- Submit Module button (disabled until all questions answered or time expires)

### After Section

- Score summary
- Detailed breakdown
- Skill weaknesses
- Recommended drills
- Option to start next section or exit

## References

- Source: `research/ChatGPT Deep Research sat_mastery_knowledge_base_spec.md` - Sections 1.1.1, 1.1.2, 1.1.3, 1.1.4
- Source: `research/Gemini Deep Research SAT Knowledge Base Specification.md` - Sections 1.1.1, 1.1.2

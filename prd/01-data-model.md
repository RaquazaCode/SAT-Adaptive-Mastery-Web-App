# Data Model and Schema

## Purpose

This document defines the core data model for the SAT Adaptive Mastery system. All entities, enums, and relationships are designed to be stored, queried, and used by the learning engine.

## Core Entities

### Exam Structure

- **Exam**: SAT (Digital, section-adaptive, 2-stage MST)
- **Section**: `ReadingAndWriting` | `Math`
- **Module**: Stage within section (`Module1`, `Module2`)
- **Item**: One question with its own stimulus
  - R&W: Always 4-option MCQ
  - Math: ~75% MCQ, ~25% SPR (student-produced response)

### Content Taxonomy

- **QuestionType**: Atomic, labeled type (e.g., `RW_IA_INF_SINGLE`)
  - Includes: `id`, `domain`, `skill_ids`, `stimulus_format`, `stem_templates`, `solution_logic`, `trap_types`, `time_budget_s`, `difficulty_markers`, `mastery_targets`, `common_errors`
- **Skill**: Ability needed to solve a question type (e.g., `RW_SKILL_INFERENCE`)
- **Concept**: Teachable prerequisite (e.g., `M_CONCEPT_LINEAR_SLOPE`)
- **TrapType**: Wrong-answer construction pattern (e.g., `TRAP_HALF_RIGHT`)

### User State and Events

- **ErrorEvent**: One wrong or slow attempt with structured fields
  - Fields: `item_id`, `user_id`, `outcome`, `error_root_cause`, `time_spent_s`, `timestamp`
- **UserSkillState**: Per-skill mastery tracking
  - Fields: `skill_id`, `difficulty_band`, `accuracy`, `speed`, `last_updated`
- **Drill**: Generated practice set tied to question types and difficulty
- **Simulation**: Full or partial timed test session

## Core Enums

### Difficulty Bands

- `D1` - Intro (direct, low abstraction)
- `D2` - Standard (single-step reasoning)
- `D3` - Mixed (two-step or multi-sentence reasoning)
- `D4` - Hard (high distractor quality, hidden constraints)
- `D5` - Elite (tight wording, multi-constraint, minimal cues)

### Attempt Outcomes

- `CORRECT_FAST`
- `CORRECT_SLOW`
- `WRONG_TRAP`
- `WRONG_KNOWLEDGE`
- `WRONG_PROCESS`
- `SKIPPED`
- `GUESSED`
- `TIMEOUT`

### Error Root Causes

- `E_KNOWLEDGE` - Did not know concept or rule
- `E_TRANSLATION` - Words to logic/equation mis-map
- `E_CONSTRAINT` - Missed condition, boundary, unit
- `E_LOGIC` - Invalid inference, wrong conclusion
- `E_PROCESS` - Bad plan, no elimination, no checking
- `E_CALC` - Algebra/arithmetic error
- `E_READ` - Misread text, punctuation, or graph
- `E_TIME` - Ran out, slow method choice

### Evidence Tags

- `EVID_TEXT`
- `EVID_GRAPH`
- `EVID_TABLE`
- `EVID_EQUATION`
- `EVID_NONE`

## Reading and Writing Domains

- `RW_DOMAIN_IA` - Information and Ideas
- `RW_DOMAIN_CS` - Craft and Structure
- `RW_DOMAIN_SEC` - Standard English Conventions
- `RW_DOMAIN_EOI` - Expression of Ideas

## Database Schema (Supabase)

### Tables

#### `question_types`
- `id` (text, primary key)
- `domain` (text)
- `skill_ids` (text[])
- `stimulus_format` (text)
- `time_budget_s` (integer)
- `difficulty_markers` (text[])
- `trap_types` (text[])

#### `skills`
- `id` (text, primary key)
- `name` (text)
- `description` (text)
- `domain` (text)

#### `trap_types`
- `id` (text, primary key)
- `name` (text)
- `description` (text)
- `question_type_ids` (text[])

#### `items`
- `id` (uuid, primary key)
- `question_type_id` (text, foreign key)
- `difficulty` (text) - D1-D5
- `stimulus` (text)
- `options` (jsonb) - For MCQ
- `correct_answer` (text)
- `explanation` (text)
- `trap_ids` (text[])

#### `error_events`
- `id` (uuid, primary key)
- `item_id` (uuid, foreign key)
- `user_id` (text) - For MVP, can be session-based
- `outcome` (text)
- `error_root_cause` (text)
- `time_spent_s` (integer)
- `timestamp` (timestamp)

#### `user_skill_states`
- `id` (uuid, primary key)
- `user_id` (text)
- `skill_id` (text, foreign key)
- `difficulty_band` (text)
- `accuracy` (float)
- `speed` (float) - Average time spent
- `last_updated` (timestamp)

#### `drills`
- `id` (uuid, primary key)
- `user_id` (text)
- `question_type_ids` (text[])
- `difficulty_range` (text[])
- `item_ids` (uuid[])
- `created_at` (timestamp)

#### `simulations`
- `id` (uuid, primary key)
- `user_id` (text)
- `section` (text)
- `module1_item_ids` (uuid[])
- `module2_form` (text) - M2_H or M2_L
- `module2_item_ids` (uuid[])
- `theta_estimate` (float)
- `score_estimate` (integer)
- `started_at` (timestamp)
- `completed_at` (timestamp)

## References

- Source: `research/ChatGPT Deep Research sat_mastery_knowledge_base_spec.md` - Sections 0, 1.2

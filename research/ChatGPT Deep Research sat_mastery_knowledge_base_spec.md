# SAT Mastery Knowledge Base Spec (Digital SAT)

> Purpose: A product-ready operating model of the SAT and the prep ecosystem. Everything is designed to be stored, queried, and used by a learning engine.

---

## 0. Definitions and Data Model

### 0.1 Entities

- **Exam**: SAT (Digital, section-adaptive, 2-stage MST)
- **Section**: ReadingAndWriting, Math
- **Module**: stage within section (Module1, Module2)
- **Item**: one question with its own stimulus (R&W always MCQ; Math MCQ or SPR)
- **QuestionType**: atomic, labeled type (ex: RW_IA_INF_SINGLE)
- **Skill**: ability needed to solve a question type (ex: RW_SKILL_INFERENCE)
- **Concept**: teachable prerequisite (ex: M_CONCEPT_LINEAR_SLOPE)
- **TrapType**: wrong-answer construction pattern (ex: TRAP_HALF_RIGHT)
- **Strategy**: repeatable procedure with scope and failure cases
- **ErrorEvent**: one wrong or slow attempt with structured fields
- **UserSkillState**: (skill_id, difficulty_band, accuracy, speed)
- **Drill**: a generated practice set tied to question types and difficulty
- **Simulation**: full or partial timed test session

### 0.2 Core IDs and Enums

#### Difficulty
- `D1` Intro (direct, low abstraction)
- `D2` Standard (single-step reasoning)
- `D3` Mixed (two-step or multi-sentence reasoning)
- `D4` Hard (high distractor quality, hidden constraints)
- `D5` Elite (tight wording, multi-constraint, minimal cues)

#### Attempt outcome
- `CORRECT_FAST`, `CORRECT_SLOW`, `WRONG_TRAP`, `WRONG_KNOWLEDGE`, `WRONG_PROCESS`, `SKIPPED`, `GUESSED`, `TIMEOUT`

#### Error root cause (primary)
- `E_KNOWLEDGE` (did not know concept or rule)
- `E_TRANSLATION` (words to logic/equation mis-map)
- `E_CONSTRAINT` (missed condition, boundary, unit)
- `E_LOGIC` (invalid inference, wrong conclusion)
- `E_PROCESS` (bad plan, no elimination, no checking)
- `E_CALC` (algebra/arithmetic error)
- `E_READ` (misread text, punctuation, or graph)
- `E_TIME` (ran out, slow method choice)

#### Evidence tags
- `EVID_TEXT`, `EVID_GRAPH`, `EVID_TABLE`, `EVID_EQUATION`, `EVID_NONE`

---

## 1. SAT Exam Deconstruction

### 1.1 Test Architecture

#### 1.1.1 Digital SAT: Section and module layout

| Section | Modules | Time per module | Total time | Questions per module | Total questions | Scored vs pretest |
|---|---:|---:|---:|---:|---:|---|
| Reading and Writing | 2 | 32 min | 64 min | 27 | 54 | 25 scored + 2 pretest per module |
| Math | 2 | 35 min | 70 min | 22 | 44 | 20 scored + 2 pretest per module |

Notes for product:
- Navigation rule: within a module, user can move freely. Once module changes, prior module is locked.
- R&W item format: 4-option MCQ only.
- Math item formats: ~75% MCQ, ~25% SPR (student-produced response).
- Math tools: calculator allowed throughout. Bluebook provides a built-in graphing calculator. A formula/reference sheet is provided.

#### 1.1.2 Adaptive structure (2-stage MST)

Model:
- **Module 1 is routing**: broad mix of easy, medium, hard.
- **Module 2 is targeted**: difficulty mix shifts based on Module 1 performance.

Implementation view:
- Treat each question as an item with IRT parameters (difficulty `b`, discrimination `a`, guessing `c` mostly for MCQ).
- After Module 1, estimate ability `theta` for the section.
- Route to Module 2 form `M2_H` (higher difficulty) or `M2_L` (lower difficulty) using a threshold on `theta`.

Pseudocode:
```text
theta1 = IRT_estimate_theta(module1_responses)
if theta1 >= route_cut: module2 = M2_H
else: module2 = M2_L

theta2 = IRT_estimate_theta(module1_responses + module2_responses)
section_score = scale(theta2)
```

Practical app rule:
- Simulations should include routing and two distinct Module 2 pools.
- Drills can be nonadaptive or micro-adaptive. Full simulations must mirror routing.

#### 1.1.3 Question sequencing inside a module

Reading and Writing modules are grouped by content domain in this order:
1) Craft and Structure
2) Information and Ideas
3) Standard English Conventions
4) Expression of Ideas

App impact:
- Users should practice both (a) mixed domain sets and (b) domain-block sets. Domain-block sets match test feel.

#### 1.1.4 Scoring mechanics

Facts and constraints:
- Total score = R&W section score (200–800) + Math section score (200–800) = 400–1600.
- Digital SAT uses adaptive testing and statistical scaling. Raw-to-scaled tables are not published for operational forms.
- Some questions are pretest and do not count, but are indistinguishable to the user.

Product model (what you can implement without pretending to know College Board internals):
- Maintain two scoring layers.
  1) **Training score**: ability estimate on a stable internal scale (theta-like), updated after every attempt.
  2) **SAT score estimate**: map internal ability to a score band with uncertainty.

Score mapping object:
```json
{
  "section": "RW",
  "theta": 0.85,
  "score_estimate": 720,
  "score_ci90": [690, 750],
  "routing_prob_M2_H": 0.78
}
```

How to explain adaptivity inside the app:
- The score is not a simple count-right.
- Missing a harder item can hurt less than missing an easy item.
- Routing matters because Module 2 has different difficulty mixes.

#### 1.1.5 Difficulty progression logic (test-maker view)

Design goals that shape item difficulty:
- `D1–D2`: direct retrieval or single rule application, distractors are obviously wrong.
- `D3`: two-step reasoning, distractors are plausible if you skip a step.
- `D4–D5`: minimal cues, tight wording, multiple constraints, near-paraphrase distractors.

---

### 1.2 Question Taxonomy (Critical)

This taxonomy is the backbone for tagging content, generating drills, and error analytics.

#### 1.2.1 Reading and Writing: top-level domains

- `RW_DOMAIN_IA` Information and Ideas
- `RW_DOMAIN_CS` Craft and Structure
- `RW_DOMAIN_SEC` Standard English Conventions
- `RW_DOMAIN_EOI` Expression of Ideas

Each QuestionType includes:
- `id`, `domain`, `skill_ids`, `stimulus_format`, `stem_templates`, `solution_logic`, `trap_types`, `time_budget_s`, `difficulty_markers`, `mastery_targets`, `common_errors`

---

## 1.2.2 Reading and Writing: QuestionType catalog

### A) Information and Ideas (IA)

#### RW_IA_CID_MAIN (Central idea)
- **Tested skill**: compress a short text into one sentence without adding or dropping core claims.
- **Test-maker logic**: correct answer restates the thesis. Wrong answers do at least one of: over-generalize, over-specific detail, introduce new claim, flip causality.
- **Trap structures**:
  - `TRAP_TOO_BROAD` (true in general, not this text)
  - `TRAP_TOO_NARROW` (one detail)
  - `TRAP_OUTSIDE_SCOPE` (new topic)
  - `TRAP_REVERSED` (cause/effect swapped)
- **700 vs 800 split**:
  - 700: gets obvious thesis, misses when thesis is implied by two sentences.
  - 800: identifies the governing claim and what is explicitly excluded.
- **Time cost**: 50–80s.
- **High-scorer error patterns eliminated**: answers that paraphrase a detail but ignore the text’s main move.

#### RW_IA_CID_DETAIL (Detail retrieval)
- **Tested skill**: locate a specific stated fact.
- **Logic pattern**: correct answer matches a sentence. Wrong answers use close wording but mismatch number, group, time, or qualifier.
- **Traps**: `TRAP_NEAR_MATCH`, `TRAP_WRONG_ENTITY`, `TRAP_WRONG_TIME`, `TRAP_WRONG_QUANTIFIER`.
- **700 vs 800**: 800-level checks qualifiers (only, most, some, often).
- **Time**: 35–65s.

#### RW_IA_INF_SINGLE (Inference)
- **Tested skill**: conclude something that must be true given the text.
- **Logic model**:
  - Build a minimal chain: (given facts) ⇒ (necessary conclusion).
  - Reject anything that could be false.
- **Traps**:
  - `TRAP_PLAUSIBLE_NOT_PROVEN`
  - `TRAP_STRONG_WORDING` (always, never, best, worst)
  - `TRAP_CAUSAL_LEAP`
- **700 vs 800**:
  - 700: picks plausible.
  - 800: uses necessity test: “Could the text still be true if this answer were false?” If yes, eliminate.
- **Time**: 55–95s.

#### RW_IA_COE_TEXT (Command of Evidence: textual)
- **Tested skill**: choose the evidence sentence(s) that supports a claim.
- **Logic model**:
  1) Decide what the claim means in plain words.
  2) Scan evidence options and find the one that directly proves the claim.
- **Traps**:
  - `TRAP_SUPPORTS_DIFFERENT_CLAIM`
  - `TRAP_TOPIC_MATCH_NO_PROOF`
  - `TRAP_PARTIAL_SUPPORT`
- **800 behavior**: maps each evidence option to a claim it actually supports.
- **Time**: 70–110s.

#### RW_IA_COE_QUANT (Command of Evidence: quantitative)
- **Tested skill**: connect a claim to a table/graph.
- **Logic model**:
  - Translate claim into a check: trend, comparison, rate, max/min, proportion.
  - Validate against the graphic.
- **Common misreads**:
  - axes, units, baseline, percent vs percentage points.
- **Traps**:
  - `TRAP_AXIS_SWAP`
  - `TRAP_UNIT_MISMATCH`
  - `TRAP_PERCENT_CONFUSION`
  - `TRAP_CHERRY_PICK`
- **Time**: 80–130s.

---

### B) Craft and Structure (CS)

#### RW_CS_WIC (Words in context)
- **Tested skill**: pick a meaning that fits local context.
- **Logic model**:
  1) Replace the blank/word with your own simple synonym.
  2) Choose the option that matches that meaning and tone.
- **Traps**:
  - `TRAP_WRONG_SENSE` (correct dictionary sense, wrong for context)
  - `TRAP_TONE_MISMATCH`
  - `TRAP_PART_OF_SPEECH`
- **700 vs 800**:
  - 800 uses “substitute test” and checks surrounding contrast words.
- **Time**: 35–70s.

#### RW_CS_TSP_FUNCTION (Function of sentence or phrase)
- **Tested skill**: explain what a part does (definition, example, counterpoint, evidence, concession).
- **Logic model**:
  - Identify the local relationship. Look for signal words (however, for example, because).
- **Traps**:
  - `TRAP_WRONG_RELATION` (calls an example a definition)
  - `TRAP_SCOPE_ERROR` (describes whole text not the part)
- **Time**: 60–90s.

#### RW_CS_TSP_PURPOSE (Author purpose)
- **Tested skill**: why the author included a detail, quote, or claim.
- **Traps**: `TRAP_INTENT_OVERREACH`, `TRAP_WRONG_LEVEL`.
- **Time**: 60–95s.

#### RW_CS_TEXT_STRUCTURE (Overall structure)
- **Tested skill**: map paragraph moves: problem→solution, claim→evidence, compare→contrast.
- **Traps**: `TRAP_REVERSED_ORDER`, `TRAP_MISLABEL`.
- **Time**: 70–110s.

#### RW_CS_CROSS_TEXT (Cross-text connections)
- **Stimulus**: two short passages.
- **Tested skill**: compare positions, evidence, methods.
- **Logic model**:
  - Summarize each text in one line.
  - Identify relation: agree, disagree, qualify, extend, different focus.
- **Traps**:
  - `TRAP_ONE_TEXT_ONLY`
  - `TRAP_FALSE_AGREEMENT`
  - `TRAP_WRONG_POINT_OF_COMPARISON`
- **Time**: 90–150s.

---

### C) Standard English Conventions (SEC)

SEC items split into two clusters:
- **Boundaries**: punctuation and sentence boundaries.
- **Form, Structure, and Sense**: grammar and usage.

#### RW_SEC_BOUND_SENTENCE (Sentence boundary)
- **Tested skill**: avoid comma splice and run-on.
- **Decision rule**:
  - If both sides can stand alone, you need: period, semicolon, or comma + FANBOYS.
- **Traps**:
  - `TRAP_COMMA_SPLICE`
  - `TRAP_FRAGMENT`
  - `TRAP_WRONG_CONJ`
- **Time**: 25–55s.

#### RW_SEC_BOUND_COMMA (Comma use)
- **Rules covered**:
  - nonessential clauses, intro modifiers, items in series, appositives.
- **Traps**: `TRAP_RESTRICTIVE_NONRESTRICTIVE`, `TRAP_COMMA_AFTER_SUBJECT`.
- **Time**: 25–60s.

#### RW_SEC_BOUND_COLON_SEMI (Colon and semicolon)
- **Rules**:
  - semicolon joins two independent clauses.
  - colon introduces explanation/list after an independent clause.
- **Traps**: `TRAP_COLON_AFTER_NOT_IC`, `TRAP_SEMI_WITH_DEP`.
- **Time**: 25–55s.

#### RW_SEC_BOUND_DASH_PARENS (Dash and parentheses)
- **Rules**:
  - dashes and parentheses set off nonessential info.
  - match opening and closing.
- **Traps**: `TRAP_MISMATCH_PAIR`, `TRAP_ESSENTIAL_INFO`.
- **Time**: 25–55s.

#### RW_SEC_FORM_SVA (Subject-verb agreement)
- **Rules**:
  - ignore prepositional phrases.
  - treat collective nouns consistently.
- **Traps**: `TRAP_INTERVENING_PHRASE`, `TRAP_INVERTED_ORDER`.
- **Time**: 25–60s.

#### RW_SEC_FORM_VERB_TENSE (Verb tense and sequence)
- **Rules**:
  - keep tense consistent unless time shifts.
- **Traps**: `TRAP_UNNEEDED_SHIFT`, `TRAP_WRONG_PERFECT`.
- **Time**: 25–60s.

#### RW_SEC_FORM_PRONOUN (Pronouns)
- **Rules**:
  - clear antecedent, number agreement, case (I/me, who/whom).
- **Traps**: `TRAP_AMBIG_ANTECEDENT`, `TRAP_CASE_ERROR`.
- **Time**: 30–70s.

#### RW_SEC_FORM_MODIFIER (Modifiers)
- **Rules**:
  - modifier must touch what it modifies.
- **Traps**: `TRAP_DANGLING`, `TRAP_SQUINTING`, `TRAP_MISPLACED`.
- **Time**: 30–75s.

#### RW_SEC_FORM_PARALLEL (Parallel structure)
- **Rules**:
  - items in a list must match grammatical form.
- **Traps**: `TRAP_MIXED_FORMS`.
- **Time**: 25–60s.

#### RW_SEC_FORM_COMPARISON (Comparison logic)
- **Rules**:
  - compare like with like.
- **Traps**: `TRAP_ILL_LOGICAL_COMPARE`.
- **Time**: 25–65s.

---

### D) Expression of Ideas (EOI)

#### RW_EOI_TRANSITION (Transitions)
- **Tested skill**: choose connector by meaning, not grammar.
- **Logic model**:
  - Label relation between sentences: add, contrast, cause, example, time.
- **Traps**:
  - `TRAP_SAME_DIRECTION` (uses “however” when sentences agree)
  - `TRAP_WRONG_CAUSE`
- **Time**: 25–60s.

#### RW_EOI_RHET_SYNTH (Rhetorical synthesis)
- **Stimulus**: bullet notes + goal.
- **Tested skill**: build a sentence that uses correct facts and matches goal.
- **Logic model**:
  - Mark what must be included. Mark what must be avoided.
  - Check each option for (facts) and (goal fit).
- **Traps**:
  - `TRAP_WRONG_FACT`
  - `TRAP_GOAL_MISS` (facts right, tone wrong)
  - `TRAP_EXTRA_CLAIM`
- **Time**: 60–105s.

#### RW_EOI_LOGICAL_COMPLETE (Logical completion)
- **Tested skill**: complete a claim with correct logic given the prior sentences.
- **Traps**: `TRAP_OVERSTATE`, `TRAP_NEW_IDEA`.
- **Time**: 45–85s.

#### RW_EOI_SENTENCE_PLACEMENT (Sentence placement)
- **Tested skill**: place a sentence where it fits flow, references, and pronouns.
- **Logic model**:
  - Check referents: this, these, such, they.
  - Check if sentence introduces or uses defined term.
- **Traps**:
  - `TRAP_PRONOUN_NO_ANTECEDENT`
  - `TRAP_DEFINITION_AFTER_USE`
- **Time**: 60–110s.

#### RW_EOI_CONCISION (Concision and redundancy)
- **Tested skill**: choose the shortest option that keeps meaning and correct grammar.
- **Traps**:
  - `TRAP_TOO_SHORT_CHANGES_MEANING`
  - `TRAP_WORDY_BUT_SAFE`
- **Time**: 25–55s.

#### RW_EOI_PARAGRAPH_FOCUS (Add/delete/revise for focus)
- **Tested skill**: keep content aligned with a goal or topic.
- **Traps**: `TRAP_INTERESTING_BUT_OFF_TOPIC`.
- **Time**: 45–85s.

---

## 1.2.3 Math: QuestionType catalog

### Math domains
- `M_DOMAIN_ALG` Algebra
- `M_DOMAIN_ADV` Advanced Math
- `M_DOMAIN_PSDA` Problem-Solving and Data Analysis
- `M_DOMAIN_GEO` Geometry and Trigonometry

### Shared SAT math framing rules (across types)
- The SAT often hides the math inside a short scenario.
- Most errors come from translation, not the final computation.
- Common “frame switches”: words to equations, tables to functions, rate language to unit analysis.

Each Math QuestionType includes:
- `id`, `domain`, `concept_ids`, `modeling_frame`, `common_setups`, `misdirection`, `desmos_uses`, `mental_shortcuts`, `where_750_plus_still_miss`, `time_budget_s`

---

### A) Algebra (ALG)

#### M_ALG_LIN1_SOLVE (Linear equation in one variable)
- **Concept**: isolate variable, maintain equality.
- **SAT frame**: often includes parentheses and fractions to trigger distribution errors.
- **Misdirection**:
  - sign errors, multiplying only one term, wrong common denominator.
- **Desmos**: graph both sides and find intersection for check.
- **Mental shortcuts**:
  - clear denominators early.
  - treat “solution to equation” as “x that makes both sides equal.”
- **750+ misses**:
  - loses negative sign during distribution.
- **Time**: 45–75s.

#### M_ALG_LIN2_SLOPE (Linear equation in two variables, slope/intercept)
- **Concept**: slope as rate of change; intercepts.
- **SAT frame**: word problems with “per” language.
- **Misdirection**:
  - slope vs intercept swap.
  - units mismatch.
- **Desmos**: use table mode and regression only when asked for model.
- **Shortcuts**:
  - slope from two points: (y2-y1)/(x2-x1) with careful sign.
- **750+ misses**: reads “increases by 3 for every 2” backwards.
- **Time**: 60–95s.

#### M_ALG_SYSTEMS (Systems of two linear equations)
- **Concept**: substitution or elimination.
- **SAT frame**: “how many solutions” or “value of x+y”.
- **Misdirection**:
  - parallel lines (no solution), same line (infinite solutions).
- **Desmos**: graph both and use intersection.
- **Shortcuts**:
  - for x+y, add equations directly when aligned.
- **750+ misses**: forgets to answer asked expression.
- **Time**: 70–120s.

#### M_ALG_INEQUAL (Linear inequalities)
- **Concept**: solve and interpret solution set.
- **SAT frame**: number line or word constraint.
- **Misdirection**: flips inequality wrong when multiplying by negative.
- **Desmos**: graph inequality region when allowed.
- **Time**: 60–105s.

---

### B) Advanced Math (ADV)

#### M_ADV_EQUIV_EXPR (Equivalent expressions)
- **Concept**: factoring, expanding, simplifying, structure.
- **SAT frame**: “Which is equivalent” or “Rewrite in form a(x-h)^2+k.”
- **Misdirection**:
  - drops term, wrong factor.
- **Desmos**: pick random x values to test equivalence quickly.
- **Shortcuts**:
  - plug in 2 values for x to eliminate wrong choices.
- **750+ misses**: tests only one value so a wrong choice survives.
- **Time**: 55–90s.

#### M_ADV_QUAD_ROOTS (Quadratics: roots/solutions)
- **Concept**: factoring, quadratic formula, zero product.
- **SAT frame**: roots correspond to x-intercepts.
- **Misdirection**:
  - asks for positive root only.
- **Desmos**: graph to see roots and verify.
- **Shortcuts**:
  - look for factoring patterns; complete square when coefficient 1 or 4.
- **750+ misses**: confuses root with y-value.
- **Time**: 70–120s.

#### M_ADV_FUNCTIONS_NONLIN (Nonlinear functions)
- **Concept**: function notation, composition, inverse, transformation.
- **SAT frame**: interpret f(x) in context.
- **Misdirection**:
  - mixes input/output units.
  - domain restrictions.
- **Desmos**: table feature to compute f values, check inverse by swapping.
- **Shortcuts**:
  - transformations: inside affects x, outside affects y.
- **750+ misses**: wrong order in composition f(g(x)).
- **Time**: 70–120s.

#### M_ADV_EXP_GROWTH (Exponential)
- **Concept**: growth/decay, percent change per period.
- **SAT frame**: “increases by r% each year” → multiply by (1+r).
- **Misdirection**: uses additive change instead of multiplicative.
- **Desmos**: regression for exponential model only when data is given.
- **Shortcuts**:
  - convert percent to multiplier.
- **750+ misses**: mixes r% with decimal.
- **Time**: 60–105s.

#### M_ADV_RATIONAL_RADICAL (Rational and radical equations)
- **Concept**: restrictions, extraneous solutions.
- **Misdirection**: forgets domain restriction.
- **Desmos**: compare both sides and check solutions.
- **Time**: 80–140s.

---

### C) Problem-Solving and Data Analysis (PSDA)

#### M_PSDA_RATIO_RATE_UNIT (Ratios, rates, units)
- **Concept**: unit rate, dimensional analysis.
- **SAT frame**: conversion and “per” language.
- **Misdirection**: wrong conversion factor direction.
- **Desmos**: not needed usually.
- **Shortcuts**:
  - write units as algebra.
- **750+ misses**: answers with wrong unit (hours vs minutes).
- **Time**: 60–110s.

#### M_PSDA_PERCENT (Percentages)
- **Concept**: percent of, percent change.
- **Misdirection**: percent of what.
- **Shortcuts**:
  - use 10% and 1% anchors.
- **Time**: 50–95s.

#### M_PSDA_1VAR_STATS (One-variable data)
- **Concept**: mean, median, range, standard deviation idea.
- **SAT frame**: effect of adding a value, shifting all values.
- **Misdirection**: confuses mean vs median.
- **Shortcuts**:
  - mean changes by (added value)/n.
- **Time**: 55–105s.

#### M_PSDA_2VAR_MODEL (Two-variable data, linear vs exponential)
- **Concept**: slope in context, best-fit line, residuals.
- **Misdirection**: reads scatterplot wrong, extrapolates too far.
- **Desmos**: linear regression quickly.
- **Time**: 70–130s.

#### M_PSDA_PROB (Probability and conditional)
- **Concept**: P(A and B), P(A|B).
- **Misdirection**: divides by wrong base.
- **Shortcuts**:
  - use 2×2 table.
- **Time**: 70–130s.

#### M_PSDA_INFERENCE_MOE (Inference, margin of error)
- **Concept**: sample vs population, estimate range.
- **Misdirection**: treats margin of error as exact.
- **Time**: 70–120s.

---

### D) Geometry and Trigonometry (GEO)

#### M_GEO_AREA_VOL (Area and volume)
- **Concept**: formulas, scaling.
- **Misdirection**: uses linear scale factor instead of squared/cubed.
- **Shortcuts**:
  - similar figures: areas scale by k^2.
- **Time**: 60–110s.

#### M_GEO_LINES_ANGLES (Lines, angles, triangles)
- **Concept**: parallel lines with transversals, triangle sum.
- **Misdirection**: wrong angle pair.
- **Time**: 60–105s.

#### M_GEO_RIGHT_TRI_TRIG (Right triangles and trig)
- **Concept**: Pythagorean theorem, special triangles, basic trig ratios.
- **Misdirection**: uses sin/cos wrong ratio.
- **Desmos**: use to compute quickly if allowed.
- **Time**: 60–115s.

#### M_GEO_CIRCLES (Circles)
- **Concept**: radius/diameter, circumference, area, arc length.
- **Misdirection**: uses diameter as radius.
- **Time**: 60–110s.

---

## 2. Official SAT Materials Analysis

### 2.1 Repeatable structure patterns (what repeats, regardless of form)

#### 2.1.1 R&W item structure invariants
- Stimulus is short. One item per passage or passage pair.
- Common stems fall into a small set:
  - word meaning
  - main idea/purpose/function
  - inference
  - choose evidence
  - revise for grammar
  - revise for transitions
  - rhetorical synthesis (notes)

#### 2.1.2 Math item structure invariants
- About 30% of questions are contextual. Many are pure math.
- SPR questions target independence. They remove answer-choice clues.
- A small set of modeling frames repeats:
  - linear model
  - quadratic roots/intercepts
  - exponential growth/decay
  - proportional reasoning
  - data: mean/median, scatter, regression, probability

### 2.2 Frequency tables (implementation-ready)

#### 2.2.1 R&W domain distribution (scored items, per full test)

| Domain | Approx share | Typical scored count |
|---|---:|---:|
| Craft and Structure | ~28% | 13–15 |
| Information and Ideas | ~26% | 12–14 |
| Standard English Conventions | ~26% | 11–15 |
| Expression of Ideas | ~20% | 8–12 |

#### 2.2.2 Math domain distribution (scored items, per full test)

| Domain | Approx share | Typical scored count |
|---|---:|---:|
| Algebra | ~35% | 13–15 |
| Advanced Math | ~35% | 13–15 |
| Problem-Solving and Data Analysis | ~15% | 5–7 |
| Geometry and Trigonometry | ~15% | 5–7 |

#### 2.2.3 Format distribution (Math)
- MCQ: ~75%
- SPR: ~25%

App tagging:
- Every math item must be tagged with `format = MCQ|SPR`.
- SPR items should have `answer_forms = int|decimal|fraction|mixed`.

### 2.3 Official explanation patterns (how correct answers are justified)

Observed explanation structure (for building your own explainers):
- State what the question is asking in plain words.
- Identify the text or math fact that proves the correct choice.
- Explain why each wrong choice fails (wrong meaning, unsupported, wrong rule, wrong computation).

Explainer template for the app:
```json
{
  "explain": {
    "why_correct": ["..."],
    "why_others_wrong": {
      "A": ["..."],
      "B": ["..."],
      "C": ["..."],
      "D": ["..." ]
    },
    "evidence": [{"type":"EVID_TEXT","span":"..."}]
  }
}
```

### 2.4 Difficulty tagging framework

Define difficulty as a function of:
- number of constraints
- distractor similarity to correct
- abstraction level
- need for multi-step reasoning
- dependence on careful reading (qualifiers, units, referents)

Item difficulty rubric:
- `D1`: single rule, obvious elimination.
- `D2`: single rule but distractors plausible.
- `D3`: two-step or hidden constraint.
- `D4`: multi-constraint, traps near-paraphrase.
- `D5`: minimal cues, hardest distractors, high time pressure.

### 2.5 Mistake classification model (official-like)

Field set for analytics:
- `question_type_id`
- `domain`
- `primary_error_root`
- `secondary_error_root`
- `trap_type_selected` (if any)
- `time_over_budget` (bool)
- `evidence_missed` (bool)
- `math_check_failed` (bool)

---

## 3. Prep Book and Platform Intelligence

Goal: extract what top providers teach that can be turned into product rules.

### 3.1 Provider profiles (structured)

> Note: this section models common methods strongly associated with each brand. Use it to design strategy objects and drill sequencing.

#### 3.1.1 College Board Official Guide + Bluebook
- **Philosophy**: practice on official-style questions. Learn the test UI and pacing.
- **Breakdown**: by R&W and Math domains, plus sample explanations.
- **Unique value**: closest format and scoring feel.
- **Weakness**: limited teaching depth.

#### 3.1.2 Khan Academy SAT
- **Philosophy**: skill-based mastery with lots of short drills.
- **Strength**: beginner-friendly concept intros.
- **Weakness**: explanations can be generic, and routing realism is limited.

#### 3.1.3 Erica Meltzer (Reading and Grammar)
- **Philosophy**: question-type training and strict rule clarity.
- **Breakdown**: granular reading categories and grammar rule sets.
- **Unique moves**:
  - reading: “function” and “structure” mapping.
  - grammar: boundaries-first approach, then usage.
- **Risk**: some users over-focus on rules and under-train timing.

#### 3.1.4 Dr. John Chung (Math)
- **Philosophy**: push beyond test difficulty to make test feel easier.
- **Strength**: hard problem sets, algebra fluency.
- **Risk**: overkill for beginners unless sequenced carefully.

#### 3.1.5 PWN the SAT (Math)
- **Philosophy**: pragmatic problem solving. Pattern recognition and fast checks.
- **Unique moves**:
  - plug-in, backsolve, “make it ugly” cases.
  - fast sanity checks and answer-choice traps.
- **Risk**: can turn into guessing if user skips foundations.

#### 3.1.6 Barron’s
- **Philosophy**: volume and difficulty pressure.
- **Strength**: lots of practice.
- **Risk**: mismatch with official style can waste time if not filtered.

#### 3.1.7 Princeton Review
- **Philosophy**: test-taking tactics and confidence-based pacing.
- **Strength**: pacing frameworks.
- **Risk**: strategy-heavy, concept-light.

#### 3.1.8 Kaplan
- **Philosophy**: process steps and consistency.
- **Strength**: predictable decision trees.
- **Risk**: can be slow if followed blindly.

#### 3.1.9 Magoosh
- **Philosophy**: video-driven concept teaching + large bank.
- **Strength**: explanation depth.
- **Risk**: style drift vs official unless curated.

#### 3.1.10 UWorld
- **Philosophy**: detailed explanations and hard distractor analysis.
- **Strength**: “why wrong” training.
- **Risk**: too detailed unless the app forces extraction into rules.

### 3.2 Cross-provider synthesis (what survives format changes)

Durable system rules that show up everywhere:
- **R&W**
  - Evidence-first. Answers must be supported by the text.
  - For inference, necessity test beats plausibility.
  - Grammar is mechanical. If a choice breaks a rule, it is wrong even if it sounds fine.
- **Math**
  - Translate before solving. Define variables and units.
  - Use multiple solution paths: algebra + plug-in + graph as a check.
  - Always answer the asked quantity, not the intermediate value.

Conflicts and how the app should resolve them:
- “Always read the whole passage” vs “read only what you need.”
  - Product rule: discrete passages mean you read only the stimulus. You still must read every sentence in that stimulus.
- “Never use the calculator” vs “use Desmos.”
  - Product rule: teach both. Then route by goal: accuracy-first for beginners, speed-first for high scorers.

---

## 4. Elite Scorer Behavior Model (1550–1600)

### 4.1 Mistake review protocol (what they do, expressed as system)

Post-session loop:
1) Re-solve every wrong question without time.
2) Identify the first point of failure.
3) Convert it into a rule, a trigger, or a check.
4) Schedule targeted drills on that exact QuestionType + TrapType.

App requirements:
- Force users to log the first failure point.
- Store a short “anti-rule” statement per error, ex: “If the answer has ‘always’, verify the text literally says it.”

### 4.2 Pacing behavior

Elite pacing rules:
- Skip policy is explicit:
  - if no progress in 25–35s (R&W) or 45–60s (Math), mark and move.
- Return order is strategic:
  - finish all D1–D3 first, then D4–D5.

Time budgets by difficulty band (default targets)

#### Reading and Writing
- D1: 35–50s
- D2: 45–65s
- D3: 60–85s
- D4: 75–110s
- D5: 90–140s

#### Math
- D1: 50–70s
- D2: 60–90s
- D3: 80–115s
- D4: 105–150s
- D5: 130–180s

### 4.3 Mental models

#### 4.3.1 Reading stimulus model
- Treat the text as a mini-argument with parts:
  - claim
  - support
  - counterpoint
  - implication
- Inference is “must be true,” not “seems true.”

#### 4.3.2 Grammar decision flow (SEC)

Decision tree:
1) Is the question about punctuation or sentence breaks?
   - Yes → Boundaries rules.
   - No → Form/Structure/Sense rules.
2) For boundaries:
   - Identify independent clauses.
   - Choose allowed joiners.
3) For form:
   - Find the head noun and verb.
   - Check agreement, tense, pronoun reference.
4) For style items:
   - Keep meaning constant.
   - choose the shortest grammatically correct choice.

#### 4.3.3 Math translation model

Process:
1) Rewrite given info as equations/inequalities.
2) Label units on every variable.
3) Solve with the fastest safe method.
4) Check with a second method or plug-back if D4+.

### 4.4 Accuracy benchmarks (per target score)

Approx targets for a stable 1500+ user (not a guarantee):
- R&W: miss 0–3 scored items total.
- Math: miss 0–2 scored items total.

App should track by QuestionType:
- If a user misses more than 1 item per 20 attempts on a type at D3, that type is not “done.”

---

## 5. Deliberate Practice Engine

### 5.1 Baseline system

#### 5.1.1 Diagnostic design
- Two modes:
  - **Full diagnostic**: full digital SAT simulation with routing.
  - **Fast diagnostic**: 12 R&W + 12 Math mixed, adaptive micro-routing.

#### 5.1.2 Skill gap detection logic

For each QuestionType:
- compute `accuracy` and `median_time` by difficulty.
- compute `error_root_distribution`.
- compute `trap_profile` (which traps user falls for).

Weakness score:
```text
weakness = w1*(1-accuracy) + w2*max(0, time_ratio-1) + w3*repeat_error_rate
```
Where:
- `time_ratio = median_time / time_budget`
- `repeat_error_rate = errors_in_last_10 / 10`

### 5.2 Foundation layer

#### 5.2.1 Skill concept mapping (beginner first)

Reading and Writing prerequisites:
- sentence parts: subject, verb, clause.
- punctuation purpose.
- paragraph logic: claim vs support.

Math prerequisites:
- algebra operations
- fractions and exponents
- function notation

#### 5.2.2 Grammar rule database (SEC)

Store each rule as:
```json
{
  "rule_id": "SEC_BOUND_COMMA_NONESSENTIAL",
  "name": "Nonessential clause commas",
  "trigger": ["which", "who", "that", "appositive"],
  "test": ["remove clause: sentence still works"],
  "allowed_fixes": ["add paired commas", "use parentheses", "use dashes"],
  "common_traps": ["restrictive clause", "comma after subject"],
  "examples": {"correct": ["..."], "wrong": ["..."]}
}
```

#### 5.2.3 Math concept dependency graph

Example edges:
- `LINEAR_SLOPE` → `LINEAR_FUNCTIONS` → `SYSTEMS`
- `FACTORING` → `QUADRATICS_ROOTS` → `POLYNOMIAL_EQUATIONS`
- `RATIOS_UNITS` → `RATES` → `PROPORTIONAL_MODELING`

App rule:
- Do not drill a QuestionType at D3+ until prerequisites show `mastery >= 0.85`.

### 5.3 Targeted practice layer

#### 5.3.1 Drill sequencing rules

- `Rule DP1 (focus)`: pick top 3 weakness QuestionTypes per section.
- `Rule DP2 (mix)`: within a session, 70% focus types, 30% review types.
- `Rule DP3 (trap replay)`: if the user selects a trap twice in 7 days, inject 3 more items with that trap design.
- `Rule DP4 (speed gating)`: a type is not cleared unless both accuracy and time meet targets.

#### 5.3.2 Difficulty progression

- Start at `D1` until accuracy ≥ 0.85.
- Move to `D2` until accuracy ≥ 0.90.
- Move to `D3` until accuracy ≥ 0.92.
- Move to `D4` until accuracy ≥ 0.95.
- `D5` is optional. Require accuracy ≥ 0.95 with time ≤ 1.05× budget.

#### 5.3.3 Mastery thresholds

Per QuestionType + difficulty:
```json
{
  "question_type_id": "RW_CS_WIC",
  "difficulty": "D3",
  "mastery_accuracy": 0.92,
  "mastery_median_time_s": 65,
  "min_attempts": 25,
  "stability_window_days": 14
}
```

### 5.4 Real conditions simulation

#### 5.4.1 Full-length replication
- Use 2-stage routing.
- Use official domain sequence per module.
- Enforce module locks.
- Use the same UI constraints: answer elimination tool, flagging, calculator.

#### 5.4.2 Fatigue model
Track:
- accuracy drift from first 10 questions to last 10 questions.
- time drift.
- skip rate drift.

If drift crosses thresholds:
- inject endurance sets: 20-question mixed drills at test pace.

### 5.5 Error tracking system

Minimum required fields per ErrorEvent:
```json
{
  "item_id": "...",
  "question_type_id": "M_ADV_QUAD_ROOTS",
  "difficulty": "D4",
  "attempt_outcome": "WRONG_TRAP",
  "primary_error_root": "E_CONSTRAINT",
  "trap_type_selected": "TRAP_ASKED_FOR_POSITIVE_ONLY",
  "time_s": 142,
  "time_budget_s": 120,
  "notes": "Forgot it asked for positive root only",
  "fix_rule": "When asked for a subset (positive, integer, etc.), circle it before solving",
  "next_drill_recipe": {"type":"trap_replay","count":6}
}
```

Pattern recurrence detection:
- `repeat_by_question_type` last 30 days
- `repeat_by_trap_type` last 30 days
- `repeat_by_error_root` last 30 days

---

## 6. Trap and Distractor Engineering

### 6.1 Universal distractor taxonomy

#### Meaning traps (R&W)
- `TRAP_TOO_BROAD`
- `TRAP_TOO_NARROW`
- `TRAP_OUTSIDE_SCOPE`
- `TRAP_REVERSED` (cause/effect, before/after)
- `TRAP_STRONG_WORDING` (absolute language)
- `TRAP_PLAUSIBLE_NOT_PROVEN`
- `TRAP_ONE_TEXT_ONLY` (cross-text)

#### Grammar traps (SEC)
- `TRAP_SOUNDS_RIGHT_RULE_WRONG`
- `TRAP_COMMA_SPLICE`
- `TRAP_FRAGMENT`
- `TRAP_PRONOUN_AMBIG`
- `TRAP_MODIFIER_DANGLING`
- `TRAP_PARALLEL_BREAK`

#### Rhetoric traps (EOI)
- `TRAP_GOAL_MISS`
- `TRAP_WRONG_FACT`
- `TRAP_EXTRA_CLAIM`
- `TRAP_FLOW_BREAK`

#### Math traps
- `TRAP_SIGN`
- `TRAP_DISTRIBUTE`
- `TRAP_DENOMINATOR`
- `TRAP_UNIT_MISMATCH`
- `TRAP_PERCENT_BASE`
- `TRAP_READ_GRAPH`
- `TRAP_EXTRANEOUS_SOLUTION`
- `TRAP_ANSWERED_INTERMEDIATE`

### 6.2 Wrong answer construction rules (how to generate distractors)

R&W distractor generation patterns:
- Take the correct idea and:
  - add one new claim.
  - remove a qualifier.
  - swap a relationship word (because → although).
  - swap subject/object.
  - swap scope (local detail → global claim).

Math distractor generation patterns:
- Start from common student work:
  - wrong distribution step.
  - wrong sign when moving terms.
  - wrong unit conversion direction.
  - off-by-one in counting.
  - percent mistake: uses percent as decimal or wrong base.

---

## 7. Strategy Library (Database-ready)

Strategy objects must be explicit about when they work and when they break.

### 7.1 Reading and Writing strategies

#### STR_RW_INFERENCE_NECESSITY_TEST
- **When to use**: any inference or implied-meaning question.
- **Procedure**:
  1) Paraphrase the question in your own words.
  2) For each choice, ask: “Could the text still be true if this choice were false?”
  3) If yes, eliminate.
- **When not to use**: direct detail questions.
- **Failure cases**: user paraphrase is wrong.

#### STR_RW_VOCAB_SUBSTITUTE
- **When**: Words in Context.
- **Procedure**: replace with a simple synonym, then match.
- **Failure**: ignores contrast words.

#### STR_RW_CROSS_TEXT_ONE_LINE_SUMMARY
- **When**: cross-text.
- **Procedure**: one-line summary per text, then compare.
- **Failure**: summaries copy surface topic not stance.

### 7.2 Grammar strategies

#### STR_SEC_BOUNDARIES_FIRST
- **When**: punctuation or sentence break.
- **Procedure**:
  1) Identify clauses.
  2) Decide if each side can stand alone.
  3) Choose joiner from allowed set.
- **Failure**: misidentifies dependent clause as independent.

#### STR_SEC_MEANING_LOCK
- **When**: concision, modifiers, parallelism.
- **Procedure**: keep meaning constant. Pick shortest grammatical.
- **Failure**: shortest choice changes meaning.

### 7.3 Math strategies

#### STR_MATH_PLUG_IN
- **When**: variables in answer choices, weird algebra, equivalent expressions.
- **Procedure**: pick a clean number that avoids zero/one unless needed. Test choices.
- **When not**: if question asks for exact symbolic form.
- **Failure**: chooses a number that breaks domain restrictions.

#### STR_MATH_BACKSOLVE
- **When**: MCQ where answer is a number and set-up is messy.
- **Procedure**: try answer choices, usually start with middle.
- **Failure**: monotonicity assumptions wrong.

#### STR_MATH_DESMOS_CHECK
- **When**: D4+ or whenever algebra is error-prone.
- **Procedure**: graph or table to verify.
- **Failure**: bad window/scale, misreads intersection.

### 7.4 Guessing and bailout

#### STR_GLOBAL_SKIP_TIMER
- **When**: any question.
- **Rule**:
  - R&W: if no clear elimination in 30s, flag and move.
  - Math: if no plan in 60s, flag and move.
- **Failure**: user never returns.

---

## 8. Output Schemas for Implementation

### 8.1 QuestionType schema

```json
{
  "id": "RW_IA_INF_SINGLE",
  "section": "RW",
  "domain": "RW_DOMAIN_IA",
  "skills": ["RW_SKILL_INFERENCE", "RW_SKILL_QUALIFIER_CONTROL"],
  "stimulus_format": ["single_text", "text_plus_table"],
  "stem_templates": [
    "Based on the text, which choice best ...",
    "Which choice most logically completes ..."
  ],
  "solution_logic": [
    "Extract givens",
    "Apply necessity test",
    "Eliminate absolute/unsupported claims"
  ],
  "trap_types": ["TRAP_PLAUSIBLE_NOT_PROVEN", "TRAP_STRONG_WORDING"],
  "time_budget_s": {"D1": 55, "D2": 70, "D3": 85, "D4": 105, "D5": 130},
  "difficulty_markers": ["two-sentence implication", "tight qualifiers"],
  "mastery": {"accuracy": {"D3": 0.92, "D4": 0.95}, "median_time_s": {"D3": 85}},
  "common_errors": ["infers beyond text", "ignores qualifiers"]
}
```

### 8.2 Error code system

Store as (primary + optional secondary):
- Knowledge
  - `E_KNOWLEDGE_RULE` (grammar rule)
  - `E_KNOWLEDGE_CONCEPT` (math concept)
- Reading
  - `E_READ_QUALIFIER` (missed only/most)
  - `E_READ_REFERENT` (this/these unclear)
  - `E_READ_GRAPH` (axis/unit)
- Logic
  - `E_LOGIC_INFERENCE` (plausible vs necessary)
  - `E_LOGIC_SCOPE` (too broad/narrow)
- Process
  - `E_PROCESS_NO_ELIM` (did not eliminate)
  - `E_PROCESS_NO_CHECK` (no verification)
- Time
  - `E_TIME_METHOD` (chose slow method)

### 8.3 Drill recipe schema

```json
{
  "recipe_id": "DRILL_RW_SEC_BOUNDARIES_D2",
  "section": "RW",
  "question_types": ["RW_SEC_BOUND_SENTENCE", "RW_SEC_BOUND_COMMA"],
  "difficulty_mix": {"D1": 0.2, "D2": 0.6, "D3": 0.2},
  "count": 18,
  "timer_mode": "per_question",
  "review_mode": "mandatory_error_log",
  "entry_gate": {"prereq_mastery": {"SEC_CLAUSE_ID": 0.8}},
  "exit_gate": {"accuracy": 0.9, "median_time_s": 45}
}
```

### 8.4 Mastery state update rule

- Use an exponentially weighted moving average (EWMA) for accuracy and time.
- Update per QuestionType and per difficulty band.

Pseudocode:
```text
acc = ewma(acc, is_correct, alpha=0.15)
time = ewma(time, time_s, alpha=0.15)
mastered = (acc >= target_acc) and (time <= target_time) and (attempts >= min_attempts)
```

### 8.5 App workflows (10% UX)

#### Beginner onboarding
- Phase 0: explain module locks and time.
- Phase 1: foundations (grammar basics, algebra basics).
- Phase 2: diagnostic.

#### Daily loop
1) 8–12 min: micro-review (spaced items)
2) 18–25 min: targeted drill
3) 8–12 min: error log and “fix rule” creation

#### Weekly loop
- One full simulation every 1–2 weeks.
- One deep review session that forces re-solve of every miss.

#### UI requirements
- per-question timer + budget indicator
- one-tap flag
- answer elimination tool
- mandatory “why wrong” tagging before moving on

---

## Appendix A. Skill Graphs (starter lists)

### A1. R&W skill nodes
- `RW_SKILL_CLAIM_ID`
- `RW_SKILL_DETAIL_LOCATE`
- `RW_SKILL_INFERENCE`
- `RW_SKILL_EVIDENCE_MATCH`
- `RW_SKILL_VOCAB_CONTEXT`
- `RW_SKILL_FUNCTION`
- `RW_SKILL_CROSS_TEXT`
- `RW_SKILL_BOUNDARIES`
- `RW_SKILL_USAGE_AGREEMENT`
- `RW_SKILL_REVISION_GOAL`

### A2. Math concept nodes
- `M_CONCEPT_FRACTIONS`
- `M_CONCEPT_EXPONENTS`
- `M_CONCEPT_LINEAR_SLOPE`
- `M_CONCEPT_SYSTEMS`
- `M_CONCEPT_FUNCTIONS`
- `M_CONCEPT_FACTORING`
- `M_CONCEPT_QUADRATIC_MODEL`
- `M_CONCEPT_PROPORTIONS`
- `M_CONCEPT_STATS_CENTER_SPREAD`
- `M_CONCEPT_TRIG_RIGHT_TRI`

---

## Appendix B. Minimal content needed for a v1 launch

- 40–60 QuestionTypes (start with the catalog above)
- 150–250 Concepts (grammar rules + math prerequisites)
- 30–50 Strategies (high-frequency)
- Full ErrorEvent logging
- Routing simulation with two Module 2 pools per section


# **ARCHITECTURAL SPECIFICATION: SAT MASTERY KNOWLEDGE BASE AND ADAPTIVE LEARNING ENGINE**

## **Executive Summary**

This document serves as the foundational architectural specification for the development of a high-fidelity, adaptive SAT preparation platform. Unlike traditional content repositories, this specification is designed to reverse-engineer the psychometric and content-generation protocols of the College Board’s Digital SAT (DSAT). The objective is to construct a "Definitive SAT Mastery Knowledge Base" that functions not merely as a tutor, but as a probabilistic engine capable of reducing student error rates to statistical near-zero.

The analysis synthesizes data from official technical manuals, elite scorer behaviors, psychometric research (Item Response Theory and Bayesian Knowledge Tracing), and the collective intelligence of the prep industry’s most effective authorities. This report is structured to guide software engineers, data scientists, and content developers in building the underlying operating system of the application.

# ---

**SECTION 1\. SAT EXAM DECONSTRUCTION**

To defeat the exam, the system must first model the exam’s internal logic with higher fidelity than the test-takers themselves possess. The Digital SAT is not a static exam; it is a Multi-Stage Adaptive Test (MST) governed by strict algorithmic constraints. The application must simulate these constraints to provide valid predictive analytics.

## **1.1 Test Architecture and Psychometric Configuration**

The application must simulate the exact constraints and adaptive behaviors of the official Bluebook testing environment. The transition from paper-based linear testing to digital adaptive testing fundamentally alters the strategy required for high achievement, shifting the focus from endurance to accuracy in high-stakes routing modules.

### **1.1.1 Structural Hierarchy and Timing Constraints**

The exam is divided into two primary sections: **Reading and Writing (RW)** and **Math**. Each section is further bifurcated into two separately timed modules. The application architecture must enforce these strict timing windows to condition the user's internal clock.1

| Component | Modules | Questions per Module | Total Questions | Time per Module | Total Time | Time per Question (Avg) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Reading & Writing** | 2 | 27 | 54 | 32 min | 64 min | \~71 seconds |
| **Math** | 2 | 22 | 44 | 35 min | 70 min | \~95 seconds |
| **Total Exam** | 4 | \- | 98 | \- | 134 min | \- |

**Critical Architectural Feature: The Desmos Integration** The Math section provides an integrated Desmos graphing calculator for the *entire* duration of the test. Unlike previous iterations where calculator usage was restricted to specific sections, the DSAT allows calculator usage on every math item. Consequently, the application must embed a fully functional graphing engine identical to the test interface. Strategies must be tagged in the database as "Desmos-Active" or "Desmos-Passive" to optimize solution pathways.3

### **1.1.2 The Multi-Stage Adaptive (MST) Algorithm**

The "Adaptive Structure" is the defining mechanic of the DSAT. It differs from question-adaptive tests (like the GMAT or CAT-ASVAB) which adapt after every item. The DSAT adapts module-by-module. This necessitates a "Routing Logic" in the application's mock exam engine.2

**Module 1 (The Routing Module):**

* **Composition:** Contains a broad mix of Easy, Medium, and Hard questions across all domains.  
* **Function:** Its primary function is to estimate the test-taker's provisional ability (![][image1]).  
* **Routing Criticality:** Performance in Module 1 determines the difficulty of Module 2\. This is a binary switch. There is no gradient; the user is routed to either the Hard Module or the Easy Module.

**Module 2 (The Targeted Module):**

Based on the performance in Module 1, the algorithm routes the student to one of two static second modules:

* **Hard Module 2 (M2-Hard):** Contains a higher difficulty distribution. Access to this module is a prerequisite for scoring above \~600. The "floor" of this module is high, but the "ceiling" is 800\.6  
* **Easy Module 2 (M2-Easy):** Contains lower difficulty items. Routing here mathematically eliminates the possibility of a high score. Analysis suggests that even a perfect performance in M2-Easy caps the section score around 600–650.7

**Implication for App Logic:** The application’s diagnostic and practice mode must track "Routing Criticality." Users must be trained to treat Module 1 accuracy with extreme priority. Psychometric data suggests that missing more than roughly 30-40% of questions in Module 1 (approx. 8–10 questions in RW, 7–9 in Math) risks routing to the lower module, capping the score potential. The app must simulate this pressure, flagging "Routing Risk" when a user’s Module 1 performance wavers.6

### **1.1.3 Scoring Mechanics and Difficulty Progression**

The scoring is based on Item Response Theory (IRT), specifically variants of the 2-Parameter Logistic (2PL) or 3-Parameter Logistic (3PL) models. In this framework, raw scores (number correct) do not translate linearly to scaled scores (200-800).9

* **Item Parameters:** Every question in the database must be assigned:  
  * **Difficulty (![][image2]):** The probability of a correct answer decreases as ![][image2] increases.  
  * **Discrimination (![][image3]):** How well the item differentiates between high and low ability students.  
* **Pretest Items:** Each module contains 2 unscored "pretest" questions used for future test calibration. The app should simulate this uncertainty; users cannot know which items are scored, preventing "gaming" of the test.11  
* **Equating Curves:** The app must use lookup tables derived from official practice tests to simulate "Equating Curves." These curves show that on a difficult test form, one mistake might cost 10 points, whereas on an easier form (where perfection is expected), one mistake might cost 30 points. This variance is crucial for managing user expectations.12

## ---

**1.2 Question Taxonomy and Logic Models**

This section defines the "Schema" for the question database. Every question in the application must be tagged with these attributes to enable granular analytics. The taxonomy is derived from the "Content Domains" specified in the College Board's technical manuals.14

### **1.2.1 Reading and Writing Taxonomy**

The RW section tests four domains: **Craft and Structure**, **Information and Ideas**, **Standard English Conventions**, and **Expression of Ideas**. The "Passage-Based" nature of the old SAT has been replaced by discrete, atomic items.

#### **Cluster A: Information and Ideas (Logic & Comprehension)**

**1\. Central Idea / Details**

* **Skill Tested:** Distinguishing the primary argument (macro) from supporting evidence (micro) within a 25–150 word text.  
* **Logic Model:** Identify(Subject) AND Identify(Predicate/Claim) AND Exclude(Specific Details). The correct answer must encompass the *entirety* of the text's scope, not just a subset.  
* **Trap Structure:**  
  * *True but Too Narrow:* A detail mentioned in the text that is factually correct but fails to cover the main argument.  
  * *Misattributed Causality:* Concepts are present, but the cause-effect relationship is reversed.  
* **Elite Behavior:** Summarizes the text *before* reading the choices to prevent distractor priming.16  
* **Differentiation (700 vs 800):** High scorers eliminate "True but Too Narrow" answers instantly; low scorers gravitate toward them because they recognize the keywords from the text.

**2\. Command of Evidence (Textual)**

* **Skill Tested:** Linking a specific claim to the text segment that proves it.  
* **Logic Model:** Claim(C) requires Support(S). Find Option where Option implies C. The system must verify that the selected evidence provides *sufficient* condition for the claim.  
* **Trap Structure:**  
  * *Topical Relevance without Logical Support:* Mentions the right keywords (e.g., "dinosaurs," "fossils") but doesn't prove the specific claim (e.g., "predatory behavior").17  
  * *Inverse Support:* Evidence that actually weakens the claim or supports a counter-claim.  
* **Time Cost:** High (requires re-reading).

**3\. Command of Evidence (Quantitative)**

* **Skill Tested:** Synthesizing text claims with graph/table data.  
* **Logic Model:** Data\_Point(X, Y) validates Hypothesis(H). The user must strictly interpret the *legend* and *axes*.  
* **Trap Structure:**  
  * *True Data, Wrong Claim:* The data point is in the graph (e.g., "Bar A is higher than Bar B") but doesn't support the specific argument in the text.18  
  * *Unit Errors:* Confusing raw numbers with percentages or rates.  
* **Elite Behavior:** Checks axis labels and legends immediately. Filters options by "True/False" against the graph first, then "Supports/Does Not Support" against the text.

**4\. Inference**

* **Skill Tested:** Deductive reasoning to fill a logical gap. Prompt: "Which choice most logically completes the text?"  
* **Logic Model:** Premise A \+ Premise B \-\> Conclusion C. The conclusion must be a *necessary* consequence of the premises.  
* **Trap Structure:**  
  * *The "Speculative Leap":* Plausible in the real world but not strictly supported by the provided premises.  
  * *The "Extreme Absolute":* Uses words like "always," "never," "proven" when the text implies "suggests," "indicates," or "likely".20  
* **Elite Behavior:** Strict adherence to "If it's not in the text, it doesn't exist." They treat the text as a closed universe of facts.

#### **Cluster B: Craft and Structure (Rhetoric & Vocabulary)**

**5\. Words in Context**

* **Skill Tested:** High-utility academic vocabulary and tier-2 words (e.g., *ambivalence*, *enumerate*, *concede*).21  
* **Logic Model:** Context\_Clues(Sentence) \-\> Definition\_Requirement \-\> Match(Vocabulary). The slot in the sentence has a "charge" (positive/negative) and a "definition."  
* **Trap Structure:**  
  * *Primary vs. Secondary Meaning:* Using the common definition of a word when the context demands a rare one (e.g., "husband" meaning "to conserve resources" rather than "spouse").  
  * *The "Sound-Alike":* Phonetic distractors or words with similar roots but different meanings (e.g., *prescribe* vs. *proscribe*).  
* **Elite Behavior:** Generates a synonym mentally before looking at choices.22

**6\. Text Structure and Purpose**

* **Skill Tested:** Identifying *why* an author wrote a text or *how* it is organized abstractly.  
* **Logic Model:** Identify(Function) e.g., "criticize," "explain," "introduce," "contrast."  
* **Trap Structure:**  
  * *Half-Right:* "To criticize a study and offer a solution" (when the text criticizes but offers no solution).  
* **Differentiation:** High scorers look for the *verb* in the answer choice first (e.g., "To highlight...").

**7\. Cross-Text Connections**

* **Skill Tested:** Comparative analysis of two authors' viewpoints.  
* **Logic Model:** Author1(View) vs Author2(View). Common relationships: Agreement, Disagreement, Qualification (Agree with reservation).  
* **Trap Structure:**  
  * *False Agreement:* Assuming authors agree because they discuss the same topic or use similar jargon.

#### **Cluster C: Standard English Conventions (Grammar)**

**8\. Boundaries and Punctuation**

* **Skill Tested:** Semicolons, periods, colons, dashes, comma splices, run-on sentences.  
* **Logic Model:** Clause\_Check(Independent vs. Dependent).  
  * Indep \+ ; \+ Indep (Valid)  
  * Indep \+. \+ Indep (Valid)  
  * Indep \+ , \+ Indep (Invalid \- Comma Splice)  
  * Indep \+ : \+ Explanation/List (Valid)  
* **Trap Structure:**  
  * *The "Fake Pause":* placing a comma where one "breathes" naturally but no grammatical rule exists.23  
* **Elite Behavior:** Does not "listen" to the sentence. Applies rigid syntactic rules.

**9\. Form, Structure, and Sense**

* **Skill Tested:** Subject-Verb Agreement, Pronoun-Antecedent Agreement, Verb Tense, Parallel Structure.  
* **Logic Model:** Identify(Subject) \-\> Ignore(Prepositional Phrases) \-\> Match(Verb).  
* **Trap Structure:**  
  * *Intervening Phrases:* "The box \[of nails\] *is* heavy" (Trap: *are* heavy because the ear hears "nails are").24  
  * *Dangling Modifiers:* "Walking down the street, the trees looked beautiful" (Implies the trees were walking).

#### **Cluster D: Expression of Ideas (Rhetoric)**

**10\. Rhetorical Synthesis**

* **Skill Tested:** Selecting information from bulleted notes to achieve a specific rhetorical goal. *This is a new, digital-exclusive item type.*  
* **Logic Model:** Goal(X) \-\> Filter(Bullet Points) \-\> Select(Sentence doing X). The grammar is usually correct in all choices; the test is relevance.  
* **Trap Structure:**  
  * *The "Kitchen Sink":* Includes all information from the bullets but fails the specific rhetorical goal (e.g., "introduce the researcher" vs "summarize the findings").25  
* **Elite Behavior:** Reads the *question stem* (the goal) before reading the bullet points to filter noise.27

**11\. Transitions**

* **Skill Tested:** Logical connectors (However, Therefore, Furthermore, Likewise).  
* **Logic Model:** Sentence A Sentence B.  
  * Relationships: *Contrast, Causation, Continuation/Addition*.  
* **Trap Structure:**  
  * *The "Synonym Trap":* "Therefore" and "Consequently" are synonyms. If both appear as options, neither is likely correct unless there is a nuance distinction.28  
* **Time Cost:** Medium.

### ---

**1.2.2 Math Taxonomy**

The Math section is divided into four domains: **Algebra**, **Advanced Math**, **Problem-Solving and Data Analysis**, and **Geometry and Trigonometry**.15

#### **Cluster A: Algebra (Heart of Algebra)**

*35% of Test / \~13-15 Questions*

**1\. Linear Equations (One Variable)**

* **Skill:** Solving ![][image4].  
* **Logic:** Isolation of variables.  
* **Trap:** Solving for ![][image5] when the question asks for the value of expression ![][image6] (The "Phantom Variable" trap).29

**2\. Systems of Linear Equations**

* **Skill:** Intersection of lines. Finding ![][image7].  
* **Logic:** Substitution vs. Elimination.  
* **Elite Insight:** Recognizing "No Solution" (parallel lines, same slope, different y-intercept) vs. "Infinite Solutions" (same line) immediately by inspecting coefficients (![][image8]) without solving.30

**3\. Linear Inequalities**

* **Skill:** Shading regions, boundary lines.  
* **Trap:** Forgetting to flip the inequality sign when dividing by a negative number.

#### **Cluster B: Advanced Math (Passport to Advanced Math)**

*35% of Test / \~13-15 Questions*

**4\. Nonlinear Functions (Quadratics)**

* **Skill:** Vertex form (![][image9]), factored form, standard form, discriminant analysis.  
* **Logic:** Discriminant ![][image10]. If ![][image11] (2 real roots), ![][image12] (1 real root), ![][image13] (no real roots).  
* **Trap:** Confusing "intercepts" with "vertex". Confusing "maximum height" (y-value of vertex) with "time to max height" (x-value of vertex).

**5\. Exponential Functions**

* **Skill:** Growth/Decay models ![][image14].  
* **Trap:** Unit mismatch in time ![][image15] (e.g., rate is annual, time given in months).

**6\. Radical and Rational Equations**

* **Skill:** Solving equations with ![][image16] or ![][image17].  
* **Trap:** **Extraneous Solutions**. Solutions that emerge algebraically (e.g., from squaring both sides) but violate domain constraints (e.g., denominator cannot be zero, square root cannot equal negative). The app must force users to "Plug Back In".31

#### **Cluster C: Problem-Solving and Data Analysis**

*15% of Test / \~5-7 Questions*

**7\. Ratios, Rates, Proportions**

* **Skill:** Unit conversion, scaling, percentages.  
* **Logic:** Dimensional analysis (canceling units).  
* **Trap:** "Square unit" conversions (e.g., 1 square yard \= 9 square feet, not 3). This is a frequent error source.32

**8\. Probability and Statistics**

* **Skill:** Mean, Median, Mode, Range, Standard Deviation, Margin of Error.  
* **Trap:** Assuming "Margin of Error" implies a mistake in the study rather than a statistical confidence interval.  
* **Elite Insight:** Median location logic (![][image18]) for frequency tables.

#### **Cluster D: Geometry and Trigonometry**

*15% of Test / \~5-7 Questions*

**9\. Circles**

* **Skill:** Equation of a circle ![][image19]. Completing the square to find center/radius.  
* **Trap:** Forgetting to square the radius term (![][image20] vs ![][image21]).

**10\. Trigonometry**

* **Skill:** SOH CAH TOA, Radians/Degrees conversion, Unit Circle, Complementary Angle Theorem.  
* **Logic:** ![][image22] identity is heavily tested and allows instant solution of complex-looking problems.

# ---

**SECTION 2\. OFFICIAL SAT MATERIALS ANALYSIS**

The "Ground Truth" for the application comes from the analysis of released College Board data, specifically the Bluebook practice tests and technical specifications.

## **2.1 Pattern Recognition in Official Tests**

Analysis of Bluebook Practice Tests 1–4 reveals distinct patterns that differ from third-party materials. The application must prioritize these patterns in its content generation engine.

### **2.1.1 Recurring Structures**

* **Grammar Frequency:** "Subject-Verb Agreement" with intervening prepositional phrases is the single most common grammatical trap. The structure is almost always Subject \+ \[Prepositional Phrase\] \+ Verb. The trap is that the object of the preposition is plural while the subject is singular (e.g., "The box of nails is...")..24  
* **Math "Inspection" Problems:** "Systems of Equations" questions asking for the *number of solutions* (0, 1, or infinite) appear in nearly every module. These are designed to be solved by inspection of slope ratios (![][image23]) rather than algebraic calculation. High scorers solve these in \<10 seconds.29  
* **"Note-Taking" Dominance:** The "Rhetorical Synthesis" questions are a new, high-frequency type specific to the DSAT. They appear 2-4 times per module. They test strict logical filtering, not grammar.

## **2.2 Difficulty Tagging Framework**

The application must use a 5-tier difficulty tag for every question, derived from Item Response Theory (IRT) difficulty parameters (![][image2]). This allows for precise adaptive scaling.

| Difficulty Tier | Description | Characteristics |
| :---- | :---- | :---- |
| **Level 1 (Fundamental)** | Recall / Direct Application | Single-step logic. Formula recall (![][image24]). No distractors. |
| **Level 2 (Procedural)** | Standard Algorithm | Two-step process (e.g., isolate ![][image25], then substitute). Distractors are calculation errors. |
| **Level 3 (Conceptual)** | Synthesis | Connecting two domains (e.g., Geometry \+ Algebra). Word problem translation required. |
| **Level 4 (Strategic)** | Trap-Heavy | Designed with a specific "Cognitive Trap" (e.g., Extraneous solutions in radicals). Requires "exception" handling. |
| **Level 5 (Discriminator)** | Abstract / Novel | The "800-maker." Abstract generalization (variables only, no numbers). Novel application of rules.33 |

## **2.3 Mistake Classification Model**

To power the analytics engine, mistakes cannot be binary. They must be classified by *root cause*.

1. **Selection Error:** User solved correctly but clicked the wrong bubble (UI error).  
2. **Process Error:** User knew the method but made a calculation slip (e.g., ![][image26]).  
3. **Knowledge Void:** User did not know the underlying concept (e.g., "What is a discriminant?").  
4. **Trap Activation:** User fell for a designed distractor (e.g., The "Phantom Variable").  
5. **Time-Forced Error:** User guessed due to clock pressure.

# ---

**SECTION 3\. PREP AUTHORITY INTELLIGENCE SYNTHESIS**

To build the "Definitive" knowledge base, the system must ingest and synthesize the methodologies of the current market leaders. The app should not reinvent the wheel but rather digitize the most effective heuristics.

## **3.1 Comparative Strategy Matrix**

| Authority | Core Philosophy | Key Contribution to App Logic | Limitation |
| :---- | :---- | :---- | :---- |
| **College Board (Official)** | "Skills Insight" | The source of truth for **Scope** and **Format**.35 | Explanations are often procedural and academic, lacking strategic shortcuts. |
| **Erica Meltzer** | Grammar Taxonomy | Provides the definitive **Rule Base** for the "Standard English Conventions" module (e.g., Dash rules, Colon rules).23 | Focus is rules-heavy; less emphasis on speed heuristics. |
| **Dr. John Chung** | "Tips" / Patterns | Identified **63 Specific Math Patterns** that recur. Excellent for "Level 5" Hard Math training.37 | Can be intimidating for low scorers; focuses on "tricks" over foundational theory. |
| **1600.io** | Deep Understanding | Emphasizes **reading comprehension** in Math (word problem translation) and **Desmos** mastery.39 | High cognitive load; requires patience. |
| **Khan Academy** | Mastery Learning | Provides the **Skill Tree** structure (Foundations \-\> Medium \-\> Advanced).40 | Question style sometimes deviates slightly from the adaptive nuance of Bluebook. |

## **3.2 Durable Strategies for the Knowledge Base**

The app must encode these "Consensus Strategies" as programmable hints or lesson modules:

1. **Desmos-First Approach:** For Systems of Equations and Function Analysis, graphing is faster and less error-prone than algebra. The app must teach "Desmos Hacks" (regressions, intersection finding) as primary skills, not cheats. Specifically, the regression ![][image27] is a critical tool for finding equations from tables.3  
2. **"Answer First" in Math:** For questions asking for a specific value (e.g., "What is the value of x?"), plugging in answers (Back-solving) is a valid, programmable strategy. The app should detect when a question is solvable via this method and suggest it if the user struggles.  
3. **"Strict Literalism" in Reading:** The correct answer is often a synonym-swap of the text. Inference is minimal. The app must train users to "Match, don't Predict".42  
4. **Grammar "Hearing" Suppression:** The system must actively discourage "listening" to the sentence (the "ear test") and enforce rule-based checking, as the test specifically exploits ear-based errors.24

# ---

**SECTION 4\. ELITE SCORER BEHAVIOR MODEL**

To train users to score 1550+, the system must replicate the metacognitive processes of elite scorers. This goes beyond content knowledge to "Test IQ."

## **4.1 The Elite Decision Loop**

Research into high-performing students reveals a distinct "Algorithm" of thought that functions as a high-speed OODA loop (Observe, Orient, Decide, Act).

1. **Classification (0-3 seconds):** They identify the **Question Type** immediately. (e.g., "This is a Command of Evidence question"). They do not read the passage first; they read the *question stem* first.  
2. **Constraint Identification (3-10 seconds):** They identify the **Limiting Factor**. (e.g., "I need a sentence that supports the *second* hypothesis, not the first").  
3. **Elimination Heuristic (10-40 seconds):** They do not look for the right answer; they look for 3 wrong answers. This reduces cognitive load. They aggressively cross out "Rotten Fruit" (mostly right, slightly wrong) answers.  
4. **Validation (40-60 seconds):** In Math, they re-read the final clause (e.g., "Value of ![][image28]", not "![][image5]") before submitting.43

## **4.2 Error Taxonomy System (The "Black Box" Recorder)**

The application must use a rigorous error code system. Elite scorers categorize their errors meticulously.

* **ERR\_CON:** Concept Failure (User didn't know the formula).  
* **ERR\_READ:** Reading Failure (User missed a "not" or constraints).  
* **ERR\_CALC:** Calculation/Execution Error (2+2=5).  
* **ERR\_TRAP:** Fell for a specific Distractor (e.g., Selected the "Phantom Variable" answer).  
* **ERR\_TIME:** Forced guess due to clock.

The app will force users to tag their errors during review. This data feeds the adaptive engine.44

## **4.3 Pacing Strategy**

Elite scorers utilize a non-linear pacing strategy.

* **RW Section:** They aim to bank time on "Grammar" questions (Target: 20-30 seconds) to allocate to "Inference" questions (Target: 60-90 seconds).  
* **Math Section:** They utilize the "Skip Rule." If a pathway to the solution is not visible within 30 seconds, they flag and skip. This prevents "tunnel vision" on a single hard problem from destroying the score on easier subsequent problems.46

# ---

**SECTION 5\. DELIBERATE PRACTICE ENGINE (THE "OS")**

This section defines the software architecture of the learning system. It utilizes **Bayesian Knowledge Tracing (BKT)** and **Spaced Repetition** to ensure retention and mastery.

## **5.1 System Components**

### **5.1.1 The Diagnostic Layer**

* **Input:** A calibrated "Mini-MST" (multi-stage test) that mimics the real exam's routing.  
* **Process:** Administers a broad range of items. Uses a **Decision Tree** to drill down. If a student misses a "Linear Equation" question, it triggers a "Prerequisite Check" (Arithmetic operations).  
* **Output:** A **Knowledge Graph** visualization showing nodes (skills) as "Locked," "Unlocked," or "Mastered".48

### **5.1.2 The Dependency Graph (Math)**

Math is hierarchical. The app must enforce prerequisite chains, represented as a Directed Acyclic Graph (DAG).

* *Node A:* Arithmetic Operations \-\> *Node B:* Pre-Algebra \-\> *Node C:* Linear Equations \-\> *Node D:* Systems of Equations \-\> *Node E:* Quadratics.  
* **Rule:** A user cannot practice "Quadratics" efficiently if "Factoring" (a dependency) is weak. The scheduler must block advanced nodes until dependencies meet a threshold (![][image29]).50

### **5.1.3 The Scheduler (Spaced Repetition \+ Interleaving)**

* **Algorithm:** A modified SM-2 (SuperMemo) or FSRS (Free Spaced Repetition Scheduler) algorithm adapted for problem types rather than static flashcards.  
* **Logic:**  
  * *New Items:* Presented in **Blocked** mode (AAA BBB CCC) for initial acquisition. This reduces cognitive load during the learning phase.  
  * *Review Items:* Presented in **Interleaved** mode (ABC BCA CAB) to force "Retrieval Practice" and prevent pattern-matching fatigue. Research shows interleaving improves test-day transfer.52  
* **Adaptation:** If a user answers correctly but with a long latency (time \> 90s), the interval is shortened. "Struggle" is treated as partial failure.

## **5.2 Mastery Thresholds**

The definition of "Done" must be statistical.

* **Proficiency:** 3 correct in a row in a Blocked set.  
* **Mastery:** 95% probability of correctness on "Level 4/5" items over a 7-day interval.  
* **Drift Alert:** If a user hasn't seen a topic in 14 days, the system injects a "Maintenance Question." If missed, the skill status degrades from "Mastered" to "Review Needed."

# ---

**SECTION 6\. TRAP AND DISTRACTOR ENGINEERING**

The system must teach users to identify "The Enemy" (the test maker's tricks). The application should have a "Distractor Library" where users can see the common ways they are tricked.

## **6.1 Distractor Taxonomy (Reading)**

1. **The "Rotten Fruit":** The answer is 90% correct but has one wrong word (usually an adjective like "all," "never," "rapidly") that makes it technically false. This targets skimmers.  
2. **The "Recycled Word":** Uses complex words from the text but scrambles the meaning. This is a cognitive trap for students with low reading comprehension who rely on keyword matching.54  
3. **The "True but Irrelevant":** A statement that is factually true based on the passage but does not answer the specific question (e.g., answers "What" when the question asks "Why").  
4. **The "Extreme Absolute":** Uses distinctively absolute language ("unquestionably," "impossible") which is rarely correct in academic prose.20

## **6.2 Distractor Taxonomy (Math)**

1. **The "Common Misconception":** Answers generated by applying a common error (e.g., adding denominators in fractions, ![][image30]).  
2. **The "Partial Step":** The answer is the value of ![][image5] when the question explicitly asks for ![][image31]. This is the "Phantom Variable" trap.29  
3. **The "Unit Trap":** An answer provided in minutes when the question asks for hours. Or square feet vs square yards.32  
4. **The "Sign Error":** The correct answer multiplied by \-1.

# ---

**SECTION 7\. STRATEGY LIBRARY**

Atomic, actionable strategies for the software to dispense as "Tips" or "Hints." These are not vague advice but algorithmic procedures.

## **7.1 Reading Strategies**

* **STRAT\_RW\_01 (Vocab):** "Positive/Negative Charge." If the context is positive, eliminate all negative words immediately.  
* **STRAT\_RW\_05 (Rhetorical Synthesis):** "Read the Question Stem First." Highlight the goal (e.g., 'emphasize similarity'). Select the choice that explicitly mentions the similarity. Ignore all other bullets.25  
* **STRAT\_RW\_09 (Transitions):** "Dumb Summary Strategy." Read the two sentences. Mentally insert 'AND' (continuation), 'BUT' (contrast), or 'SO' (cause). Match your mental word to the choices.55

## **7.2 Math Strategies**

* **STRAT\_M\_03 (Desmos \- Systems):** "Type both equations. Hover over the intersection point. The answer is the coordinate." (Avoids substitution/elimination errors).  
* **STRAT\_M\_07 (Geometry):** "Exaggeration." If a diagram is not drawn to scale (or no diagram is given), draw it with extreme exaggerations to see the relationships (e.g., make an acute angle clearly acute).  
* **STRAT\_M\_12 (Pacing):** "The Skip Rule. If you stare at a math problem for 30 seconds without writing anything or typing in Desmos, flag it and move on immediately."

# ---

**SECTION 8\. OUTPUT FORMAT REQUIREMENTS**

To translate this research into code, the following data schemas are proposed for the application's database.

## **8.1 Question Object Schema (JSON)**

JSON

{  
  "id": "M\_ALG\_LIN\_045",  
  "domain": "Math",  
  "cluster": "Algebra",  
  "skill": "Linear Equations",  
  "difficulty\_irt": 0.85,   
  "tags": \["word\_problem", "variables\_on\_both\_sides"\],  
  "trap\_type": "phantom\_variable",  
  "content": "2x \+ 5 \= 15\. What is the value of 2x \- 3?",  
  "distractors":,  
  "correct\_answer": "7",  
  "desmos\_allowed": true,  
  "time\_benchmark\_sec": 45  
}

## **8.2 Strategy Object Schema**

JSON

{  
  "id": "STRAT\_DESMOS\_REGRESSION",  
  "name": "Desmos Regression Hack",  
  "trigger\_condition": "Table of values given, asking for equation",  
  "steps":,  
  "video\_ref": "vid\_desmos\_reg\_01"  
}

## **8.3 Drill Progression Rule (Algorithm)**

Python

def get\_next\_question(user\_profile):  
    if user\_profile.module\_1\_accuracy \< 0.70:  
        \# Remediation Mode  
        return fetch\_question(difficulty="Easy", skill=user\_profile.weakest\_dependency)  
    else:  
        \# Mastery Mode (Interleaving)  
        if random.random() \> 0.3:  
            return fetch\_question(difficulty="Hard", skill=user\_profile.current\_focus)  
        else:  
            return fetch\_question(difficulty="Medium", skill=user\_profile.review\_queue.pop())

# ---

**FINAL DIRECTIVE**

This specification outlines a system that treats SAT prep as a data science problem. By mapping the dependency graphs of math concepts, enforcing the logic models of reading questions, and utilizing adaptive scheduling, this platform will systematically dismantle the difficulty of the exam. The focus is not on "teaching" in the traditional sense, but on **optimizing the test-taker's neural network** to recognize and execute the correct patterns under time constraints. The system must remain rigid in its taxonomy and adaptive in its delivery, ensuring that "missing a question" becomes a statistically rare event for the user.

#### **Works cited**

1. How Does Adaptive Testing Work In The Digital SAT? \- EdisonOS, accessed January 26, 2026, [https://www.edisonos.com/digital-sat/adaptive-testing](https://www.edisonos.com/digital-sat/adaptive-testing)  
2. What is Digital SAT Adaptive Testing? \- College Board Blog, accessed January 26, 2026, [https://blog.collegeboard.org/what-digital-sat-adaptive-testing](https://blog.collegeboard.org/what-digital-sat-adaptive-testing)  
3. How to make most out of desmos?? : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1aismca/how\_to\_make\_most\_out\_of\_desmos/](https://www.reddit.com/r/Sat/comments/1aismca/how_to_make_most_out_of_desmos/)  
4. Desmos tips or shortcuts for dsat? : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1ej8mdq/desmos\_tips\_or\_shortcuts\_for\_dsat/](https://www.reddit.com/r/Sat/comments/1ej8mdq/desmos_tips_or_shortcuts_for_dsat/)  
5. Adaptive questions? : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1c64858/adaptive\_questions/](https://www.reddit.com/r/Sat/comments/1c64858/adaptive_questions/)  
6. New Digital SAT Format: How Modules Work | Piqosity SAT Prep, accessed January 26, 2026, [https://www.piqosity.com/digital-sat-format-modules-easy-vs-hard/](https://www.piqosity.com/digital-sat-format-modules-easy-vs-hard/)  
7. Please help me understand\!\!\!\!\!\!\!\! : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1j04hxq/please\_help\_me\_understand/](https://www.reddit.com/r/Sat/comments/1j04hxq/please_help_me_understand/)  
8. What is the maximum score possible if you get the “easy” module 2? : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1bva980/what\_is\_the\_maximum\_score\_possible\_if\_you\_get\_the/](https://www.reddit.com/r/Sat/comments/1bva980/what_is_the_maximum_score_possible_if_you_get_the/)  
9. An Adaptive System For Standardized Test Preparation \- CS229: Machine Learning, accessed January 26, 2026, [https://cs229.stanford.edu/proj2014/Julia%20Enthoven,An%20Adaptive%20System%20For%20Standardized%20Test%20Preparation.pdf](https://cs229.stanford.edu/proj2014/Julia%20Enthoven,An%20Adaptive%20System%20For%20Standardized%20Test%20Preparation.pdf)  
10. \[1803.05926\] Learning meets Assessment: On the relation between Item Response Theory and Bayesian Knowledge Tracing \- arXiv, accessed January 26, 2026, [https://arxiv.org/abs/1803.05926](https://arxiv.org/abs/1803.05926)  
11. The Complete Guide to the Digital Adaptive SAT \- Applerouth, accessed January 26, 2026, [https://www.applerouth.com/blog/the-complete-guide-to-the-digital-adaptive-sat](https://www.applerouth.com/blog/the-complete-guide-to-the-digital-adaptive-sat)  
12. Digital SAT Score: Chart, Range & How to Calculate? \- EdisonOS, accessed January 26, 2026, [https://www.edisonos.com/digital-sat/score-calculator](https://www.edisonos.com/digital-sat/score-calculator)  
13. August 2025 SAT Scores Explained: How Digital Scoring Works \- Gateplus, accessed January 26, 2026, [https://blog.gateplus.org/blog-articles/august-2025-sat-scores-how-your-digital-score-is-calculated](https://blog.gateplus.org/blog-articles/august-2025-sat-scores-how-your-digital-score-is-calculated)  
14. The Reading and Writing Section \- SAT Suite \- College Board, accessed January 26, 2026, [https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing](https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing)  
15. The Math Section: Overview \- SAT Suite \- College Board, accessed January 26, 2026, [https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview](https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview)  
16. Broad thoughts on the Reading question types on the Digital SAT \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/zzf6he/broad\_thoughts\_on\_the\_reading\_question\_types\_on/](https://www.reddit.com/r/Sat/comments/zzf6he/broad_thoughts_on_the_reading_question_types_on/)  
17. Command of evidence: textual | Lesson (article) \- Khan Academy, accessed January 26, 2026, [https://www.khanacademy.org/test-prep/sat-reading-and-writing/x0d47bcec73eb6c4b:foundations-information-and-ideas/x0d47bcec73eb6c4b:command-of-evidence-textual/a/command-of-evidence-textual-lesson](https://www.khanacademy.org/test-prep/sat-reading-and-writing/x0d47bcec73eb6c4b:foundations-information-and-ideas/x0d47bcec73eb6c4b:command-of-evidence-textual/a/command-of-evidence-textual-lesson)  
18. Command of Evidence SAT®: How to Stop Losing Easy Points \- UWorld College Prep, accessed January 26, 2026, [https://collegeprep.uworld.com/blog/command-of-evidence-sat-writing-strategies/](https://collegeprep.uworld.com/blog/command-of-evidence-sat-writing-strategies/)  
19. Command of evidence: quantitative | Lesson (article) \- Khan Academy, accessed January 26, 2026, [https://www.khanacademy.org/test-prep/sat-reading-and-writing/x0d47bcec73eb6c4b:foundations-information-and-ideas/x0d47bcec73eb6c4b:command-of-evidence-quantitative/a/command-of-evidence-quantitative-lesson](https://www.khanacademy.org/test-prep/sat-reading-and-writing/x0d47bcec73eb6c4b:foundations-information-and-ideas/x0d47bcec73eb6c4b:command-of-evidence-quantitative/a/command-of-evidence-quantitative-lesson)  
20. How to Identify Wrong Answer Traps in SAT Reading | RevisionDojo, accessed January 26, 2026, [https://www.revisiondojo.com/blog/how-to-identify-wrong-answer-traps-in-sat-reading-revision](https://www.revisiondojo.com/blog/how-to-identify-wrong-answer-traps-in-sat-reading-revision)  
21. 550 Words to Know for the Digital SAT | TP4S, accessed January 26, 2026, [https://tp4s.com/wp-content/uploads/2022/11/digital-SAT-word-list.pdf](https://tp4s.com/wp-content/uploads/2022/11/digital-SAT-word-list.pdf)  
22. Every Type of Question On The Reading & Writing Section (For March Test-Takers\!\!) : r/Sat, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/m1jire/every\_type\_of\_question\_on\_the\_reading\_writing/](https://www.reddit.com/r/Sat/comments/m1jire/every_type_of_question_on_the_reading_writing/)  
23. SAT Grammar Rules | PDF \- Scribd, accessed January 26, 2026, [https://www.scribd.com/document/760993193/SAT-Grammar-Rules](https://www.scribd.com/document/760993193/SAT-Grammar-Rules)  
24. Explaining ALL of SAT Grammar in 5 MINUTES | PRACTICE INCLUDED \- YouTube, accessed January 26, 2026, [https://www.youtube.com/watch?v=u-1y1Rnh-M4](https://www.youtube.com/watch?v=u-1y1Rnh-M4)  
25. Mastering Rhetorical Synthesis Questions on the Digital SAT \- Test Ninjas, accessed January 26, 2026, [https://test-ninjas.com/sat-rhetorical-synthesis](https://test-ninjas.com/sat-rhetorical-synthesis)  
26. Rhetorical synthesis | Top tips (article) \- Khan Academy, accessed January 26, 2026, [https://www.khanacademy.org/test-prep/sat-reading-and-writing/x0d47bcec73eb6c4b:advanced-expression-of-ideas-and-standard-english-conventions/x0d47bcec73eb6c4b:rhetorical-synthesis-3/a/rhetorical-synthesis-top-tips](https://www.khanacademy.org/test-prep/sat-reading-and-writing/x0d47bcec73eb6c4b:advanced-expression-of-ideas-and-standard-english-conventions/x0d47bcec73eb6c4b:rhetorical-synthesis-3/a/rhetorical-synthesis-top-tips)  
27. SAT Bullet Point Questions: The Strategy for Rhetorical Synthesis \- PrepMaven, accessed January 26, 2026, [https://prepmaven.com/blog/test-prep/sat-rhetorical-synthesis-strategy/](https://prepmaven.com/blog/test-prep/sat-rhetorical-synthesis-strategy/)  
28. SAT Writing Transitions: The Eleven Essential Words \- 1600.io, accessed January 26, 2026, [https://1600.io/p/blog?p=sat-writing-transitions-the-eleven-essential-words](https://1600.io/p/blog?p=sat-writing-transitions-the-eleven-essential-words)  
29. 7 Most Common SAT Math Mistakes and How to Avoid Them \- Blog PrepScholar, accessed January 26, 2026, [https://blog.prepscholar.com/most-common-sat-math-mistakes](https://blog.prepscholar.com/most-common-sat-math-mistakes)  
30. What Are Content Domains? \- SAT Suite \- College Board, accessed January 26, 2026, [https://satsuite.collegeboard.org/practice/content-domains](https://satsuite.collegeboard.org/practice/content-domains)  
31. The Digital SAT Formula Sheet: What's On It, and What Isn't? \- Piqosity, accessed January 26, 2026, [https://www.piqosity.com/digital-sat-formula-sheet/](https://www.piqosity.com/digital-sat-formula-sheet/)  
32. Misconceptions & Distractors in Maths \- Kaggle, accessed January 26, 2026, [https://www.kaggle.com/code/mpwolke/misconceptions-distractors-in-maths](https://www.kaggle.com/code/mpwolke/misconceptions-distractors-in-maths)  
33. Hardest Official Digital SAT Math Practice Questions(Test Bank/UWorld/Khan Academy/Practice Tests) \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1az9bfv/hardest\_official\_digital\_sat\_math\_practice/](https://www.reddit.com/r/Sat/comments/1az9bfv/hardest_official_digital_sat_math_practice/)  
34. All of SAT Math Explained in 26 Minutes \- YouTube, accessed January 26, 2026, [https://www.youtube.com/watch?v=1bTkbmHx944](https://www.youtube.com/watch?v=1bTkbmHx944)  
35. Skills Insight for the Digital SAT Suite, accessed January 26, 2026, [https://satsuite.collegeboard.org/media/pdf/skills-insight-digital-sat-suite.pdf](https://satsuite.collegeboard.org/media/pdf/skills-insight-digital-sat-suite.pdf)  
36. Erica's Meltzer Complete list of SAT grammar rules \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/9yv8hw/ericas\_meltzer\_complete\_list\_of\_sat\_grammar\_rules/](https://www.reddit.com/r/Sat/comments/9yv8hw/ericas_meltzer_complete_list_of_sat_grammar_rules/)  
37. DR. JOHN CHUNG'S DSAT Math TIP \#1 REVIEW \- YouTube, accessed January 26, 2026, [https://www.youtube.com/watch?v=79ocuy3oth4](https://www.youtube.com/watch?v=79ocuy3oth4)  
38. DR John Chung's 54 Perfect Tips For New SAT Math \+ 10 Practice Tests by John Chung, accessed January 26, 2026, [https://www.scribd.com/document/618020865/Dr-John-Chung-s-54-Perfect-Tips-for-New-SAT-Math-10-Practice-Tests-by-John-Chung](https://www.scribd.com/document/618020865/Dr-John-Chung-s-54-Perfect-Tips-for-New-SAT-Math-10-Practice-Tests-by-John-Chung)  
39. 1600.io | Home | 1600.io, accessed January 26, 2026, [https://1600.io/](https://1600.io/)  
40. SAT Math | Test prep \- Khan Academy, accessed January 26, 2026, [https://www.khanacademy.org/test-prep/v2-sat-math](https://www.khanacademy.org/test-prep/v2-sat-math)  
41. Desmos "cheats" : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/1kha66f/desmos\_cheats/](https://www.reddit.com/r/Sat/comments/1kha66f/desmos_cheats/)  
42. Down to 50/50? Don't Justify Your Answers, Identify Wrong Ones \- Young Prodigy, accessed January 26, 2026, [https://youngprodigy.com/sat-reading-dont-justify-identify/](https://youngprodigy.com/sat-reading-dont-justify-identify/)  
43. SAT Math: Common Mistakes That Lower Your Score \- The Princeton Review Singapore, accessed January 26, 2026, [https://www.princetonreview.sg/sat-math-common-mistakes/](https://www.princetonreview.sg/sat-math-common-mistakes/)  
44. Error Logs for the SAT & ACT: Select "File/Make a Copy" and create your own spreadsheet of all your mistakes for optimal improvement, pattern recognition, repetition and retention. \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/ACT/comments/97mxqr/error\_logs\_for\_the\_sat\_act\_select\_filemake\_a\_copy/](https://www.reddit.com/r/ACT/comments/97mxqr/error_logs_for_the_sat_act_select_filemake_a_copy/)  
45. heres how i improved my score from a 1300 to a consistent mid 1500\! make a spreadsheet of all of your mistakes : r/Sat \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/Sat/comments/prpmyr/heres\_how\_i\_improved\_my\_score\_from\_a\_1300\_to\_a/](https://www.reddit.com/r/Sat/comments/prpmyr/heres_how_i_improved_my_score_from_a_1300_to_a/)  
46. accessed January 26, 2026, [https://www.edisonos.com/digital-sat/pacing-the-sat\#:\~:text=In%20the%20Reading%20and%20Writing%20section%2C%20you%20get%20around%2071,avoid%20rushing%20near%20the%20end.](https://www.edisonos.com/digital-sat/pacing-the-sat#:~:text=In%20the%20Reading%20and%20Writing%20section%2C%20you%20get%20around%2071,avoid%20rushing%20near%20the%20end.)  
47. How to Pace the SAT: Strategies to Maximize Your Score \- EdisonOS, accessed January 26, 2026, [https://www.edisonos.com/digital-sat/pacing-the-sat](https://www.edisonos.com/digital-sat/pacing-the-sat)  
48. The Math Academy Way | Justin Skycak, accessed January 26, 2026, [https://www.justinmath.com/files/the-math-academy-way.pdf](https://www.justinmath.com/files/the-math-academy-way.pdf)  
49. Coherence Map \- Achievethecore.org, accessed January 26, 2026, [https://achievethecore.org/page/1118/coherence-map](https://achievethecore.org/page/1118/coherence-map)  
50. Does anyone know of a nice dependence chart for higher level mathematics? \- Reddit, accessed January 26, 2026, [https://www.reddit.com/r/math/comments/8pjpf/does\_anyone\_know\_of\_a\_nice\_dependence\_chart\_for/](https://www.reddit.com/r/math/comments/8pjpf/does_anyone_know_of_a_nice_dependence_chart_for/)  
51. Introduction to the dependency graph \- Tweag, accessed January 26, 2026, [https://tweag.io/blog/2025-09-04-introduction-to-dependency-graph/](https://tweag.io/blog/2025-09-04-introduction-to-dependency-graph/)  
52. Interleaving vs Blocking Practice: Study Methods Explained for High School Entrance Exam Success, accessed January 26, 2026, [https://www.teachthemtostudy.com/articles/interleaving-vs-blocking-practice-study-methods-high-school-entrance-exam-success/](https://www.teachthemtostudy.com/articles/interleaving-vs-blocking-practice-study-methods-high-school-entrance-exam-success/)  
53. Whether Interleaving or Blocking Is More Effective for Long-Term Learning Depends on One's Learning Strategy \- NIH, accessed January 26, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12108632/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12108632/)  
54. Common Wrong Answer Traps on the SAT Reading Section \- \- Ivy League Tutoring, accessed January 26, 2026, [https://ivyleaguetutoring.net/blog/common-wrong-answer-traps-on-the-sat-reading-section/](https://ivyleaguetutoring.net/blog/common-wrong-answer-traps-on-the-sat-reading-section/)  
55. SAT Transitions — Full Strategy Guide \- YouTube, accessed January 26, 2026, [https://www.youtube.com/watch?v=WvpDSRB6NNs](https://www.youtube.com/watch?v=WvpDSRB6NNs)
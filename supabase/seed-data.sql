-- Seed Data for SAT Adaptive Mastery
-- Run after schema.sql to populate initial taxonomy and sample data

-- Insert Skills (Reading & Writing)
INSERT INTO skills (id, name, description, domain) VALUES
('RW_SKILL_INFERENCE', 'Inference', 'Deductive reasoning to fill logical gaps', 'RW_DOMAIN_IA'),
('RW_SKILL_CENTRAL_IDEA', 'Central Idea', 'Identifying main argument vs supporting details', 'RW_DOMAIN_IA'),
('RW_SKILL_EVIDENCE', 'Command of Evidence', 'Linking claims to supporting evidence', 'RW_DOMAIN_IA'),
('RW_SKILL_WORDS_CONTEXT', 'Words in Context', 'Understanding vocabulary from context clues', 'RW_DOMAIN_CS'),
('RW_SKILL_TEXT_STRUCTURE', 'Text Structure', 'Identifying author purpose and organization', 'RW_DOMAIN_CS'),
('RW_SKILL_BOUNDARIES', 'Boundaries', 'Punctuation and sentence boundaries', 'RW_DOMAIN_SEC'),
('RW_SKILL_FORM_SENSE', 'Form and Sense', 'Grammar, verb tense, subject-verb agreement', 'RW_DOMAIN_SEC'),
('RW_SKILL_EXPRESSION', 'Expression of Ideas', 'Clarity, concision, and effective language use', 'RW_DOMAIN_EOI');

-- Insert Skills (Math)
INSERT INTO skills (id, name, description, domain) VALUES
('M_SKILL_LINEAR', 'Linear Equations', 'Solving linear equations and systems', 'M_DOMAIN_ALGEBRA'),
('M_SKILL_QUADRATIC', 'Quadratic Equations', 'Solving quadratic equations and factoring', 'M_DOMAIN_ALGEBRA'),
('M_SKILL_GEOMETRY', 'Geometry', 'Area, volume, angles, triangles, circles', 'M_DOMAIN_GEOMETRY'),
('M_SKILL_STATISTICS', 'Statistics', 'Mean, median, mode, probability', 'M_DOMAIN_ADVANCED_MATH'),
('M_SKILL_FUNCTIONS', 'Functions', 'Function notation, transformations, domain/range', 'M_DOMAIN_ADVANCED_MATH');

-- Insert Trap Types
INSERT INTO trap_types (id, name, description) VALUES
('TRAP_TOO_NARROW', 'Too Narrow', 'Answer is true but covers only a detail, not the main idea'),
('TRAP_TOO_BROAD', 'Too Broad', 'Answer is too general, beyond the text scope'),
('TRAP_REVERSED', 'Reversed Causality', 'Cause and effect are swapped'),
('TRAP_PLAUSIBLE_NOT_PROVEN', 'Plausible but Not Proven', 'Answer seems reasonable but not supported by text'),
('TRAP_HALF_RIGHT', 'Half Right', 'Answer is partially correct but incomplete'),
('TRAP_NEAR_MATCH', 'Near Match', 'Close wording but wrong number, entity, or qualifier'),
('TRAP_WRONG_ENTITY', 'Wrong Entity', 'Correct concept but applied to wrong subject'),
('TRAP_SPECULATIVE_LEAP', 'Speculative Leap', 'Makes assumptions not in the text');

-- Insert Question Types (Sample - Reading & Writing)
INSERT INTO question_types (id, domain, skill_ids, stimulus_format, time_budget_s, difficulty_markers, trap_types) VALUES
('RW_IA_INF_SINGLE', 'RW_DOMAIN_IA', ARRAY['RW_SKILL_INFERENCE'], 'text', 75, ARRAY['D3', 'D4'], ARRAY['TRAP_PLAUSIBLE_NOT_PROVEN', 'TRAP_SPECULATIVE_LEAP']),
('RW_IA_CID_MAIN', 'RW_DOMAIN_IA', ARRAY['RW_SKILL_CENTRAL_IDEA'], 'text', 65, ARRAY['D2', 'D3', 'D4'], ARRAY['TRAP_TOO_NARROW', 'TRAP_TOO_BROAD', 'TRAP_REVERSED']),
('RW_IA_COE_TEXT', 'RW_DOMAIN_IA', ARRAY['RW_SKILL_EVIDENCE'], 'text', 80, ARRAY['D3', 'D4'], ARRAY['TRAP_HALF_RIGHT', 'TRAP_NEAR_MATCH']),
('RW_CS_WIC', 'RW_DOMAIN_CS', ARRAY['RW_SKILL_WORDS_CONTEXT'], 'text', 50, ARRAY['D2', 'D3'], ARRAY['TRAP_WRONG_ENTITY']),
('RW_SEC_BOUNDARIES', 'RW_DOMAIN_SEC', ARRAY['RW_SKILL_BOUNDARIES'], 'text', 45, ARRAY['D1', 'D2', 'D3'], ARRAY[]::TEXT[]);

-- Insert Question Types (Sample - Math)
INSERT INTO question_types (id, domain, skill_ids, stimulus_format, time_budget_s, difficulty_markers, trap_types) VALUES
('M_ALG_LINEAR', 'M_DOMAIN_ALGEBRA', ARRAY['M_SKILL_LINEAR'], 'text', 90, ARRAY['D1', 'D2', 'D3', 'D4'], ARRAY[]::TEXT[]),
('M_ALG_QUADRATIC', 'M_DOMAIN_ALGEBRA', ARRAY['M_SKILL_QUADRATIC'], 'text', 120, ARRAY['D3', 'D4', 'D5'], ARRAY[]::TEXT[]),
('M_GEO_AREA', 'M_DOMAIN_GEOMETRY', ARRAY['M_SKILL_GEOMETRY'], 'text', 100, ARRAY['D2', 'D3', 'D4'], ARRAY[]::TEXT[]),
('M_ADV_FUNCTIONS', 'M_DOMAIN_ADVANCED_MATH', ARRAY['M_SKILL_FUNCTIONS'], 'text', 110, ARRAY['D3', 'D4', 'D5'], ARRAY[]::TEXT[]);

-- Note: Actual items (questions) should be inserted via API or content pipeline
-- Sample item structure:
-- INSERT INTO items (question_type_id, difficulty, stimulus, options, correct_answer, explanation, irt_b) VALUES
-- ('RW_IA_INF_SINGLE', 'D3', 'Sample question text...', '["Option A", "Option B", "Option C", "Option D"]'::jsonb, 'Option B', 'Explanation...', 0.5);

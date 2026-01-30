-- SAT Adaptive Mastery Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Question Types table
CREATE TABLE question_types (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL,
  skill_ids TEXT[] DEFAULT '{}',
  stimulus_format TEXT,
  time_budget_s INTEGER,
  difficulty_markers TEXT[] DEFAULT '{}',
  trap_types TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  domain TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trap Types table
CREATE TABLE trap_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  question_type_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Items (Questions) table
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_type_id TEXT NOT NULL REFERENCES question_types(id),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('D1', 'D2', 'D3', 'D4', 'D5')),
  stimulus TEXT NOT NULL,
  options JSONB, -- For MCQ: array of 4 options
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  trap_ids TEXT[] DEFAULT '{}',
  irt_a FLOAT DEFAULT 1.0, -- Discrimination parameter
  irt_b FLOAT, -- Difficulty parameter
  irt_c FLOAT DEFAULT 0.25, -- Guessing parameter (0.25 for MCQ, 0.0 for SPR)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Error Events table
CREATE TABLE error_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES items(id),
  user_id TEXT NOT NULL, -- For MVP: session-based, can be upgraded to user accounts later
  outcome TEXT NOT NULL CHECK (outcome IN ('CORRECT_FAST', 'CORRECT_SLOW', 'WRONG_TRAP', 'WRONG_KNOWLEDGE', 'WRONG_PROCESS', 'SKIPPED', 'GUESSED', 'TIMEOUT')),
  error_root_cause TEXT CHECK (error_root_cause IN ('E_KNOWLEDGE', 'E_TRANSLATION', 'E_CONSTRAINT', 'E_LOGIC', 'E_PROCESS', 'E_CALC', 'E_READ', 'E_TIME')),
  time_spent_s INTEGER,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Skill States table
CREATE TABLE user_skill_states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  skill_id TEXT NOT NULL REFERENCES skills(id),
  difficulty_band TEXT NOT NULL CHECK (difficulty_band IN ('D1', 'D2', 'D3', 'D4', 'D5')),
  accuracy FLOAT DEFAULT 0.0 CHECK (accuracy >= 0 AND accuracy <= 1),
  speed FLOAT DEFAULT 0.0, -- Average time spent in seconds
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id, difficulty_band)
);

-- Drills table
CREATE TABLE drills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  question_type_ids TEXT[] DEFAULT '{}',
  difficulty_range TEXT[] DEFAULT '{}',
  item_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulations table
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('ReadingAndWriting', 'Math')),
  module1_item_ids UUID[] DEFAULT '{}',
  module2_form TEXT CHECK (module2_form IN ('M2_H', 'M2_L')),
  module2_item_ids UUID[] DEFAULT '{}',
  theta_estimate FLOAT,
  score_estimate INTEGER CHECK (score_estimate >= 200 AND score_estimate <= 800),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  state TEXT DEFAULT 'NOT_STARTED' CHECK (state IN ('NOT_STARTED', 'MODULE1_IN_PROGRESS', 'MODULE1_COMPLETE', 'MODULE2_IN_PROGRESS', 'MODULE2_COMPLETE', 'SECTION_COMPLETE', 'FEEDBACK_SHOWN'))
);

-- Indexes for performance
CREATE INDEX idx_items_question_type ON items(question_type_id);
CREATE INDEX idx_items_difficulty ON items(difficulty);
CREATE INDEX idx_error_events_user_id ON error_events(user_id);
CREATE INDEX idx_error_events_item_id ON error_events(item_id);
CREATE INDEX idx_error_events_timestamp ON error_events(timestamp DESC);
CREATE INDEX idx_user_skill_states_user_id ON user_skill_states(user_id);
CREATE INDEX idx_user_skill_states_skill_id ON user_skill_states(skill_id);
CREATE INDEX idx_drills_user_id ON drills(user_id);
CREATE INDEX idx_simulations_user_id ON simulations(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_question_types_updated_at BEFORE UPDATE ON question_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

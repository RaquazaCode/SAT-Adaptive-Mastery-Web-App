# SAT Adaptive Mastery Web App - Product Overview

## Purpose
Build an adaptive SAT training system that mirrors the Digital SAT format and
routes practice based on error patterns, timing behavior, and skill mastery.

## Primary Goals
- Model SAT structure (Reading & Writing, Math; module-based routing).
- Track mastery at the question-type and skill level.
- Use error events and speed signals to drive drill sequencing.
- Provide simulations that feel like the real exam.

## Non-Goals (Initial Phase)
- Full content authoring tooling for third-party contributors.
- Production-grade analytics dashboards beyond learner insights.
- Live, paid tutoring marketplace or scheduling system.

## Target Users
- Students preparing for the Digital SAT who want adaptive, data-driven practice.
- Tutors/parents tracking progress and weak areas.

## Core Experiences
- Adaptive drills based on recent errors and time behavior.
- Diagnostic tests and full-length simulations with routing.
- Skill breakdowns with focused remediation.

## Knowledge Base Sources
- `research/ChatGPT Deep Research sat_mastery_knowledge_base_spec.md`
  defines what the system knows (data model, test structure, taxonomy, scoring).
- `research/Gemini Deep Research SAT Knowledge Base Specification.md`
  defines how the system trains the user (behavior, pacing, strategy layer).

## Next PRD Sections (Planned)
- Data model and schema
- Scoring and routing logic
- Drill generator and scheduling rules
- UX flows (diagnostic, drill, simulation, review)

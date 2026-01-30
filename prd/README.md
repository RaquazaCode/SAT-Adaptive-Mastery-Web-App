# PRD Index

This directory contains the Product Requirements Documents (PRDs) for the SAT Adaptive Mastery Web App.

## Overview

- [00-overview.md](./00-overview.md) - Product overview, goals, and knowledge base sources

## Planned PRD Sections

- `01-data-model.md` - Entities, enums, and relationships (QuestionType, Skill, TrapType, ErrorEvent, Item, UserSkillState)
- `02-adaptive-engine.md` - Routing rules, difficulty bands, drill sequencing, scoring abstraction
- `03-simulation.md` - SAT section/module flow, timing rules, scoring estimate UX
- `04-content-pipeline.md` - Content ingestion and validation workflow

## Research Sources

- `../research/ChatGPT Deep Research sat_mastery_knowledge_base_spec.md` - Defines what the system knows (data model, test structure, taxonomy, scoring)
- `../research/Gemini Deep Research SAT Knowledge Base Specification.md` - Defines how the system trains the user (behavior, pacing, strategy layer)

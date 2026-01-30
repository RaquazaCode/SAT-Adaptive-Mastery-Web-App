# Content Map: Components to PRD Sections

This document maps each frontend component to its corresponding PRD section and product feature.

## Landing Page Components

### Header (`src/components/Header.tsx`)
- **PRD Section**: General navigation
- **Features**: Navigation to Features, How It Works, Practice Tests, Pricing, FAQ
- **Status**: Updated with SAT-specific navigation

### Hero (`src/components/Hero.tsx`)
- **PRD Section**: `/prd/00-overview.md` - Product overview
- **Features**: Main value proposition (adaptive practice, skill-level tracking)
- **Status**: Updated with SAT mastery messaging
- **Images**: Need SAT-themed hero images (students with SAT prep materials)

### Features (`src/components/Features.tsx`)
- **PRD Section**: `/prd/02-adaptive-engine.md` - Adaptive engine
- **Features**: 
  - Adaptive Practice Engine
  - Full-Length Simulations
  - Skill-Level Analytics
- **Status**: Updated with SAT-specific features

### How It Works (`src/components/HowItWorks.tsx`)
- **PRD Section**: `/prd/03-simulation.md` - Simulation flow
- **Features**: 
  - Step 1: Diagnostic Test (full-length simulation)
  - Step 2: Adaptive Practice Plan (drill generation)
  - Step 3: Practice & Track Progress (analytics)
- **Status**: Updated with SAT-specific steps
- **Images**: Need SAT prep workflow images

### FAQ (`src/components/FAQ.tsx`)
- **PRD Section**: `/prd/02-adaptive-engine.md`, `/prd/03-simulation.md`
- **Features**: Answers about adaptive system, simulations, score improvement
- **Status**: Updated with SAT-specific FAQs

### CTA Section (`src/components/CTASection.tsx`)
- **PRD Section**: `/prd/00-overview.md` - Call to action
- **Features**: Start diagnostic test
- **Status**: Updated with SAT mastery messaging

### Footer (`src/components/Footer.tsx`)
- **PRD Section**: General site navigation
- **Features**: Links, contact info, newsletter
- **Status**: Updated branding to SAT Mastery

## Future Application Components (To Be Built)

### Diagnostic Test Flow
- **PRD Section**: `/prd/03-simulation.md`
- **Components**: `DiagnosticStart.tsx`, `Module1.tsx`, `Module2.tsx`, `ScoreResults.tsx`

### Adaptive Drill Flow
- **PRD Section**: `/prd/02-adaptive-engine.md`
- **Components**: `DrillSession.tsx`, `QuestionView.tsx`, `DrillResults.tsx`

### Analytics Dashboard
- **PRD Section**: `/prd/02-adaptive-engine.md`
- **Components**: `SkillBreakdown.tsx`, `ProgressChart.tsx`, `WeaknessList.tsx`

### Simulation Flow
- **PRD Section**: `/prd/03-simulation.md`
- **Components**: `SimulationStart.tsx`, `SectionView.tsx`, `ModuleTransition.tsx`, `FinalScore.tsx`

## Image Assets Needed

### Hero Section
- SAT prep students with books/materials
- Digital SAT testing environment
- Score improvement visualization

### How It Works
- Student taking diagnostic test
- Analytics dashboard mockup
- Practice session interface

### Features
- Adaptive engine visualization
- Simulation interface mockup
- Skill analytics charts

## Content Status

- ✅ Copy updated across all landing page components
- ⏳ Images need to be generated/replaced (use nano-banana-pro or similar)
- ✅ Navigation updated to SAT-specific items
- ✅ Branding updated to "SAT Mastery"

## Next Steps

1. Generate/replace images with SAT-themed content
2. Build diagnostic test flow components
3. Build adaptive drill flow components
4. Build analytics dashboard components
5. Build simulation flow components

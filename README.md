# SAT Adaptive Mastery Web App

Your personal SAT tutor that never sleeps, never judges, and gets smarter about you every day. Experience the proven power of 1-on-1 tutoring (Bloom Two-Sigma Effect), available 24/7 at a fraction of the cost of human tutors.

## Key Features

- **Personal Tutor**: Learns your error patterns, adapts to your schedule, provides instant feedback
- **Adaptive Practice**: Practice questions adapt based on your performance and timing
- **Full-Length Simulations**: Experience the real Digital SAT format with module-based routing
- **Skill-Level Analytics**: See exactly which skills need work with detailed breakdowns

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see `ENV.example`):
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `SUPABASE_SERVICE_KEY` - Your Supabase service role key
3. Run the dev server: `npm run dev`
4. Lint the code: `npm run lint`
5. Run tests: `npm test`

## Database Setup

1. Create a Supabase project at https://app.supabase.com
2. Run `supabase/schema.sql` in the SQL Editor
3. Run `supabase/seed-data.sql` to populate initial taxonomy
4. Add environment variables to Vercel project settings

## Project Structure

- `src/` - Application source code
  - `components/` - React components (landing page, diagnostic, drill, analytics, simulation)
  - `lib/` - Core logic (adaptive engine, simulation routing)
- `api/` - Vercel serverless API endpoints
- `prd/` - Product requirements documents
- `research/` - Deep research inputs and analysis
- `reference/` - Visual references and template exports
- `supabase/` - Database schema and seed data
- `tests/` - Test files

## Deployment

This project is configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel project settings
3. Deployments happen automatically on push to main

## Template Attribution

This project started from a Magic Patterns Vite template:
https://www.magicpatterns.com/c/rx9vdphkgn7yitanzd9sxt
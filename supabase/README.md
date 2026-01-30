# Supabase Setup Guide

## Initial Setup

1. Create a Supabase project at https://app.supabase.com
2. Go to SQL Editor in your Supabase dashboard
3. Run `schema.sql` first to create all tables
4. Run `seed-data.sql` to populate initial taxonomy (skills, question types, trap types)

## Database Schema

See `schema.sql` for complete table definitions. Key tables:

- `question_types` - SAT question type taxonomy
- `skills` - Skills tested by question types
- `trap_types` - Common wrong answer patterns
- `items` - Individual questions/items
- `error_events` - User attempt logs
- `user_skill_states` - Per-skill mastery tracking
- `drills` - Generated practice sets
- `simulations` - Full-length test sessions

## Environment Variables

Add these to your Vercel project:

- `SUPABASE_URL` - Found in Project Settings > API
- `SUPABASE_ANON_KEY` - Found in Project Settings > API (anon/public key)
- `SUPABASE_SERVICE_KEY` - Found in Project Settings > API (service_role key - keep secret!)

## Row Level Security (RLS)

For MVP, RLS is disabled. In production, enable RLS and create policies:

```sql
-- Example: Allow users to read their own error events
ALTER TABLE error_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own error events"
  ON error_events FOR SELECT
  USING (auth.uid()::text = user_id);
```

## Seeding Content

After running `seed-data.sql`, you'll need to add actual question items. Options:

1. Use the API endpoint `POST /api/items` (requires service key)
2. Import via Supabase dashboard
3. Use a content pipeline script (future)

## Next Steps

1. Run schema and seed SQL files
2. Add environment variables to Vercel
3. Test API endpoints
4. Begin adding question items

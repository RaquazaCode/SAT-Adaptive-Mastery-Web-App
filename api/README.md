# API Endpoints

Vercel serverless API endpoints for SAT Adaptive Mastery.

## Setup

1. Install dependencies: `npm install @supabase/supabase-js`
2. Set environment variables in Vercel:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key (for admin operations)

## Endpoint Structure

All endpoints are in `/api/` directory and follow Vercel serverless function conventions.

### Items API

- `GET /api/items` - Fetch items by filters
  - Query params: `question_type_id`, `difficulty`, `limit`
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (admin)

### Error Events API

- `POST /api/error-events` - Log error event
  - Body: `{ item_id, user_id, outcome, error_root_cause, time_spent_s }`

### Drills API

- `POST /api/drills/generate` - Generate adaptive drill
  - Body: `{ user_id, target_skill_ids?, difficulty_range?, item_count? }`
- `GET /api/drills/:id` - Get drill details

### Simulations API

- `POST /api/simulations` - Start simulation
  - Body: `{ user_id, section }`
- `GET /api/simulations/:id` - Get simulation state
- `POST /api/simulations/:id/module1` - Submit Module 1 responses
  - Body: `{ responses: [{ item_id, answer, time_spent_s }] }`
- `POST /api/simulations/:id/module2` - Submit Module 2 responses
  - Body: `{ responses: [{ item_id, answer, time_spent_s }] }`

### Analytics API

- `GET /api/analytics/skills/:user_id` - Get user skill states
- `GET /api/analytics/weaknesses/:user_id` - Get weakness scores

## Implementation Notes

- Use Supabase client: `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`
- For MVP, `user_id` can be session-based (e.g., UUID stored in localStorage)
- All endpoints return JSON
- Error responses: `{ error: string, code?: string }`

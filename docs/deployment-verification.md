# Deployment Verification Checklist

## If the live site shows a blank page (Vercel)

The app is a Vite SPA; Vercel must serve the **built** output from `dist/`, not the repo root. If you see "Configuration Settings in the current Production deployment differ from your current Project Settings" in Vercel:

1. **Use only `vercel.json` (no UI overrides)**  
   In Vercel: **Settings → General → Build & Development**. Under **Framework Settings**, in **Production Overrides**:
   - Turn **off** the override for **Build Command** (or clear the field).
   - Turn **off** the override for **Output Directory** (or clear the field).  
   Then click **Save**.

2. **Redeploy from the latest commit**  
   **Deployments** → open the **⋯** on the latest deployment → **Redeploy**.  
   Optionally enable **Redeploy without using the build cache**, then confirm.

3. **Confirm**  
   After the new deployment is live, open the production URL. The site should load; if not, check the deployment’s **Build Logs** to ensure `npm run build` ran and **Output Directory** is `dist`.

## Pre-Deployment

- [x] Build succeeds: `npm run build`
- [x] Linting passes: `npm run lint` (warnings acceptable for MVP)
- [x] All components compile without errors
- [x] Test suite structure in place

## Vercel Environment Variables

Verify these are set in Vercel Project Settings > Environment Variables:

- [ ] `SUPABASE_URL` - Your Supabase project URL
- [ ] `SUPABASE_ANON_KEY` - Your Supabase anonymous/public key
- [ ] `SUPABASE_SERVICE_KEY` - Your Supabase service role key (keep secret!)

## API Endpoints Verification

Test each endpoint after deployment:

### Items API
- [ ] `GET /api/items` - Returns items list
- [ ] `GET /api/items?question_type_id=RW_IA_INF_SINGLE` - Filters by type
- [ ] `GET /api/items?difficulty=D2` - Filters by difficulty

### Error Events API
- [ ] `POST /api/error-events` - Logs error event successfully

### Drills API
- [ ] `POST /api/drills/generate` - Generates drill with item_ids
- [ ] `GET /api/drills/:id` - Returns drill details

### Simulations API
- [ ] `POST /api/simulations` - Creates simulation, returns module1_item_ids
- [ ] `POST /api/simulations/:id/module1` - Processes Module 1, returns routing
- [ ] `POST /api/simulations/:id/module2` - Processes Module 2, returns final score
- [ ] `GET /api/simulations/:id` - Returns simulation state

### Analytics API
- [ ] `GET /api/analytics/skills/:user_id` - Returns skill states

## Frontend Verification

- [ ] Landing page loads correctly
- [ ] All new components render (PersonalTutor, TutorComparison, EmotionalSupport)
- [ ] Navigation works
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors

## Database Verification

- [ ] Tables created successfully (check Supabase dashboard)
- [ ] Seed data loaded (skills, question types, trap types)
- [ ] Can query items table
- [ ] Can insert error events

## Post-Deployment Testing

1. **Landing Page**
   - Visit production URL
   - Verify all sections load
   - Check that copy emphasizes "personal tutor" not "AI"

2. **API Health**
   - Test at least one endpoint from each category
   - Verify error handling works

3. **Build Verification**
   - Check Vercel build logs for warnings/errors
   - Verify build completes successfully

## Known Limitations (MVP)

- Image generation not yet completed (using placeholder images)
- Full user authentication not implemented (session-based for MVP)
- Some API endpoints may need Supabase RLS policies in production
- Test coverage is basic (unit tests only)

## Next Steps After Deployment

1. Generate and replace placeholder images
2. Add more question items to database
3. Implement user authentication (if needed)
4. Add RLS policies for production security
5. Expand test coverage

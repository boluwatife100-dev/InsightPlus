# InsightLoop Backend — Kickoff Checklist

For the backend developer. Follow top to bottom.

1. Pull `frontend-dev` branch. Read `frontend/API_CONTRACT.md` in full before writing anything.
2. Build endpoints in this order (dependency-based):
   1. `POST /auth/login`
   2. `GET /users/me`
   3. `POST /auth/logout`
   4. `GET /businesses`
   5. `GET /businesses/current`
   6. `PATCH /businesses/current`
   7. `GET /feedback`
   8. `POST /feedback`
   9. `GET /dashboard/overview`
   10. `GET /ai-insights`
   11. `GET /feedback/issues` (legacy — skip unless asked)
   12. `GET /feedback/stats` (legacy — skip unless asked)
   13. `GET /feedback/satisfaction-trend` (legacy — skip unless asked)
3. Match response shapes exactly — field names and types are not negotiable without updating `frontend/API_CONTRACT.md` first.
4. Implement the global rules before testing individual endpoints:
   - `Authorization: Bearer <token>` accepted on every request (except `POST /feedback`)
   - CORS allows credentials (`credentials: 'include'` is sent client-side)
   - All list endpoints return a bare array — no pagination wrapper
   - `createdAt` values are display-ready strings (e.g. `"2 min ago"`), not raw ISO
5. Skip the legacy endpoints unless asked.
6. Test each endpoint in isolation against the example payload in `frontend/API_CONTRACT.md` (curl/Postman) before requesting a frontend integration test.
7. Frontend integration test = set `VITE_USE_MOCK=false`, set `VITE_API_URL` to your local/staging server, confirm each screen (Login, Overview, Feedback, AI Insights, Settings, Recent Feedback feed) still renders correctly.
8. Flag any endpoint where the required shape doesn't match your data model — do not silently reshape data on your end; raise it so the contract gets updated instead.
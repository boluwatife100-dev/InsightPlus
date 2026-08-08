# InsightPlus Frontend

Customer feedback analytics for restaurants — AI-powered sentiment analysis,
dashboard overviews, and actionable insights.

Feature-complete per `PRD.md` / `milestone.md`, currently running on bundled
demo data.

## Getting started

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run lint      # oxlint
npm run build     # production build
```

Demo login (mock mode): `demo@insightplus.app` / `demo1234`.

## Backend Integration

- Mock data lives in `frontend/src/services/mock/` — the demo
  implementations are `mock/feedbackService.js` and `mock/aiInsightsService.js`
  (plus `mock/dashboardService.js`, `mock/authService.js`,
  `mock/businessService.js`), with the raw demo datasets under
  `mock/data/`.
- See `frontend/API_CONTRACT.md` for the exact data shape each service is
  expected to return, the endpoint catalog, and the components that consume
  each function.
- Swap the implementation inside those service files only — do not change
  how components call them. Every page reads through `src/services/index.js`,
  so matching the documented return shapes is enough for the UI to work.
- Mock data is intentionally left in place as a live-demo fallback; do not
  remove it even after real endpoints are wired. The app can be switched to
  the real backend with `VITE_USE_MOCK=false` + `VITE_API_URL`.

// ============================================================
// App configuration — single source of truth for backend wiring.
// The API base URL and the mock/real switch come from env vars so
// the backend developer can point the app at their server without
// touching any component code.
//
//   VITE_API_URL    base URL of the API (must end with "/"), e.g.
//                   http://localhost:5000/api/
//
// The frontend now uses the real backend routes by default.
// See /.env.example
// ============================================================

const apiUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api/').replace(/\/?$/, '/')

export const config = {
  apiUrl,
  defaultRange: { from: '2026-07-01', to: '2026-07-31' },
  requestTimeoutMs: 10000,
}

// Used by Login for the quick "demo account" fill (PRD §10 — auth is
// mocked for the hackathon; the real backend provides these instead).
export const DEMO_CREDENTIALS = {
  email: 'demo@InsightLoop.app',
  password: 'demo1234',
  business: 'Rite Restaurant',
}
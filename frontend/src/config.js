// ============================================================
// App configuration — single source of truth for backend wiring.
// The API base URL and the mock/real switch come from env vars so
// the backend developer can point the app at their server without
// touching any component code.
//
//   VITE_API_URL    base URL of the API (must end with "/"), e.g.
//                   https://api.insightplus.example/v1/
//   VITE_USE_MOCK   "false" to use the real API; anything else
//                   (or unset) keeps the bundled demo data.
// See /.env.example
// ============================================================

const apiUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1/').replace(/\/?$/, '/')

export const config = {
  apiUrl,
  useMock: import.meta.env.VITE_USE_MOCK !== 'false',
  defaultRange: { from: '2026-07-01', to: '2026-07-31' },
  requestTimeoutMs: 10000,
}

// Used by Login for the quick "demo account" fill (PRD §10 — auth is
// mocked for the hackathon; the real backend provides these instead).
export const DEMO_CREDENTIALS = {
  email: 'demo@insightplus.app',
  password: 'demo1234',
  business: 'Rite Restaurant',
}
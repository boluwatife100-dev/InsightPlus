// ============================================================
// API endpoint catalog — the single source of truth for backend
// paths the frontend calls. The backend must implement exactly
// these paths under config.apiUrl.
// Paths are relative (no leading slash) and joined onto
// config.apiUrl by src/api/client.js.
// ============================================================

export const ENDPOINTS = {
  auth: {
    login: 'auth/login',
    signup: 'auth/signup',
    logout: 'auth/logout',
    me: 'users/me',
  },
  businesses: {
    list: 'businesses',
    current: 'businesses/current',
  },
  dashboard: {
    overview: 'dashboard/overview',
  },
  aiInsights: {
    summary: 'ai-insights',
  },
  feedback: {
    list: 'feedback',
    submit: 'feedback',
    issues: 'feedback/issues',
    stats: 'feedback/stats',
    satisfactionTrend: 'feedback/satisfaction-trend',
  },
}
# InsightPlus Frontend — API Contract (Backend Handoff)

This document is the single source of truth for the data shapes the frontend
expects from the backend. It is written for the backend developer: implement
the endpoints below and every screen keeps working **without any frontend
changes**, because every data consumer reads through the service layer.

Mock data is **intentionally left in place** as the live-demo fallback and as
a reference implementation. Do **not** delete it, even after real endpoints
are wired.

---

## 1. How the frontend talks to data

```
Pages / components
        │  import from
        ▼
src/services/index.js   ← the ONLY place pages import from (service registry)
        │
        ├── mock implementations   → src/services/mock/*.js (demo data, default)
        └── real implementations   → src/services/*.js   (calls the backend)
```

- Pages and components **never** import `src/api/*` or mock data directly.
  They import named services from `src/services/index.js`.
- `src/services/index.js` picks the mock or the real implementation based on
  one env var (see `src/config.js`):
  - `VITE_USE_MOCK` unset or anything except `"false"` → **mock** (default)
  - `VITE_USE_MOCK="false"` → **real API** at `VITE_API_URL`
- Every real service function already calls `apiFetch()` from
  `src/api/client.js`, which:
  - resolves relative paths against `config.apiUrl` (default
    `http://localhost:8000/api/v1/`)
  - attaches `Authorization: Bearer <token>` when a token is stored
  - JSON-encodes bodies, parses JSON responses
  - throws `ApiError` with the server's `detail` / `message` on failures
- The exact endpoint paths the frontend calls are catalogued in
  `src/api/endpoints.js` — the backend must implement exactly these paths
  under the API base URL.

## How to swap mock → real without touching components

For each service, keep the **exported function name and the return shape
exactly as documented below**, and replace the internals with real API calls.
Because components only ever call `src/services/index.js`, every screen
(Overview, Feedback, AI Insights, Recent Feedback, auth, business settings)
continues to work as soon as the backend returns the documented shapes.

Two valid swap strategies:

1. **Recommended** – set `VITE_USE_MOCK=false` and point `VITE_API_URL` at the
   backend. The existing `src/services/*.js` implementations already call the
   documented endpoints via `src/api/client.js`.
2. **Alternative** – edit `src/services/mock/*.js` (and/or their `data/*.js`
   files) to call the API instead of returning static data. Same rule
   applies: keep function names and return shapes.

Either way, **do not remove** the mock implementations and mock data files —
they are the demo fallback and the reference implementation.

---

## Shared shapes used across services

### `FeedbackItem`
Used by `feedbackService.listFeedback()` and `dashboardService.getOverview().recentFeedback`.

| Field       | Type                                                        | Example                             |
| ----------- | ----------------------------------------------------------- | ----------------------------------- |
| `id`        | `string`                                                    | `"f1"`                              |
| `author`    | `string`                                                    | `"Anonymous"`                       |
| `rating`    | `number` (1–5)                                              | `2`                                 |
| `category`  | `string`                                                    | `"Service"`                         |
| `sentiment` | `"positive" \| "neutral" \| "negative"`                     | `"negative"`                        |
| `comment`   | `string`                                                    | `"Waited 25 minutes for our table…"` |
| `createdAt` | `string` (relative label or ISO date)                       | `"2 min ago"`                       |

Source: `src/services/mock/data/feedback.js` — `mockFeedback`.

### `User`

```js
{ name: "Sarah Johnson", initials: "SJ", role: "Owner", email: "sarah@riterestaurant.com" }
```

| Field      | Type     | Example                     |
| ---------- | -------- | --------------------------- |
| `name`     | `string` | `"Sarah Johnson"`           |
| `initials` | `string` | `"SJ"`                      |
| `role`     | `string` | `"Owner"`                   |
| `email`    | `string` | `"sarah@riterestaurant.com"`|

Source: `src/services/mock/data/auth.js` — `mockUser`.

### `Business`

```js
{
  id: "rite",
  name: "Rite Restaurant",
  initials: "RR",
  plan: "Pro plan",
  email: "sarah@riterestaurant.com",
}
```

| Field      | Type     | Meaning                       |
| ---------- | -------- | ----------------------------- |
| `id`       | `string` | Business identifier          |
| `name`     | `string` | Display name                 |
| `initials` | `string` | 2-letter avatar initials     |
| `plan`     | `string` | Billing plan label           |
| `email`    | `string` | Contact email (Settings)     |

Source: `src/services/mock/data/auth.js` — `mockBusinesses`.

---

## Dashboard service

### `getOverview(range?)`

- **Files**: `src/services/mock/dashboardService.js` (mock), `src/services/dashboardService.js` (real)
- **Backend endpoint**: `GET /dashboard/overview?from=YYYY-MM-DD&to=YYYY-MM-DD`
- **Consumers**: `src/pages/dashboard/Overview.jsx` → cards →
  `CsatScoreCard`, `StatCard` (New Responses), `AiInsightCard`,
  `RecommendedActionCard`, `IssuesBreakdown`, `RecentFeedbackFeed`
- **Returns** (one aggregate object):

```js
{
  csat: {
    score: "4.1",                 // string (formatted value)
    outOf: 5,                     // number
    delta: "▼ 12% vs Jun 1–30",   // string
    responses: "1,248 responses", // string
    distribution: [82, 69, 44, 57, 38], // number[] — per-star counts (5→1)
    stars: [5, 4, 3, 2, 1],             // number[] — star positions for partial fill
    spark: [3.8, 3.9, 4.2, 4.0, 3.9, 4.1], // number[] — weekly SPARK score trend
  },
  newResponses: {
    count: 35,                    // number
    delta: "▼ 32.5% vs Jun 1–30", // string
    spark: [12, 18, 9, 21, 14, 27, 35], // number[] — cumulative trend
  },
  aiSummary: {
    text: "Customers are generally happy with food quality, but slow delivery is the biggest pain point this month. …", // string (2–3 sentences)
    highlights: ["slow delivery", "biggest pain point", "lower star ratings", "new menu prices"], // string[] (phrases to bold)
  },
  recommendedAction: {
    text: "Add more delivery riders during weekends (7–10 PM) to reduce wait times.", // string
  },
  frictionPoints: [
    { label: "Slow delivery", pct: 42 }, // { label: string, pct: number 0–100 }
  ],
  recentFeedback: [
    // FeedbackItem[] — see shared shape, 3-5 latest entries
  ],
}
```

Source: `src/services/mock/data/dashboard.js` (`mockCsat`, `mockNewResponses`,
`mockFrictionPoints`, `mockRecentFeedback`, `mockAiSummary`,
`mockRecommendedAction`).

---

## Feedback service

### `listFeedback(filters?)`

- **Files**: `src/services/mock/feedbackService.js`, `src/services/feedbackService.js`
- **Backend endpoint**: `GET /feedback` (+ optional query `q`, `sentiment`, `category` — server-side filtering)
- **Consumers**: `src/pages/dashboard/Feedback.jsx`
- **Returns**: `FeedbackItem[]` (12 demo items; keep a non-empty array for the dashboard feed)

### `submitFeedback({ rating, category, comment })`

- **Files**: `src/services/mock/feedbackService.js`, `src/services/feedbackService.js`
- **Backend endpoint**: `POST /feedback` — body `{ rating: number (1–5), category: string, comment: string }`
- **Consumers**: `src/pages/FeedbackForm.jsx` (public form, no auth)
- **Returns**: `FeedbackItem` — the mock derives
  `sentiment = rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative"`
  and `createdAt: "just now"`. The backend may return the same shape.

### `getIssues()` — *legacy, no active consumers*

- **Files**: `src/services/mock/feedbackService.js`, `src/services/feedbackService.js`
- **Backend endpoint**: `GET /feedback/issues`
- **Consumers**: none today (kept for backwards compatibility / API parity)
- **Returns**: `[{ label: string, pct: number }]` — e.g.
  `[{ label: "Wait time", pct: 68 }]` (mock also carries `count`)

### `getStats()` — *legacy, no active consumers*

- **Files**: `src/services/mock/feedbackService.js`, `src/services/feedbackService.js`
- **Backend endpoint**: `GET /feedback/stats`
- **Consumers**: none today (retained for SatisfactionCard/SentimentGauge widgets)
- **Returns**: aggregate stats object:
  `satisfactionScore`, `satisfactionDelta`, `newFeedbackCount`,
  `newFeedbackDelta`, `avgRating`, `avgRatingDelta`, `responseRate`,
  `responseRateDelta`, `topIssue`, `topIssueContext`, `aiInsight`,
  `recommendedAction: { title, description, impact }`,
  `sentimentDistribution: { positive, neutral, negative }`
  (all numbers are `number`, deltas/contexts `string`)

### `getSatisfactionTrend()` — *legacy, no active consumers*

- **Files**: `src/services/mock/feedbackService.js`, `src/services/feedbackService.js`
- **Backend endpoint**: `GET /feedback/satisfaction-trend`
- **Counters**: none today
- **Returns**: `[{ day: string, score: number }]` — e.g.
  `[{ day: "Mon", score: 62 }]`

---

## AI Insights service

### `getInsights()`

- **Files**: `src/services/mock/aiInsightsService.js`, `src/services/aiInsightsService.js`
- **Backend endpoint**: `GET /ai-insights`
- **Consumers**: `src/pages/dashboard/AiInsight.jsx` →
  `AiInsightCard`, `RecommendedActionCard`, `IssuesBreakdown`
- **Returns**:

```js
{
  summary: {
    text: "Negative sentiment is concentrated in evening peak hours (6–8 PM). …", // string (full analysis)
    highlights: ["evening peak hours", "host stand bottleneck", "8–10 points"], // string[] (phrases to bold)
  },
  recommendedAction: {
    text: "Add a second host during 6–8 PM and switch to text-based waitlist notifications. …", // string
  },
  issues: [
    { label: "Wait time", count: 34, pct: 68 },   // { label: string, pct: number }
  ],
}
```

Source: `src/services/mock/aiInsightsService.js` (built from `mockStats.aiInsight`
and `mockIssues`).

---

## Auth service

### `login({ email, password })`

- **Files**: `src/services/mock/authService.js`, `src/services/authService.js`
- **Backend endpoint**: `POST /auth/login` — body `{ email, password }`
- **Consumers**: `src/pages/Login.jsx`
- **Returns**: the mock returns `{ token, user }`; the real implementation calls
  `setToken(data.token)` and returns `data.user` (a `User`). A failed login
  must throw an error that renders as "Invalid email or password." on the
  Login page.

### `getMe()`

- **Files**: `src/services/mock/authService.js`, `src/services/authService.js`
- **Backend endpoint**: `GET /users/me`
- **Consumers**: `src/pages/dashboard/DashboardLayout.jsx` (user name + avatar in the shell)
- **Returns**: `User`

### `logout()`

- **Files**: `src/services/mock/authService.js`, `src/services/authService.js`
- **Backend endpoint**: `POST /auth/logout` → 204
- **Consumers**: `src/pages/dashboard/DashboardLayout.jsx` (sign-out action)

---

## Business service

### `listBusinesses()`

- **Files**: `src/services/mock/businessService.js`, `src/services/businessService.js`
- **Backend endpoint**: `GET /businesses`
- **Consumers**: `src/pages/dashboard/DashboardLayout.jsx` →
  `src/components/dashboard/BusinessSwitcher.jsx` (the prop is passed in, so no
  component change is needed)
- **Returns**: `Business[]`

### `getCurrentBusiness()`

- **Files**: `src/services/mock/businessService.js`, `src/services/businessService.js`
- **Backend endpoint**: `GET /businesses/current`
- **Consumers**: `src/pages/dashboard/Settings.jsx`
- **Returns**: `Business`

### `updateBusiness(payload)`

- **Files**: `src/services/mock/businessService.js`, `src/services/businessService.js`
- **Backend endpoint**: `PATCH /businesses/current` — body `{ name?, email? }`
- **Consumers**: `src/pages/dashboard/Settings.jsx`
- **Returns**: `Business` (with the applied updates)

---

## Endpoint catalog (what the backend must implement)

All relative to the API base URL (`config.apiUrl`, default
`http://localhost:8000/api/v1/`) — see `src/api/endpoints.js`:

| Method | Path                          | Purpose                      |
| ------ | ----------------------------- | ---------------------------- |
| POST   | `auth/login`                  | Sign in, returns token+user  |
| POST   | `auth/logout`                 | Sign out (204)               |
| GET    | `users/me`                    | Current user                |
| GET    | `businesses`                  | Switchable business list     |
| GET    | `businesses/current`          | Selected business            |
| PATCH  | `businesses/current`          | Update business profile      |
| GET    | `dashboard/overview`          | Overview page aggregate      |
| GET    | `feedback`                    | Feedback list (filters)      |
| POST   | `feedback`                    | Public feedback submission   |
| GET    | `feedback/issues`             | Issue-theme breakdown        |
| GET    | `feedback/stats`              | Aggregate stats              |
| GET    | `feedback/satisfaction-trend` | Weekly satisfaction trend    |
| GET    | `ai-insights`                 | AI Insights summary block    |

---

## Rules of engagement

1. Do **not** change how components call services — change only the function
   bodies inside `src/services/*.js` (or wire `VITE_USE_MOCK=false`).
2. Keep **function names** and **return shapes** identical to this contract.
3. Mock data files (`src/services/mock/data/*.js`) stay in the repo as the
   demo fallback — never delete or empty them.
4. Error conventions: real services throw `ApiError` (from `src/api/client.js`)
   with a human-readable message; pages display `error.message` and offer
   "Try again" reload buttons.
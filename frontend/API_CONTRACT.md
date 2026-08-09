# InsightPlus Frontend — API Contract (Backend Handoff)

Strict endpoint specification. Implement against this contract exactly.

---

## Global rules

- **Base URL env var:** `VITE_API_URL` (default `http://localhost:5000/api/`, must end with `/`)
- **Auth:** Bearer token, stored client-side as `insightplus_token`, sent as `Authorization: Bearer <token>` on every request; login response token is stored after `POST /auth/login`. CORS must allow credentials (`credentials: 'include'` is sent).
- **JSON:** every request/response body is `application/json`. Body `null` on 204.
- **Lists:** all list endpoints return a **bare array** — no pagination or envelope wrapper.
- **Dates:** `createdAt` (and any user-facing date string) is rendered verbatim in the UI. Return display-ready strings (`"2 min ago"`, `"1 day ago"`) — raw ISO timestamps will appear unformatted.
- **Legacy/unused endpoints (implementation optional):** `GET /feedback/issues`, `GET /feedback/stats`, `GET /feedback/satisfaction-trend` — no current consumers.
- **No OpenAPI/runtime schema validation exists yet** — shape mismatches fail silently at runtime, not at build time. Test each endpoint against its example payload below before integration testing.

---

### POST auth/login

**Consumed by:** Login.jsx

**Request**
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

**Response — 200 OK**
```json
{
  "token": "string — session token stored client-side",
  "user": {
    "name": "string — “Sarah Johnson”",
    "initials": "string — “SJ” (2 letters, shown in avatar)",
    "role": "string — “Owner”",
    "email": "string — “sarah@riterestaurant.com”"
  }
}
```

**Response — error cases**
- 401: `{ "detail": "Invalid email or password." }` — message renders verbatim on the Login form
- 500: `{ "detail": "string" }`

**Notes:** failure body `detail`/`message` is user-visible — keep messages human-readable.

---

### POST /auth/logout

**Consumed by:** DashboardLayout.jsx

**Request**
- Headers: `Authorization: Bearer <token>`

**Response — 200 OK**
```json
null
```
(`204 No Content` is also accepted; client returns `null`)

**Response — error cases**
- 401: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

---

### GET /users/me

**Consumed by:** DashboardLayout.jsx

**Request**
- Headers: `Authorization: Bearer <token>`

**Response — 200 OK**
```json
{
  "name": "string — “Sarah Johnson”",
  "initials": "string — “SJ”",
  "role": "string — “Owner”",
  "email": "string — “sarah@riterestaurant.com”"
}
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

**Notes:** feeds the dashboard shell user chip + avatar.

---

### GET /businesses

**Consumed by:** DashboardLayout.jsx → BusinessSwitcher.jsx

**Request**
- Headers: `Authorization: Bearer <token>`

**Response — 200 OK**
```json
[
  {
    "id": "string — “rite”",
    "name": "string — “Rite Restaurant”",
    "initials": "string — “RR”",
    "plan": "string — “Pro plan”",
    "email": "string — “sarah@riterestaurant.com”"
  }
]
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

**Notes:** bare array; no pagination. Order = display order in the switcher.

---

### GET /businesses/current

**Consumed by:** Settings.jsx

**Request**
- Headers: `Authorization: Bearer <token>`

**Response — 200 OK**
```json
{
  "id": "string — “rite”",
  "name": "string — “Rite Restaurant”",
  "initials": "string — “RR”",
  "plan": "string — “Pro plan”",
  "email": "string — “sarah@riterestaurant.com”"
}
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 404: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

**Notes:** defaults to the user's first business.

---

### PATCH /businesses/current

**Consumed by:** Settings.jsx

**Request**
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Body (partial update):
  ```json
  {
    "name": "string — optional",
    "email": "string — optional"
  }
  ```

**Response — 200 OK**
```json
{
  "id": "string — “rite”",
  "name": "string — updated name",
  "initials": "string — “RR”",
  "plan": "string — “Pro plan”",
  "email": "string — updated email"
}
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 404: `{ "detail": "string" }`
- 422: `{ "detail": "string" or "array — validation details" }`
- 500: `{ "detail": "string" }`

---

### GET /dashboard/overview

**Consumed by:** Overview.jsx → CsatScoreCard, StatCard, AiInsightCard, RecommendedActionCard, IssuesBreakdown, RecentFeedbackFeed

**Request**
- Headers: `Authorization: Bearer <token>`
- Query params: `from` (string — `YYYY-MM-DD`, e.g. `2026-07-01`), `to` (string — `YYYY-MM-DD`, e.g. `2026-07-31`)

**Response — 200 OK**
```json
{
  "csat": {
    "score": "string — “4.1”",
    "outOf": "number — 5",
    "delta": "string — “▼ 12% vs Jun 1–30”",
    "responses": "string — “1,248 responses”",
    "distribution": "number[] — per-star response counts 5..1, e.g. [82, 69, 44, 57, 38]",
    "stars": "number[] — [5, 4, 3, 2, 1]",
    "spark": "number[] — weekly trend, e.g. [3.8, 3.9, 4.2, 4.0, 3.9, 4.1]"
  },
  "newResponses": {
    "count": "number — 35",
    "delta": "string — “▼ 32.5% vs Jun 1–30”",
    "spark": "number[] — [12, 18, 9, 21, 14, 27, 35]"
  },
  "aiSummary": {
    "text": "string — 2–3 sentence analysis",
    "highlights": "string[] — phrases displayed in bold, e.g. [\"slow delivery\", \"biggest pain point\"]"
  },
  "recommendedAction": {
    "text": "string — single next step, e.g. “Add more delivery riders during weekends (7–10 PM)”"
  },
  "frictionPoints": [
    { "label": "string — “Slow delivery”", "pct": "number — 42 (0–100)" }
  ],
  "recentFeedback": [
    {
      "id": "string — “d1”",
      "author": "string — “Anonymous”",
      "rating": "number — 2 (1–5)",
      "category": "string — “Service”",
      "sentiment": "string — “negative” (positive|neutral|negative)",
      "comment": "string — “Order took 40 minutes to arrive…”",
      "createdAt": "string — “2 min ago” (display-ready)"
    }
  ]
}
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

**Notes:** one aggregate call for the whole Overview page. Every field above is required — the page reads all of them.

---

### GET /feedback

**Consumed by:** Feedback.jsx

**Request**
- Headers: `Authorization: Bearer <token>`
- Query params (optional, server-side filtering):
  - `q`: string — free-text search
  - `sentiment`: string — `positive | neutral | negative`
  - `category`: string — e.g. `Service`

**Response — 200 OK**
```json
[
  {
    "id": "string — “f1”",
    "author": "string — “Anonymous”",
    "rating": "number — 2 (1–5)",
    "category": "string — “Service”",
    "sentiment": "string — “negative” (positive|neutral|negative)",
    "comment": "string — “Waited 25 minutes for our table even with a reservation.”",
    "createdAt": "string — “2 min ago” (display-ready)"
  }
]
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

**Notes:** bare array; empty array renders an empty state, not an error.

---

### POST /feedback

**Consumed by:** FeedbackForm.jsx (public form, no auth)

**Request**
- Headers: `Content-Type: application/json` (no auth header)
- Body:
  ```json
  {
    "rating": "number — integer 1–5",
    "category": "string — e.g. “Service”",
    "comment": "string — free text"
  }
  ```

**Response — 200 OK**
```json
{
  "id": "string — server id or “new”",
  "author": "string — “Anonymous”",
  "rating": "number — echoed (1–5)",
  "category": "string — echoed",
  "sentiment": "string — “positive” (positive|neutral|negative)",
  "comment": "string — echoed",
  "createdAt": "string — “just now” (display-ready)"
}
```

**Notes:** mock derives `sentiment` from rating (`>=4` positive, `==3` neutral, else negative) — backend may compute its own, but must return the field.

---

### GET /ai-insights

**Consumed by:** AiInsight.jsx → AiInsightCard, RecommendedActionCard, IssuesBreakdown

**Request**
- Headers: `Authorization: Bearer <token>`

**Response — 200 OK**
```json
{
  "summary": {
    "text": "string — full-length analysis",
    "highlights": "string[] — phrases rendered in bold, e.g. [\"evening peak hours\", \"host stand bottleneck\"]"
  },
  "recommendedAction": {
    "text": "string — e.g. “Add a second host during 6–8 PM and switch to text-based waitlist notifications.”"
  },
  "issues": [
    { "label": "string — “Wait time”", "count": "number — 34", "pct": "number — 68 (0–100)" }
  ]
}
```

**Response — error cases**
- 401: `{ "detail": "string" }`
- 500: `{ "detail": "string" }`

---

### GET /feedback/issues — LEGACY, optional

**Consumed by:** none

**Response — 200 OK**
```json
[
  { "label": "string — “Wait time”", "count": "number — 34", "pct": "number — 68" }
]
```

### GET /feedback/stats — LEGACY, optional

**Consumed by:** none

**Response — 200 OK**
```json
{
  "satisfactionScore": "number — 84",
  "satisfactionDelta": "string — “+6 this week”",
  "newFeedbackCount": "number — 12",
  "newFeedbackDelta": "string — “+4 today”",
  "avgRating": "number — 4.3",
  "avgRatingDelta": "string — “+0.2 this week”",
  "responseRate": "number — 87",
  "responseRateDelta": "string — “+3% this week”",
  "topIssue": "string — “Wait time”",
  "topIssueContext": "string — “Mentioned in 34 of 89 responses this week”",
  "aiInsight": "string — analysis paragraph",
  "recommendedAction": {
    "title": "string — “Streamline the host stand during peak hours”",
    "description": "string",
    "impact": "string — “Estimated +8 satisfaction points”"
  },
  "sentimentDistribution": {
    "positive": "number — 62",
    "neutral": "number — 23",
    "negative": "number — 15"
  }
}
```

### GET /feedback/satisfaction-trend — LEGACY, optional

**Consumed by:** none

**Response — 200 OK**
```json
[
  { "day": "string — “Mon”", "score": "number — 62" }
]
```

---

## Reference data files

| Dataset | File | Contents |
| --- | --- | --- |
| 12 feedback items | `src/services/mock/data/feedback.js` | `mockFeedback` |
| Issues / stats / trend | `src/services/mock/data/feedback.js` | `mockIssues`, `mockStats`, `mockSatisfactionTrend` |
| Dashboard payload | `src/services/mock/data/dashboard.js` | `mockCsat`, `mockNewResponses`, `mockFrictionPoints`, `mockRecentFeedback`, `mockAiSummary`, `mockRecommendedAction` |
| User / businesses | `src/services/mock/data/auth.js` | `mockUser`, `mockBusinesses` |

Mock data is intentionally left in place as the demo fallback — keep these files untouched.
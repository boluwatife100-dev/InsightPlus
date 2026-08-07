import { apiFetch } from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// ============================================================
// Dashboard service — GET /dashboard/overview
//
// Powers the Overview page's 2×2×2 card grid. One aggregate
// endpoint keeps the page's initial load to a single request.
// ============================================================

/**
 * Everything the Overview page renders, in one call.
 *
 * GET /dashboard/overview?from=YYYY-MM-DD&to=YYYY-MM-DD
 *
 * → 200
 * {
 *   csat: {
 *     score: string,            // "4.1"
 *     outOf: number,            // 5
 *     delta: string,            // "▼ 12% vs Jun 1–30"
 *     responses: string,        // "1,248 responses"
 *     spark: number[],          // weekly score trend (sparkline)
 *     stars: number[],          // [5, 4, 3, 2, 1] rendered star positions
 *     distribution: number[],   // response counts per star, highest first
 *   },
 *   newResponses: {
 *     count: number,            // 35
 *     delta: string,            // "▼ 32.5% vs Jun 1–30"
 *     spark: number[],          // cumulative trend over the period
 *   },
 *   aiSummary: {
 *     text: string,             // 2–3 sentence summary
 *     highlights: string[],     // phrases to bold in the UI
 *   },
 *   recommendedAction: {
 *     text: string,             // single next step
 *   },
 *   frictionPoints: [
 *     { label: string, pct: number },   // pct 0–100, e.g. { label: "Slow delivery", pct: 42 }
 *   ],
 *   recentFeedback: FeedbackItem[]      // see feedbackService.listFeedback
 * }
 *
 * @param {{ from: string, to: string }} [range] ISO date range
 * @returns {Promise<object>}
 */
export async function getOverview(range = {}) {
  return apiFetch(ENDPOINTS.dashboard.overview, { query: range })
}
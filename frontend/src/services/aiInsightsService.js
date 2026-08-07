import { apiFetch } from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// ============================================================
// AI Insights service — GET /ai-insights
//
// Powers the AI Insights page: the full summary, the single
// recommended action, and the theme breakdown.
// ============================================================

/**
 * Full analysis for the AI Insights page.
 *
 * GET /ai-insights
 *
 * → 200
 * {
 *   summary: {
 *     text: string,          // full-length analysis
 *     highlights: string[],  // key phrases to bold in the UI
 *   },
 *   recommendedAction: {
 *     text: string,          // "Add more delivery riders during weekends…"
 *   },
 *   issues: [
 *     { label: string, pct: number },   // e.g. { label: "Wait time", pct: 68 }
 *   ],
 * }
 *
 * @returns {Promise<object>}
 */
export async function getInsights() {
  return apiFetch(ENDPOINTS.aiInsights.summary)
}
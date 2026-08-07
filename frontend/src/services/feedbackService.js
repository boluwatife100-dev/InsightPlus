import { apiFetch } from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// ============================================================
// Feedback service — GET/POST /feedback, GET /feedback/issues,
// GET /feedback/stats, GET /feedback/satisfaction-trend
//
// FeedbackItem shape used across the app:
//   {
//     id: string,                    // "f1"
//     author: string,                // "Anonymous"
//     rating: number,                // 1–5
//     category: string,              // "Service"
//     sentiment: 'positive' | 'neutral' | 'negative',
//     comment: string,
//     createdAt: string,             // "2 min ago" (or ISO date)
//   }
// ============================================================

/**
 * Full feedback list for the Feedback page.
 *
 * GET /feedback
 * query (optional, server-side filtering for Phase 3):
 *   { q?: string, sentiment?: 'positive'|'neutral'|'negative', category?: string }
 * → 200 FeedbackItem[]
 *
 * @param {object} [filters]
 * @returns {Promise<Array<object>>}
 */
export async function listFeedback(filters = {}) {
  return apiFetch(ENDPOINTS.feedback.list, { query: filters })
}

/**
 * Submit a response from the public feedback form (no auth).
 *
 * POST /feedback
 * body: { rating: number (1–5), category: string, comment: string }
 * → 201 FeedbackItem
 *
 * @param {{ rating: number, category: string, comment: string }} payload
 * @returns {Promise<object>}
 */
export async function submitFeedback(payload) {
  return apiFetch(ENDPOINTS.feedback.submit, { method: 'POST', body: payload })
}

/**
 * Recurring issue themes (legacy AI Insights page breakdown).
 *
 * GET /feedback/issues → 200 [{ label: string, pct: number }]
 * @returns {Promise<Array<object>>}
 */
export async function getIssues() {
  return apiFetch(ENDPOINTS.feedback.issues)
}

/**
 * Aggregate stats (legacy Overview KPIs; retained for the
 * SatisfactionCard/SentimentGauge widgets).
 *
 * GET /feedback/stats → 200 object
 * @returns {Promise<object>}
 */
export async function getStats() {
  return apiFetch(ENDPOINTS.feedback.stats)
}

/**
 * Weekly satisfaction trend for the legacy satisfaction chart.
 *
 * GET /feedback/satisfaction-trend → 200 [{ day: string, score: number }]
 * @returns {Promise<Array<object>>}
 */
export async function getSatisfactionTrend() {
  return apiFetch(ENDPOINTS.feedback.satisfactionTrend)
}
import { apiFetch } from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// ============================================================
// Business service — GET /businesses, GET /businesses/current,
// PATCH /businesses/current
//
// Business shape used across the app:
//   {
//     id: string,       // "rite"
//     name: string,     // "Rite Restaurant"
//     initials: string, // "RR"
//     plan: string,     // "Pro plan"
//     email: string     // contact email (used by Settings)
//   }
// ============================================================

/**
 * All businesses the signed-in user can switch to.
 *
 * GET /businesses → 200 Business[]
 * @returns {Promise<Array<object>>}
 */
export async function listBusinesses() {
  return apiFetch(ENDPOINTS.businesses.list)
}

/**
 * The business currently selected in the app (defaults to the first).
 *
 * GET /businesses/current → 200 Business
 * @returns {Promise<object>}
 */
export async function getCurrentBusiness() {
  return apiFetch(ENDPOINTS.businesses.current)
}

/**
 * Update the current business profile (Settings page).
 *
 * PATCH /businesses/current
 * body:  { name?: string, email?: string }
 * → 200 Business
 * @param {{ name?: string, email?: string }} payload
 * @returns {Promise<object>}
 */
export async function updateBusiness(payload) {
  return apiFetch(ENDPOINTS.businesses.current, { method: 'PATCH', body: payload })
}
import { apiFetch, setToken } from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// ============================================================
// Auth service — POST /auth/login, POST /auth/logout,
// GET /users/me
//
// User shape used across the app:
//   {
//     name: string,     // "Sarah Johnson"
//     initials: string, // "SJ"
//     role: string,     // "Owner"
//     email: string
//   }
// ============================================================

/**
 * Log in and store the session token.
 *
 * POST /auth/login
 * body:    { email: string, password: string }
 * success: 200 → { token: string, user: User }
 * failure: 401 → { detail: string }
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<User>}
 */
export async function login({ email, password }) {
  const data = await apiFetch(ENDPOINTS.auth.login, {
    method: 'POST',
    body: { email, password },
  })
  setToken(data.token)
  return data.user
}

/**
 * Invalidate the session.
 *
 * POST /auth/logout → 204
 * @returns {Promise<void>}
 */
export async function logout() {
  await apiFetch(ENDPOINTS.auth.logout, { method: 'POST' })
  setToken(null)
}

/**
 * Current signed-in user (used by the dashboard shell).
 *
 * GET /users/me → 200 User
 * @returns {Promise<User>}
 */
export async function getMe() {
  return apiFetch(ENDPOINTS.auth.me)
}
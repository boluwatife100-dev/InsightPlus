import { config } from '../config.js'

// ============================================================
// Minimal fetch wrapper shared by every API call.
// - resolves relative endpoint paths against config.apiUrl
// - attaches "Authorization: Bearer <token>" when a token exists
// - JSON-encodes bodies, parses JSON responses
// - normalizes failures into ApiError with the server message
// ============================================================

const TOKEN_KEY = 'insightplus_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  constructor(message, { status = 0, data = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Perform a JSON API request.
 *
 * @param {string} path            endpoint path relative to config.apiUrl,
 *                                 e.g. "dashboard/overview" (no leading slash)
 * @param {object}  [options]
 * @param {string}  [options.method]    "GET" (default) | "POST" | "PATCH" | ...
 * @param {object}  [options.query]     query params added automatically
 * @param {object}  [options.body]      JSON request body
 * @param {AbortSignal} [options.signal] optional external abort signal
 * @returns {Promise<*>} parsed JSON body (null for 204)
 */
export async function apiFetch(path, { method = 'GET', query, body, signal } = {}) {
  const url = new URL(path, config.apiUrl)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value)
      }
    }
  }

  const headers = new Headers({ Accept: 'application/json' })
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (body !== undefined) headers.set('Content-Type', 'application/json')

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), config.requestTimeoutMs)
  const callSignal = signal ?? ctrl.signal

  try {
    const response = await fetch(url, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: callSignal,
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => null)
      const message =
        payload?.detail ??
        payload?.message ??
        `Request failed with status ${response.status}.`
      throw new ApiError(message, { status: response.status, data: payload })
    }

    if (response.status === 204) return null
    return await response.json().catch(() => null)
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') {
      throw new ApiError('The request timed out.', { status: 0 })
    }
    throw new ApiError('Could not reach the server.', { status: 0 })
  } finally {
    clearTimeout(timer)
  }
}
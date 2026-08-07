import { delay } from './util.js'
import { mockToken, mockUser, DEMO_ACCOUNT } from './data/auth.js'

// Mock implementation of src/services/authService.js.
// Replace by setting VITE_USE_MOCK=false and pointing VITE_API_URL
// at the real backend.

export async function login({ email, password }) {
  await delay(300)
  if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
    return { token: mockToken, user: mockUser }
  }
  throw Object.assign(new Error('Invalid email or password.'), { name: 'AuthError' })
}

export async function logout() {
  await delay(60)
}

export async function getMe() {
  await delay(120)
  return clone(mockUser)
}
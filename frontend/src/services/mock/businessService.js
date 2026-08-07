import { delay, clone } from './util.js'
import { mockBusinesses } from './data/auth.js'

// Mock implementation of src/services/businessService.js.

export async function listBusinesses() {
  await delay(120)
  return clone(mockBusinesses)
}

export async function getCurrentBusiness() {
  await delay(120)
  return clone(mockBusinesses[0])
}

export async function updateBusiness(payload) {
  await delay(120)
  return { ...clone(mockBusinesses[0]), ...payload }
}
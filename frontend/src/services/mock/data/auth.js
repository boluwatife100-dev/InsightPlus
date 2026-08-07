// ============================================================
// Mock auth data — mirrors the shapes documented in
// src/services/authService.js and businessService.js.
// Swap VITE_USE_MOCK=false to hit the real backend instead.
// ============================================================

export const mockUser = {
  name: 'Sarah Johnson',
  initials: 'SJ',
  role: 'Owner',
  email: 'sarah@riterestaurant.com',
}

export const mockBusinesses = [
  { id: 'rite', name: 'Rite Restaurant', initials: 'RR', plan: 'Pro plan', email: 'sarah@riterestaurant.com' },
  { id: 'north', name: 'Northside Diner', initials: 'ND', plan: 'Starter plan', email: 'front@northsidedinar.example' },
  { id: 'bloom', name: 'Bloom Coffee Co.', initials: 'BC', plan: 'Pro plan', email: 'front@bloomcoffee.example' },
]

export const DEMO_ACCOUNT = {
  email: 'demo@insightplus.app',
  password: 'demo1234',
  business: 'Rite Restaurant',
}

export const mockToken = 'demo-token'
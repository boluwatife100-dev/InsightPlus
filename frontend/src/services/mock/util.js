// Shared helpers for the mock services. The mock layer simulates a
// real network: latency, JSON-style copying, and the same response
// shapes the real services return.

export const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

// Deep-copy demo data so callers can't mutate the shared mock objects.
export const clone = (value) => JSON.parse(JSON.stringify(value))

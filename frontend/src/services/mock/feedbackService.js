import { delay, clone } from './util.js'
import { mockFeedback, mockIssues, mockStats, mockSatisfactionTrend } from './data/feedback.js'

// Mock implementation of src/services/feedbackService.js.

export async function listFeedback() {
  await delay(160)
  return clone(mockFeedback)
}

export async function submitFeedback({ rating, category, comment }) {
  await delay(240)
  return {
    id: 'new',
    author: 'Anonymous',
    rating,
    category,
    sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative',
    comment,
    createdAt: 'just now',
  }
}

export async function getIssues() {
  await delay(120)
  return clone(mockIssues)
}

export async function getStats() {
  await delay(120)
  return clone(mockStats)
}

export async function getSatisfactionTrend() {
  await delay(120)
  return clone(mockSatisfactionTrend)
}
import { delay, clone } from './util.js'
import {
  mockCsat,
  mockNewResponses,
  mockFrictionPoints,
  mockRecentFeedback,
  mockAiSummary,
  mockRecommendedAction,
} from './data/dashboard.js'

// Mock implementation of src/services/dashboardService.js.

export async function getOverview() {
  await delay(140)
  return {
    csat: clone(mockCsat),
    newResponses: clone(mockNewResponses),
    aiSummary: clone(mockAiSummary),
    recommendedAction: clone(mockRecommendedAction),
    frictionPoints: clone(mockFrictionPoints),
    recentFeedback: clone(mockRecentFeedback),
  }
}
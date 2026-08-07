import { delay, clone } from './util.js'
import { mockIssues, mockStats } from './data/feedback.js'

// Mock implementation of src/services/aiInsightsService.js.

export async function getInsights() {
  await delay(140)
  return {
    summary: {
      text: mockStats.aiInsight,
      highlights: ['evening peak hours', 'host stand bottleneck', '8–10 points'],
    },
    recommendedAction: { text: mockStats.recommendedAction.description },
    issues: clone(mockIssues),
  }
}
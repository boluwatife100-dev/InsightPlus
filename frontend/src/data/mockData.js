// ============================================================
// Demo/fallback data for static screens (Phase 1-2).
// Phase 3: replace with live data from the backend API contract.
// ============================================================

export const mockSatisfactionTrend = [
  { day: 'Mon', score: 62 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 65 },
  { day: 'Thu', score: 74 },
  { day: 'Fri', score: 71 },
  { day: 'Sat', score: 79 },
  { day: 'Sun', score: 84 },
]

export const mockIssues = [
  { label: 'Wait time', count: 34, pct: 68 },
  { label: 'Pricing', count: 18, pct: 36 },
  { label: 'Staff friendliness', count: 12, pct: 24 },
  { label: 'Cleanliness', count: 9, pct: 18 },
  { label: 'Menu variety', count: 6, pct: 12 },
]

export const mockFeedback = [
  {
    id: 'f1',
    author: 'Anonymous',
    rating: 2,
    category: 'Service',
    sentiment: 'negative',
    comment: 'Waited 25 minutes for our table even with a reservation.',
    createdAt: '2 min ago',
  },
  {
    id: 'f2',
    author: 'Anonymous',
    rating: 5,
    category: 'Food',
    sentiment: 'positive',
    comment: 'Absolutely loved the pasta! Will definitely come back.',
    createdAt: '18 min ago',
  },
  {
    id: 'f3',
    author: 'Anonymous',
    rating: 3,
    category: 'Pricing',
    sentiment: 'neutral',
    comment: 'Good food but a bit pricey for the portion size.',
    createdAt: '1 hr ago',
  },
  {
    id: 'f4',
    author: 'Anonymous',
    rating: 4,
    category: 'Service',
    sentiment: 'positive',
    comment: 'Staff were really friendly and helpful. Great vibe.',
    createdAt: '3 hrs ago',
  },
  {
    id: 'f5',
    author: 'Anonymous',
    rating: 2,
    category: 'Cleanliness',
    sentiment: 'negative',
    comment: 'Restrooms were out of soap again — please restock daily.',
    createdAt: '5 hrs ago',
  },
]

export const mockStats = {
  satisfactionScore: 84,
  satisfactionDelta: '+6 this week',
  newFeedbackCount: 12,
  newFeedbackDelta: '+4 today',
  topIssue: 'Wait time',
  topIssueContext: 'Mentioned in 34 of 89 responses this week',
  aiInsight:
    'Negative sentiment is concentrated in evening peak hours (6–8 PM). Most complaints cite table wait times of 20+ minutes, and they pair with lower star ratings. Resolving the host stand bottleneck could raise overall satisfaction by an estimated 8–10 points.',
  recommendedAction: {
    title: 'Streamline the host stand during peak hours',
    description:
      'Add a second host during 6–8 PM and switch to text-based waitlist notifications. This directly addresses the top issue (wait time) flagged this week.',
    impact: 'Estimated +8 satisfaction points',
  },
  sentimentDistribution: {
    positive: 62,
    neutral: 23,
    negative: 15,
  },
}

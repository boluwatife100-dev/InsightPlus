// ============================================================
// Demo/fallback data for static screens (Phase 1-2).
// Phase 3: replace with live data from the backend API contract.
// ============================================================

// ---- Demo workspace / user (dashboard shell) ----
export const mockUser = {
  name: 'Sarah Johnson',
  initials: 'SJ',
  role: 'Owner',
  email: 'sarah@riterestaurant.com',
}

export const mockBusinesses = [
  { id: 'rite', name: 'Rite Restaurant', initials: 'RR', plan: 'Pro plan' },
  { id: 'north', name: 'Northside Diner', initials: 'ND', plan: 'Starter plan' },
  { id: 'bloom', name: 'Bloom Coffee Co.', initials: 'BC', plan: 'Pro plan' },
]

// ---- Dashboard (Overview) dataset ----
export const mockCsat = {
  score: '4.1',
  outOf: 5,
  delta: '▼ 12% vs Jun 1–30',
  responses: '1,248 responses',
  distribution: [82, 69, 44, 57, 38], // per-star counts (5..1) for the mini chart
  stars: [5, 4, 3, 2, 1], // rendered as partial-fill star row
  spark: [3.8, 3.9, 4.2, 4.0, 3.9, 4.1], // weekly trend for the compact sparkline
}

export const mockNewResponses = {
  count: 35,
  delta: '▼ 32.5% vs Jun 1–30',
  spark: [12, 18, 9, 21, 14, 27, 35], // daily cumulative new responses
}

export const mockFrictionPoints = [
  { label: 'Slow delivery', pct: 42 },
  { label: 'Long wait time', pct: 21 },
  { label: 'Pricing concerns', pct: 19 },
  { label: 'App glitches', pct: 9 },
  { label: 'Other', pct: 15 },
]

export const mockRecentFeedback = [
  {
    id: 'd1',
    author: 'Anonymous',
    rating: 2,
    category: 'Service',
    sentiment: 'negative',
    comment: 'Order took 40 minutes to arrive — way slower than expected.',
    createdAt: '2 min ago',
  },
  {
    id: 'd2',
    author: 'Anonymous',
    rating: 5,
    category: 'Food',
    sentiment: 'positive',
    comment: 'The ribeye was incredible. Perfectly cooked and seasoned!',
    createdAt: '18 min ago',
  },
  {
    id: 'd3',
    author: 'Anonymous',
    rating: 3,
    category: 'Pricing',
    sentiment: 'neutral',
    comment: 'Good food, but delivery fees make it pricey for a family meal.',
    createdAt: '1 hr ago',
  },
  {
    id: 'd4',
    author: 'Anonymous',
    rating: 4,
    category: 'Service',
    sentiment: 'positive',
    comment: 'Great experience overall, but the app kept crashing at checkout.',
    createdAt: '3 hrs ago',
  },
  {
    id: 'd5',
    author: 'Anonymous',
    rating: 2,
    category: 'Delivery',
    sentiment: 'negative',
    comment: 'Driver dropped the order off at the wrong address again.',
    createdAt: '5 hrs ago',
  },
]

export const mockAiSummary =
  'Customers are generally happy with food quality, but slow delivery is the biggest pain point this month. Delivery complaints nearly doubled on weekends, and they often pair with lower star ratings. Pricing concerns mostly come from repeat customers comparing the new menu prices.'

export const mockRecommendedAction = {
  text: 'Add more delivery riders during weekends (7–10 PM) to reduce wait times.',
}

// ---- Legacy demo dataset (Feedback + AI Insight pages) ----
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
  {
    id: 'f6',
    author: 'Anonymous',
    rating: 4,
    category: 'Ambience',
    sentiment: 'positive',
    comment: 'Lovely lighting and music — perfect for a date night.',
    createdAt: '7 hrs ago',
  },
  {
    id: 'f7',
    author: 'Anonymous',
    rating: 3,
    category: 'Service',
    sentiment: 'neutral',
    comment: 'Order took a while but the staff kept us updated.',
    createdAt: '9 hrs ago',
  },
  {
    id: 'f8',
    author: 'Anonymous',
    rating: 1,
    category: 'Food',
    sentiment: 'negative',
    comment: 'Dish arrived cold, and it was the wrong order.',
    createdAt: '12 hrs ago',
  },
  {
    id: 'f9',
    author: 'Anonymous',
    rating: 5,
    category: 'Food',
    sentiment: 'positive',
    comment: 'Best tiramisu in town — highly recommend the tasting menu.',
    createdAt: '1 day ago',
  },
  {
    id: 'f10',
    author: 'Anonymous',
    rating: 4,
    category: 'Service',
    sentiment: 'positive',
    comment: 'The waiter remembered our usual order. Small touches matter!',
    createdAt: '1 day ago',
  },
  {
    id: 'f11',
    author: 'Anonymous',
    rating: 2,
    category: 'Pricing',
    sentiment: 'negative',
    comment: 'Service charge felt high for a casual lunch.',
    createdAt: '2 days ago',
  },
  {
    id: 'f12',
    author: 'Anonymous',
    rating: 5,
    category: 'Ambience',
    sentiment: 'positive',
    comment: 'Beautiful outdoor seating and a cozy fire pit in the evening.',
    createdAt: '2 days ago',
  },
]

export const mockStats = {
  satisfactionScore: 84,
  satisfactionDelta: '+6 this week',
  newFeedbackCount: 12,
  newFeedbackDelta: '+4 today',
  avgRating: 4.3,
  avgRatingDelta: '+0.2 this week',
  responseRate: 87,
  responseRateDelta: '+3% this week',
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

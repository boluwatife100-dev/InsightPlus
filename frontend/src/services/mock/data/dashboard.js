// ============================================================
// Demo data for the Overview dashboard — mirrors the shape
// documented in src/services/dashboardService.js.
// ============================================================

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

export const mockAiSummary = {
  text: 'Customers are generally happy with food quality, but slow delivery is the biggest pain point this month. Delivery complaints nearly doubled on weekends, and they often pair with lower star ratings. Pricing concerns mostly come from repeat customers comparing the new menu prices.',
  highlights: ['slow delivery', 'biggest pain point', 'lower star ratings', 'new menu prices'],
}

export const mockRecommendedAction = {
  text: 'Add more delivery riders during weekends (7–10 PM) to reduce wait times.',
}
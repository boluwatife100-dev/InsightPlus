import { ChatIcon, GearIcon, GridIcon, SparkleNavIcon } from '../icons.jsx'

/* ============================================================
   Hero product snapshot data.

   A scaled-down, static reproduction of the "Good morning, Sarah"
   overview screen (desktop dashboard, PRD §5.5). The numbers are
   fixed sample data — the snapshot is decorative and hidden from
   assistive tech, so it never calls the API.
   ============================================================ */

export const SNAPSHOT_NAV = [
  { label: 'Overview', active: true, icon: <GridIcon /> },
  { label: 'Feedback', icon: <ChatIcon /> },
  { label: 'AI Insights', icon: <SparkleNavIcon /> },
  { label: 'Settings', icon: <GearIcon /> },
]

export const SNAPSHOT_BUSINESS = { name: 'Rite Restaurant', role: 'Owner profile', initials: 'RR' }
export const SNAPSHOT_USER = { name: 'Sarah Johnson', role: 'Owner', initials: 'SJ' }
export const SNAPSHOT_DATE_RANGE = 'Jul 1 – Jul 31, 2026'

export const SNAPSHOT_CSAT = {
  score: '4.1',
  responses: '1,248 responses',
  delta: '▼ 12% vs Jun 1–30',
  // Star distribution, as a share of the tallest bar.
  stars: [
    { pct: 82, label: '5★' },
    { pct: 69, label: '4★' },
    { pct: 44, label: '3★' },
    { pct: 57, label: '2★' },
    { pct: 38, label: '1★' },
  ],
}

export const SNAPSHOT_RESPONSES = { value: '35', delta: '▼ 32.5% vs Jun 1–30' }

export const SNAPSHOT_AI_SUMMARY =
  'Customers are generally happy with food quality, but slow delivery is the biggest pain point this month. Delivery complaints nearly doubled on weekends, and often pair with lower star ratings.'

export const SNAPSHOT_ACTION =
  'Add more delivery riders during weekends (7–10 PM) to reduce wait times.'

export const SNAPSHOT_FRICTION = [
  { label: 'Slow delivery', pct: 42 },
  { label: 'Long wait time', pct: 21 },
  { label: 'Pricing concerns', pct: 19 },
  { label: 'App glitches', pct: 9 },
  { label: 'Other', pct: 15 },
]

export const SNAPSHOT_FEEDBACK = [
  { text: 'Order took 40 minutes to arrive — way slower than expected.', time: '2 min ago', tone: 'negative' },
  { text: 'The ribeye was incredible. Perfectly cooked and seasoned!', time: '18 min ago', tone: 'positive' },
  { text: 'Good food, but delivery fees make it pricey for a family meal.', time: '1 hr ago', tone: 'neutral' },
]

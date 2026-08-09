import { ClockIcon, PieChartIcon, SurveyIcon } from './icons.jsx'

/* ============================================================
   Landing page copy.

   Marketing text lives here rather than inline in the sections so
   wording can be edited without touching layout. Sections stay
   presentational and simply map over these lists.
   ============================================================ */

// Header dropdowns + mobile drawer groups. Entries starting with "/"
// are routes, the rest are in-page anchors (see SmartLink).
export const NAV_GROUPS = [
  {
    label: 'Features',
    items: [
      { text: 'Overview dashboard', href: '#features' },
      { text: 'AI summary', href: '#features' },
      { text: 'Friction points', href: '#features' },
      { text: 'Recent feedback', href: '#features' },
    ],
  },
  {
    label: 'How it works',
    items: [
      { text: 'Collect feedback', href: '#how-it-works' },
      { text: 'Understand with AI', href: '#how-it-works' },
      { text: 'Turn insights into action', href: '#how-it-works' },
    ],
  },
  {
    label: 'Support',
    items: [
      { text: 'Help Center', href: '/login' },
      { text: 'Contact us', href: '/login' },
      { text: 'FAQs', href: '/login' },
    ],
  },
]

export const HERO = {
  badge: 'AI-Powered Feedback Analytics',
  titleLead: 'Turn customer feedback into',
  titleAccent: 'better business decisions.',
  subtitle:
    'InsightPlus uses advanced AI to analyze reviews, surveys, and support tickets in real-time, helping you make data-driven decisions faster.',
}

// Logo wall. Each glyph is a one-off brand mark, so they are inlined
// here instead of joining the shared icon sheet.
export const TRUSTED_BY = [
  {
    name: 'Rite',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 11.5L19 4l-2.5 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'FitZone',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    name: 'Bloom',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3c2 2.5 2 5 0 7.5C10 8 10 5.5 12 3z" fill="currentColor" />
        <path d="M12 7c2 .5 3 2 2.5 4-2-.5-3-2-2.5-4z" fill="currentColor" />
        <path d="M12 7c-2 .5-3 2-2.5 4 2-.5 3-2 2.5-4z" fill="currentColor" />
        <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Northline',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Kawa',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 9h11v5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4V9z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M16 9h1.5a2.5 2.5 0 0 1 0-5H16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'PulseLot',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export const STEPS = [
  {
    icon: <SurveyIcon />,
    title: 'Collect customer feedback',
    description: 'Gather feedback from your customers through simple, easy-to-share surveys.',
  },
  {
    icon: <ClockIcon />,
    title: 'Understand what they mean',
    description: 'Let AI analyze feedback, identify patterns, and uncover what your customers really think.',
  },
  {
    icon: <PieChartIcon />,
    title: 'Turn insights into action',
    description: 'Get clear recommendations that help you make decisions and improve your customer experience.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'We found out about our wait-time problem within a week. Fixing it directly raised our rating from 4.1 to 4.6 — InsightPlus made it obvious.',
    author: 'Sarah Johnson',
    role: 'Owner, Rite Restaurant',
    initials: 'SJ',
  },
  {
    quote:
      'No more reading spreadsheets on Sunday night. InsightPlus tells me what to work on — plain and simple.',
    author: 'David Okafor',
    role: 'Manager, FitZone Gym',
    initials: 'DO',
  },
  {
    quote:
      'The AI summary is eerily accurate. It picks up themes we only hear about weeks later in person.',
    author: 'Priya Sharma',
    role: 'Owner, Bloom Salon',
    initials: 'PS',
  },
  {
    quote:
      'We launched surveys on Friday and had a prioritized insight plan by Monday. That speed changed how we operate.',
    author: 'Lena Novak',
    role: 'COO, Kawa Café',
    initials: 'LN',
  },
]

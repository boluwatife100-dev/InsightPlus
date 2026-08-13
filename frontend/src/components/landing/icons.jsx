/* ============================================================
   Landing page icon sheet.

   Every glyph is drawn on the same 24×24 grid and inherits
   `currentColor`, so size and colour stay with the caller — either
   through `className` or a parent `[&_svg]:h-…` rule. Icons that are
   rendered inside an aria-hidden block still carry aria-hidden so they
   are safe to reuse anywhere.
   ============================================================ */

function Icon({ className, children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {children}
    </svg>
  )
}

export function ChevronIcon({ className = 'h-4 w-4' }) {
  return (
    <Icon className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function MenuIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  )
}

export function CloseIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  )
}

// iOS status bar glyphs (phone-only decoration in the header).
export function SignalCheckIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20 6.5L9.5 17 4 11.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11.5l1-1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </Icon>
  )
}

export function BatteryIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="2" y="7" width="17" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  )
}

// Four-pointed star + small companion star (hero badge, AI summary card).
export function SparkleIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 2l1.9 5.7L19.5 9.5l-5.6 1.8L12 17l-1.9-5.7L4.5 9.5l5.6-1.8L12 2z" fill="currentColor" />
      <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" fill="currentColor" />
    </Icon>
  )
}

// Same star with a heavier companion — the dashboard "AI Insights" mark.
export function SparkleNavIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 2l1.9 5.7L19.5 9.5l-5.6 1.8L12 17l-1.9-5.7L4.5 9.5l5.6-1.8L12 2z" fill="currentColor" />
      <path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" fill="currentColor" />
    </Icon>
  )
}

export function GridIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="3" y="3" width="7.5" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="15" width="7.5" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

export function ChatIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function GearIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function BellIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function LockIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

export function LogoutIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function BoltIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M13 2L4.5 13.5H11L9.5 22 19 9.5H13L13 2z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function PlayIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M8 6.5v11l9-5.5-9-5.5z" fill="currentColor" />
    </Icon>
  )
}

// The InsightLoop mark on white — always drawn on the brand gradient.
export function BrandMarkIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 17l4-5 3 3 5-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="9" r="2" fill="#fff" />
    </Icon>
  )
}

const MOOD_MOUTH = {
  positive: 'M8.5 14.5q3.5 3 7 0',
  negative: 'M8.5 16.5q3.5-3 7 0',
  neutral: 'M9 15.25h6',
}

// Sentiment face: same circle, three mouths.
export function MoodIcon({ tone = 'neutral', className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d={MOOD_MOUTH[tone] ?? MOOD_MOUTH.neutral} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  )
}

/* ---- "How it works" step marks ---- */

export function SurveyIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 5h13v10H4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9h13" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 15v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  )
}

export function ClockIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function PieChartIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3a9 9 0 0 1 9 9h-9z" fill="currentColor" />
      <path d="M12 3v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  )
}

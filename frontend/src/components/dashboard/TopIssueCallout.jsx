import './TopIssueCallout.css'

// "Top issue this week" callout (PRD §5.7) — a highlight strip surfaced
// from the theme clustering + sentiment pipeline (Phase 3).
export default function TopIssueCallout({ issue, context }) {
  return (
    <div className="callout">
      <div className="callout__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 9v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="callout__body">
        <span className="callout__label">Top issue this week</span>
        <strong className="callout__issue">{issue}</strong>
        <span className="callout__context">{context}</span>
      </div>
    </div>
  )
}

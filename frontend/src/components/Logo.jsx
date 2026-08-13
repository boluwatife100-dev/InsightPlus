import './Logo.css'

// InsightLoop brand mark: violet gradient rounded square + wordmark.
// `round` renders the mark as a circle (used on the marketing site).
export default function Logo({ compact = false, round = false }) {
  return (
    <div
      className={`logo ${compact ? 'logo--compact' : ''} ${round ? 'logo--round' : ''}`}
    >
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 17l4-5 3 3 5-7"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="17" cy="9" r="2" fill="#ffffff" />
        </svg>
      </span>
      {!compact && <span className="logo__wordmark">InsightLoop</span>}
    </div>
  )
}

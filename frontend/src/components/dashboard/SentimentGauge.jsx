import './SentimentGauge.css'

// Live sentiment gauge — semicircular needle gauge showing the share of
// positive sentiment (PRD §5.8). The skill's chart guidance is applied:
// the numerical values are always visible as text next to the gauge
// (never color-position alone — WCAG AA), and the needle animates via CSS.
export default function SentimentGauge({ positiveShare = 0, negativeShare = 0 }) {
  const neutralShare = Math.max(0, 100 - positiveShare - negativeShare)
  const needleAngle = -90 + (positiveShare / 100) * 180

  return (
    <div className="card gauge-card">
      <div className="gauge-card__head">
        <h3 className="card-title">Live sentiment</h3>
        <span className="gauge-card__live">
          <span className="gauge-card__live-dot" aria-hidden="true" /> Live
        </span>
      </div>
      <p className="card-subtitle">Share of responses — updates in real time</p>

      <div className="gauge-card__dial">
        <svg
          viewBox="0 0 200 120"
          className="gauge-card__svg"
          role="img"
          aria-label={`${positiveShare}% positive, ${neutralShare}% neutral, ${negativeShare}% negative sentiment`}
        >
          <path d="M 20 105 A 80 80 0 0 1 60 29" fill="none" stroke="var(--color-negative)" strokeWidth="16" strokeLinecap="round" />
          <path d="M 60 29 A 80 80 0 0 1 140 29" fill="none" stroke="var(--color-neutral)" strokeWidth="16" strokeLinecap="round" />
          <path d="M 140 29 A 80 80 0 0 1 180 105" fill="none" stroke="var(--color-positive)" strokeWidth="16" strokeLinecap="round" />
          <g
            className="gauge-card__needle"
            style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '100px 105px' }}
          >
            <line x1="100" y1="105" x2="100" y2="38" stroke="var(--color-text)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="105" r="6" fill="var(--color-text)" />
          </g>
        </svg>

        <div className="gauge-card__center">
          <strong>{positiveShare}%</strong>
          <span>positive</span>
        </div>
      </div>

      <div className="gauge-card__legend">
        <span className="gauge-card__legend-item">
          <i className="gauge-card__swatch gauge-card__swatch--positive" aria-hidden="true" />
          <b>Positive</b> {positiveShare}%
        </span>
        <span className="gauge-card__legend-item">
          <i className="gauge-card__swatch gauge-card__swatch--neutral" aria-hidden="true" />
          <b>Neutral</b> {neutralShare}%
        </span>
        <span className="gauge-card__legend-item">
          <i className="gauge-card__swatch gauge-card__swatch--negative" aria-hidden="true" />
          <b>Negative</b> {negativeShare}%
        </span>
      </div>
    </div>
  )
}

import './SentimentGauge.css'

// Live sentiment gauge — a semicircular needle gauge showing the share of
// positive sentiment (PRD §5.8). In Phase 3 the `positiveShare` prop will be
// fed by the realtime backend subscription; CSS transitions animate updates.
export default function SentimentGauge({ positiveShare = 0, negativeShare = 0 }) {
  const neutralShare = Math.max(0, 100 - positiveShare - negativeShare)
  const needleAngle = -90 + (positiveShare / 100) * 180

  return (
    <div className="card gauge-card">
      <h3 className="card-title">Live sentiment</h3>
      <p className="card-subtitle">Share of positive responses — updates in real time</p>

      <div className="gauge-card__dial">
        <svg viewBox="0 0 200 120" className="gauge-card__svg" role="img" aria-label={`${positiveShare}% positive sentiment`}>
          {/* Negative (red) arc: -90°..-30° */}
          <path d="M 20 105 A 80 80 0 0 1 60 29" fill="none" stroke="var(--color-negative)" strokeWidth="16" strokeLinecap="round" />
          {/* Neutral (amber) arc: -30°..30° */}
          <path d="M 60 29 A 80 80 0 0 1 140 29" fill="none" stroke="var(--color-neutral)" strokeWidth="16" strokeLinecap="round" />
          {/* Positive (green) arc: 30°..90° */}
          <path d="M 140 29 A 80 80 0 0 1 180 105" fill="none" stroke="var(--color-positive)" strokeWidth="16" strokeLinecap="round" />
          {/* Needle */}
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
          <i className="gauge-card__swatch gauge-card__swatch--positive" /> Positive {positiveShare}%
        </span>
        <span className="gauge-card__legend-item">
          <i className="gauge-card__swatch gauge-card__swatch--neutral" /> Neutral {neutralShare}%
        </span>
        <span className="gauge-card__legend-item">
          <i className="gauge-card__swatch gauge-card__swatch--negative" /> Negative {negativeShare}%
        </span>
      </div>
    </div>
  )
}

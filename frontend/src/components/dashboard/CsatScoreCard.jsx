import './CsatScoreCard.css'

// Star glyph (line-style, filled via the outer SVG's fill).
function Star({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.57 6.12 20.6l1.12-6.55L2.48 9.42l6.58-.96L12 2.5z"
        fill="currentColor"
      />
    </svg>
  )
}

// CSAT hero card — headline score on a brand gradient, partial 5th star,
// white star-distribution bars, and the period-over-period delta tag.
export default function CsatScoreCard({ csat }) {
  const maxCount = Math.max(...csat.distribution, 1)
  const starFillPct = (csat.score / csat.outOf) * 100

  return (
    <div className="csat-card">
      <div className="csat-card__head">
        <span className="csat-card__label">CSAT Score</span>
        <span className="csat-card__responses">{csat.responses}</span>
      </div>

      <div className="csat-card__body">
        <div className="csat-card__score">
          <div className="csat-card__value-wrap">
            <strong className="csat-card__value">{csat.score}</strong>
            <span className="csat-card__outof">/ {csat.outOf}</span>
          </div>

          <div className="csat-card__stars" role="img" aria-label={`${csat.score} out of ${csat.outOf} stars`}>
            <div className="csat-card__stars-base">
              {csat.stars.map((star) => (
                <Star key={star} className="csat-card__star csat-card__star--off" />
              ))}
            </div>
            <div className="csat-card__stars-fill" style={{ width: `${starFillPct}%` }}>
              {csat.stars.map((star) => (
                <Star key={star} className="csat-card__star csat-card__star--on" />
              ))}
            </div>
          </div>

          <span className="csat-card__delta">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {csat.delta}
          </span>
        </div>

        <div className="csat-card__bars" aria-hidden="true">
          {csat.distribution.map((count, index) => (
            <div key={csat.stars[index]} className="csat-card__bar-col">
              <div className="csat-card__bar-track">
                <span
                  className="csat-card__bar-fill"
                  style={{ height: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="csat-card__bar-label">{csat.stars[index]}★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

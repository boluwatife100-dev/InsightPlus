import './CsatScoreCard.css'
import { Info } from 'lucide-react'
import StarRating from '../StarRating.jsx'

export default function CsatScoreCard({ csat }) {
  const maxCount = Math.max(...(csat?.distribution || []), 1)

  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthName = prevMonth.toLocaleString('default', { month: 'short' });
  const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  const prevMonthString = `vs ${prevMonthName} 1 - ${prevMonthName} ${prevMonthLastDay}`;

  return (
    <div className="csat-card rounded-sm!">
      <div className="csat-card__content">
        <div className="csat-card__info-section">
          <div className="csat-card__title">
            <span>Overall Satisfaction</span>
            <Info size={16} className="csat-card__info-icon" />
          </div>

          <div className="csat-card__score-display">
            <span className="csat-card__score">{csat?.score || 0}</span>
            <span className="csat-card__outof">/{csat?.outOf || 5}</span>
          </div>

          <div className="csat-card__stars-wrapper">
            <StarRating value={csat?.score || 0} readOnly size="lg" />
          </div>

          <div className="csat-card__footer">
            <span className="csat-card__delta-text">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="csat-card__delta-icon">
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {csat?.delta || ''}
            </span>
            <span className="csat-card__period">{prevMonthString}</span>
          </div>
        </div>

        <div className="csat-card__chart-section">
          <div className="csat-card__grid">
            <div className="csat-card__grid-line"><span className="csat-card__grid-label">5</span></div>
            <div className="csat-card__grid-line"><span className="csat-card__grid-label">4</span></div>
            <div className="csat-card__grid-line"><span className="csat-card__grid-label">3</span></div>
            <div className="csat-card__grid-line"><span className="csat-card__grid-label">2</span></div>
            <div className="csat-card__grid-line"><span className="csat-card__grid-label">1</span></div>
          </div>
          <div className="csat-card__bars">
            {(csat?.distribution || []).map((count, index) => (
              <div key={csat?.stars?.[index] || index} className="csat-card__bar-col">
                <div className="csat-card__bar-track" title={`${count} ratings`}>
                  <span
                    className="csat-card__bar-fill"
                    style={{ height: `${(count / maxCount) * 100}%` }}
                  >
                    <span style={{ fontSize: '0.75rem', position: 'absolute', top: '-1.25rem', left: '50%', transform: 'translateX(-50%)' }}>
                      {count}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

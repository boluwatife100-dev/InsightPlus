import { Link } from 'react-router-dom'
import './RecommendedActionCard.css'

// "Recommended action" card — the single next step the AI suggests
// for the business, with a link to the full AI Insights page.
export default function RecommendedActionCard({ text, to = '/dashboard/ai-insight' }) {
  return (
    <div className="card action-card">
      <div className="action-card__head">
        <span className="action-card__spark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L4.5 13.5H11L9.5 22 19.5 9.5H13L13 2z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <h3 className="card-title">Recommended Action</h3>
          <p className="card-subtitle">Suggested by AI analysis</p>
        </div>
      </div>
      <p className="action-card__text">{text}</p>
      <Link to={to} className="action-card__link">
        View all Insights
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}

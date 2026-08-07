import './RecommendedActionCard.css'

// "Recommended action" card — the single next step the AI suggests
// for the business, tied to the top issue (PRD §5.5, §5.7).
export default function RecommendedActionCard({ action }) {
  return (
    <div className="card action-card">
      <div className="action-card__head">
        <span className="action-card__badge">Recommended next step</span>
      </div>
      <h3 className="action-card__title">{action.title}</h3>
      <p className="action-card__description">{action.description}</p>
      <div className="action-card__foot">
        <span className="action-card__impact">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M13 2L4.5 13.5H11L9.5 22 19.5 9.5H13L13 2z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          {action.impact}
        </span>
      </div>
    </div>
  )
}

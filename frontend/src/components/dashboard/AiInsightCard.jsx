import './AiInsightCard.css'

// AI-generated summary of what customers are saying (PRD §5.5).
// The summary text is produced by the backend tagging pipeline in Phase 3;
// currently rendered from demo data.
export default function AiInsightCard({ summary }) {
  return (
    <div className="card ai-card">
      <div className="ai-card__head">
        <span className="ai-card__spark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l1.9 5.7L19.5 9.5l-5.6 1.8L12 17l-1.9-5.7L4.5 9.5l5.6-1.8L12 2z"
              fill="currentColor"
            />
            <path
              d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z"
              fill="currentColor"
            />
          </svg>
        </span>
        <h3 className="card-title">AI Insight</h3>
      </div>
      <p className="ai-card__summary">{summary}</p>
    </div>
  )
}

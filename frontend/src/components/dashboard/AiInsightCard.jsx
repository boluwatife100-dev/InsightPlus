import './AiInsightCard.css'

// AI-generated summary of what customers are saying (PRD §5.5).
// Key phrases passed in `highlights` are rendered bold for scanning.
export default function AiInsightCard({ summary, highlights = [] }) {
  let nodes = [summary]
  for (const phrase of highlights) {
    nodes = nodes.flatMap((node) =>
      typeof node !== 'string'
        ? [node]
        : node
            .split(phrase)
            .flatMap((part, index, parts) =>
              index < parts.length - 1 ? [part, <strong key={`${phrase}-${index}`}>{phrase}</strong>] : [part],
            ),
    )
  }

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
        <div>
          <h3 className="card-title">AI Summary</h3>
          <p className="card-subtitle">What customers are saying this month</p>
        </div>
      </div>
      <p className="ai-card__summary">{nodes}</p>
    </div>
  )
}

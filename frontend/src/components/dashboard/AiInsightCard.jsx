import { useState } from 'react'
import './AiInsightCard.css'

// AI-generated summary of what customers are saying (PRD §5.5).
// Key phrases passed in `highlights` are rendered bold for scanning.
// On mobile the summary collapses to 3 lines with a "Read more" toggle.
export default function AiInsightCard({ summary, highlights = [] }) {
  const [expanded, setExpanded] = useState(false)

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
      <p className={`ai-card__summary ${!expanded ? 'ai-card__summary--clamp' : ''}`}>{nodes}</p>
      <button
        type="button"
        className="ai-card__more"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? 'Show less' : 'Read more'}
        <svg
          className={`ai-card__more-chevron ${expanded ? 'ai-card__more-chevron--open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

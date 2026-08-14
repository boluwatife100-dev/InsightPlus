import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CombinedAiInsight.css'

export default function CombinedAiInsight({ summary, highlights = [], actionText, to = '/dashboard/ai-insight' }) {
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
    <div className="combined-ai-card shadow-sm py-8!">
      <div className="combined-ai-card__left">
        <div className="combined-ai-card__header">
          <span className="combined-ai-card__icon" aria-hidden="true">
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
          <h3 className="combined-ai-card__title">AI Insight</h3>
        </div>
        <p className="combined-ai-card__text">{nodes}</p>
      </div>

      <div className="combined-ai-card__divider"></div>

      <div className="combined-ai-card__right">
        <div className="combined-ai-card__header">
          <h3 className="combined-ai-card__title">Recommended Action</h3>
        </div>
        <p className="combined-ai-card__text">{actionText}</p>
        <Link to={to} className="combined-ai-card__link">
          View all AI Insights
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
    </div>
  )
}

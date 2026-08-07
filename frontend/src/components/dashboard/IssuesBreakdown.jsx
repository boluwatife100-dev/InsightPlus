import { useState } from 'react'
import { Link } from 'react-router-dom'
import './IssuesBreakdown.css'

// Top friction points — labeled progress bars per recurring pain theme.
// Percentages come from the backend theme clustering in Phase 3; bars are
// sized from the given `pct` and read as text (never color alone).
// On mobile only the top 3 show by default, with a "View all" expand.
export default function IssuesBreakdown({ issues, to = '/dashboard/feedback' }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`card issues-card ${expanded ? 'issues-card--expanded' : ''}`}>
      <div className="issues-card__head">
        <div>
          <h3 className="card-title">Top Friction Points</h3>
          <p className="card-subtitle">Share of responses mentioning each theme</p>
        </div>
        <span className="issues-card__total">Top 5</span>
      </div>

      <ul className="issues-card__list">
        {issues.map((issue, index) => (
          <li
            key={issue.label}
            className={`issues-card__item ${index > 2 ? 'issues-card__item--extra' : ''}`}
          >
            <div className="issues-card__row">
              <span className="issues-card__label">
                {index === 0 && <span className="issues-card__rank" aria-hidden="true">1</span>}
                {issue.label}
              </span>
              <span className="issues-card__count">{issue.pct}%</span>
            </div>
            <div
              className="issues-card__track"
              role="progressbar"
              aria-valuenow={issue.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${issue.label}: ${issue.pct}% of responses`}
            >
              <span
                className={`issues-card__fill ${index === 0 ? 'issues-card__fill--top' : ''}`}
                style={{ width: `${issue.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="issues-card__foot">
        <button
          type="button"
          className="issues-card__expand"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Show less' : 'View all'}
          <svg
            className={`issues-card__expand-chevron ${expanded ? 'issues-card__expand-chevron--open' : ''}`}
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
        <Link to={to} className="issues-card__more">
          View all Issues
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

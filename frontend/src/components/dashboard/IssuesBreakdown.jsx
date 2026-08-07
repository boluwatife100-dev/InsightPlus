import './IssuesBreakdown.css'

// Customer issues breakdown — labeled progress bars per recurring theme
// (PRD §5.5, §8: "progress bars for issue breakdowns"). Counts are shown as
// text (never color alone), and bars animate via CSS transitions.
// Issue labels/counts come from the backend theme clustering in Phase 3.
export default function IssuesBreakdown({ issues }) {
  const max = Math.max(...issues.map((issue) => issue.count), 1)

  return (
    <div className="card issues-card">
      <div className="issues-card__head">
        <div>
          <h3 className="card-title">Customer issues breakdown</h3>
          <p className="card-subtitle">Share of responses mentioning each theme</p>
        </div>
        <span className="issues-card__total">{issues.reduce((sum, i) => sum + i.count, 0)} mentions</span>
      </div>

      <ul className="issues-card__list">
        {issues.map((issue, index) => (
          <li key={issue.label} className="issues-card__item">
            <div className="issues-card__row">
              <span className="issues-card__label">
                {index === 0 && <span className="issues-card__rank" aria-hidden="true">1</span>}
                {issue.label}
              </span>
              <span className="issues-card__count">
                {issue.count} · {Math.round((issue.count / max) * 100)}%
              </span>
            </div>
            <div
              className="issues-card__track"
              role="progressbar"
              aria-valuenow={issue.count}
              aria-valuemin={0}
              aria-valuemax={max}
              aria-label={`${issue.label}: ${issue.count} mentions`}
            >
              <span
                className={`issues-card__fill ${index === 0 ? 'issues-card__fill--top' : ''}`}
                style={{ width: `${(issue.count / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

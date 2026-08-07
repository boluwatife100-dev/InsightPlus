import { Link } from 'react-router-dom'
import StarRating from '../StarRating.jsx'
import SentimentBadge from '../SentimentBadge.jsx'
import './RecentFeedbackFeed.css'

// Vector mood icons (single-color line style; no emoji chars).
const MOOD_ICONS = {
  positive: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.25h.01M15.5 10.25h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8.5 14.5q3.5 3 7 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  neutral: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.25h.01M15.5 10.25h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 15.25h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  negative: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.25h.01M15.5 10.25h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8.5 16.5q3.5-3 7 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
}

// Recent feedback feed — latest submissions with star rating + comment (PRD §5.5).
// Items are fed by the realtime backend subscription in Phase 3. On mobile,
// only the 3 most recent items show with a 1-line comment preview.
export default function RecentFeedbackFeed({ items, to = '/dashboard/feedback' }) {
  return (
    <div className="card feed-card">
      <div className="feed-card__head">
        <div>
          <h3 className="card-title">Recent Feedback</h3>
          <p className="card-subtitle">Latest submissions, auto-tagged</p>
        </div>
        <span className="feed-card__count">{items.length} new</span>
      </div>

      <ul className="feed-card__list">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`feed-card__item ${index > 2 ? 'feed-card__item--extra' : ''}`}
          >
            <div className="feed-card__top">
              <div className="feed-card__identity">
                <span
                  className={`feed-card__mood feed-card__mood--${item.sentiment}`}
                  aria-hidden="true"
                >
                  {MOOD_ICONS[item.sentiment] ?? MOOD_ICONS.neutral}
                </span>
                <span className="avatar feed-card__avatar" aria-hidden="true">
                  {item.author === 'Anonymous' ? '·' : item.author.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <strong className="feed-card__name">{item.author}</strong>
                  <span className="feed-card__time">{item.createdAt}</span>
                </div>
              </div>
              <StarRating value={item.rating} readOnly size="sm" />
            </div>
            <p className="feed-card__comment feed-card__comment--clamp">{item.comment}</p>
            <div className="feed-card__meta">
              <SentimentBadge sentiment={item.sentiment} />
              <span className="feed-card__category">{item.category}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="feed-card__foot">
        <Link to={to} className="feed-card__more">
          View all Feedbacks
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

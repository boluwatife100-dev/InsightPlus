import StarRating from '../StarRating.jsx'
import SentimentBadge from '../SentimentBadge.jsx'
import './RecentFeedbackFeed.css'

// Recent feedback feed — latest submissions with star rating + comment (PRD §5.5).
// Items are fed by the realtime backend subscription in Phase 3.
export default function RecentFeedbackFeed({ items }) {
  return (
    <div className="card feed-card">
      <div className="feed-card__head">
        <div>
          <h3 className="card-title">Recent feedback</h3>
          <p className="card-subtitle">Latest submissions, auto-tagged</p>
        </div>
        <span className="feed-card__count">{items.length} new</span>
      </div>

      <ul className="feed-card__list">
        {items.map((item) => (
          <li key={item.id} className="feed-card__item">
            <div className="feed-card__top">
              <div className="feed-card__identity">
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
            <p className="feed-card__comment">{item.comment}</p>
            <div className="feed-card__meta">
              <SentimentBadge sentiment={item.sentiment} />
              <span className="feed-card__category">{item.category}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

import StarRating from '../StarRating.jsx'
import SentimentBadge from '../SentimentBadge.jsx'
import './RecentFeedbackFeed.css'

// Recent feedback feed — latest submissions with star rating + comment (PRD §5.5).
// Items are fed by the realtime backend subscription in Phase 3.
export default function RecentFeedbackFeed({ items }) {
  return (
    <div className="card feed-card">
      <h3 className="card-title">Recent feedback</h3>
      <ul className="feed-card__list">
        {items.map((item) => (
          <li key={item.id} className="feed-card__item">
            <div className="feed-card__top">
              <StarRating value={item.rating} readOnly size="sm" />
              <span className="feed-card__time">{item.createdAt}</span>
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

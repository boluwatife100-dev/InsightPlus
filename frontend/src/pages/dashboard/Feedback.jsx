import StarRating from '../../components/StarRating.jsx'
import SentimentBadge from '../../components/SentimentBadge.jsx'
import { mockFeedback } from '../../data/mockData.js'
import './FeedbackPage.css'

// Feedback page — full list view of all submissions with auto-tags
// (sentiment + theme). Phase 3: live data from the backend.
export default function Feedback() {
  return (
    <div>
      <header className="dash__page-head">
        <h1 className="dash__page-title">Feedback</h1>
        <p className="dash__page-subtitle">
          Every response, automatically tagged by sentiment and theme.
        </p>
      </header>

      <div className="card">
        <ul className="feedback-page__list">
          {mockFeedback.map((item) => (
            <li key={item.id} className="feedback-page__item">
              <div className="feedback-page__head">
                <StarRating value={item.rating} readOnly size="sm" />
                <span className="feedback-page__time">{item.createdAt}</span>
              </div>
              <p className="feedback-page__comment">{item.comment}</p>
              <div className="feedback-page__meta">
                <SentimentBadge sentiment={item.sentiment} />
                <span className="feedback-page__category">{item.category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import StarRating from '../StarRating.jsx'
import SentimentBadge from '../SentimentBadge.jsx'
import './RecentFeedbackFeed.css'
import { ArrowRight, ChevronRight } from 'lucide-react'

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

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (isNaN(seconds)) return dateString; // Fallback if invalid date
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Recent feedback feed — latest submissions with star rating + comment (PRD §5.5).
// Items are fed by the realtime backend subscription in Phase 3. On mobile,
// only the 3 most recent items show with a 1-line comment preview.
export default function RecentFeedbackFeed({ items, to = '/dashboard/feedback' }) {
  return (
    <div className="card feed-card rounded-sm!">
      <div className="">
        <div className='flex flex-row justify-between items-center'>
          <h3 className="font-semibold text-lg ">Recent Feedback</h3>

          <Link to={to} className="flex gap-1 items-center font-semibold text-lg">
          View all Feedbacks
          <ArrowRight size={20}/>
        </Link>
        </div>
       
      </div>

      <ul className="feed-card__list my-4! overflow-y-auto ">
        {items.slice(0, 3).map((item, index) => (
          <li
            key={item.id}
            className={`feed-card__item hover:bg-[#630ED4]/5 p-3! ${index > 2 ? 'feed-card__item--extra' : ''}`}
          >
            <div className="feed-card__top">
              <div className="feed-card__identity">
                <span
                  className={`feed-card__mood feed-card__mood--${item.sentiment}`}
                  aria-hidden="true"
                >
                  {MOOD_ICONS[item.sentiment] ?? MOOD_ICONS.neutral}
                </span>
                <div>
                  <strong className="feed-card__name">{item.author}</strong>
                  <span className="feed-card__time">{timeAgo(item.createdAt)}</span>
                </div>
              </div>
              <StarRating value={item.rating} readOnly size="sm" />
            </div>
            <p className="feed-card__comment feed-card__comment--clamp font-mono!">{item.comment}</p>
            <div className="feed-card__meta">
              <SentimentBadge sentiment={item.sentiment} />
              {/* <span className="feed-card__category">{item.category}</span> */}
            </div>
          </li>
        ))}
      </ul>

      <div className="feed-card__foot">
        
      </div>
    </div>
  )
}

import { useDeferredValue, useMemo, useState } from 'react'
import StarRating from '../../components/StarRating.jsx'
import SentimentBadge from '../../components/SentimentBadge.jsx'
import { feedbackService } from '../../services/index.js'
import { useApi } from '../../hooks/useApi.js'
import './FeedbackPage.css'
import '../../components/dashboard/RecentFeedbackFeed.css'

const SENTIMENT_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'positive', label: 'Positive' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negative' },
]

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

// Feedback page — full list view of all submissions with auto-tags
// (sentiment + theme). Data comes from feedbackService.listFeedback()
// (with optional server-side filters documented in the service);
// search/ filters apply instantly client-side for now.
export default function Feedback() {
  const { data, error, loading, reload } = useApi(() => feedbackService.listFeedback(), [])
  const [query, setQuery] = useState('')
  const [sentiment, setSentiment] = useState('all')
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return (data ?? []).filter((item) => {
      const matchesQuery =
        q === '' || item.comment.toLowerCase().includes(q)
      const matchesSentiment = sentiment === 'all' || item.sentiment === sentiment
      return matchesQuery && matchesSentiment
    })
  }, [deferredQuery, sentiment, data])

  if (error) {
    return (
      <div className="card error-card" role="alert">
        <p className="error-card__title">Couldn't load feedback.</p>
        <p className="error-card__detail">{error.message}</p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={reload}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      <header className="dash__page-head">
        <h1 className="dash__page-title">Feedback</h1>
        <p className="dash__page-subtitle">
          Every response, automatically tagged by sentiment.
        </p>
      </header>

      {/* Filter toolbar */}
      <div className="feedback-page__toolbar">
        <div className="feedback-page__search">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className="input feedback-page__search-input"
            type="search"
            placeholder="Search comments…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search feedback"
          />
        </div>

        <div className="feedback-page__filters" role="group" aria-label="Filter by sentiment">
          {SENTIMENT_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`chip ${sentiment === f.value ? 'chip--active' : ''}`}
              onClick={() => setSentiment(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="feedback-page__count" aria-live="polite">
          {loading ? 'Loading…' : `${filtered.length} of ${data?.length ?? 0} responses`}
        </span>
      </div>

      {/* Results */}
      <div className="card" aria-busy={loading}>
        {loading ? (
          <div className="card skeleton-card" style={{ height: '12rem' }} />
        ) : filtered.length === 0 ? (
          <div className="feedback-page__empty">
            <p>No responses match your filters.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setQuery('')
                setSentiment('all')
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="feed-card__list my-4!">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="feed-card__item hover:bg-[#630ED4]/5 p-3!"
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
                      <strong className="feed-card__name">{item.author || 'Anonymous'}</strong>
                      <span className="feed-card__time">{timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                  <StarRating value={item.rating} readOnly size="sm" />
                </div>
                <p className="feed-card__comment font-mono!">{item.comment}</p>
                <div className="feed-card__meta">
                  <SentimentBadge sentiment={item.sentiment} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
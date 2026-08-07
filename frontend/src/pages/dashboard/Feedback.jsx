import { useDeferredValue, useMemo, useState } from 'react'
import StarRating from '../../components/StarRating.jsx'
import SentimentBadge from '../../components/SentimentBadge.jsx'
import { feedbackService } from '../../services/index.js'
import { useApi } from '../../hooks/useApi.js'
import './FeedbackPage.css'

const SENTIMENT_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'positive', label: 'Positive' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negative' },
]

const CATEGORY_FILTERS = ['All', 'Food', 'Service', 'Pricing', 'Cleanliness', 'Ambience']

// Feedback page — full list view of all submissions with auto-tags
// (sentiment + theme). Data comes from feedbackService.listFeedback()
// (with optional server-side filters documented in the service);
// search/ filters apply instantly client-side for now.
export default function Feedback() {
  const { data, error, loading, reload } = useApi(() => feedbackService.listFeedback(), [])
  const [query, setQuery] = useState('')
  const [sentiment, setSentiment] = useState('all')
  const [category, setCategory] = useState('All')
  const deferredQuery = useDeferredValue(query)

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return (data ?? []).filter((item) => {
      const matchesQuery =
        q === '' || item.comment.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      const matchesSentiment = sentiment === 'all' || item.sentiment === sentiment
      const matchesCategory = category === 'All' || item.category === category
      return matchesQuery && matchesSentiment && matchesCategory
    })
  }, [deferredQuery, sentiment, category, data])

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
          Every response, automatically tagged by sentiment and theme.
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
            placeholder="Search comments or categories…"
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

        <div className="feedback-page__filters" role="group" aria-label="Filter by category">
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${category === c ? 'chip--active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
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
                setCategory('All')
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="feedback-page__list">
            {filtered.map((item) => (
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
        )}
      </div>
    </div>
  )
}
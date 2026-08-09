import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import StarRating from '../components/StarRating.jsx'
import { feedbackService } from '../services/index.js'
import './FeedbackForm.css'

const CATEGORIES = ['Food', 'Service', 'Pricing', 'Cleanliness', 'Ambience', 'Other']

const RATING_LABELS = {
  0: 'Tap a star to rate',
  1: 'Terrible',
  2: 'Poor',
  3: 'Okay',
  4: 'Good',
  5: 'Amazing!',
}

const COMMENT_MAX = 500

// Public feedback form — no login required (PRD §5.1).
// Submissions POST to feedbackService.submitFeedback() on the real backend.
export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting || rating === 0) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      await feedbackService.submitFeedback({ rating, category, comment })
      navigate('/thank-you', { state: { rating, category, comment } })
    } catch (err) {
      setSubmitError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="feedback">
      <header className="feedback__nav">
        <div className="container feedback__nav-inner">
          <Link to="/" aria-label="InsightPlus home">
            <Logo compact />
          </Link>
          <div className="feedback__business">
            <span className="feedback__business-avatar" aria-hidden="true">
              RR
            </span>
            <strong>Rite Restaurant</strong>
          </div>
        </div>
      </header>

      <main className="feedback__main">
        <div className="feedback__card card">
          <div className="feedback__card-head">
            <span className="feedback__eyebrow">Quick feedback · under 1 min</span>
            <h1 className="feedback__title">How was your visit?</h1>
            <p className="feedback__subtitle">
              Your feedback goes straight to the team — and straight into what they improve next.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <span className="field-label">Your rating</span>
              <StarRating value={rating} onChange={setRating} size="lg" />
              <span className="feedback__rating-label" aria-live="polite">
                {RATING_LABELS[rating]}
              </span>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="category">
                What is this about?
              </label>
              <select
                id="category"
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <div className="feedback__comment-head">
                <label className="field-label" htmlFor="comment">
                  Anything else you want to share?
                </label>
                <span className="feedback__counter" aria-live="polite">
                  {comment.length}/{COMMENT_MAX}
                </span>
              </div>
              <textarea
                id="comment"
                className="textarea"
                placeholder="Tell us what worked — and what didn’t…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={COMMENT_MAX}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={rating === 0 || submitting}
            >
              {submitting ? 'Submitting…' : 'Submit feedback'}
            </button>
            {submitError && (
              <p className="feedback__error" role="alert">
                {submitError}
              </p>
            )}
          </form>

          <p className="feedback__privacy">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            100% anonymous · No login required
          </p>
        </div>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import StarRating from '../components/StarRating.jsx'
import './FeedbackForm.css'

const CATEGORIES = ['Food', 'Service', 'Pricing', 'Cleanliness', 'Ambience', 'Other']

// Public feedback form — no login required (PRD §5.1).
// Phase 3: POST the submitted data to the agreed backend API contract;
// until then it navigates to the confirmation screen with local state.
export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState('')
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/thank-you', { state: { rating, category, comment } })
  }

  return (
    <div className="feedback">
      <header className="feedback__nav">
        <div className="container feedback__nav-inner">
          <Link to="/" aria-label="InsightPlus home">
            <Logo compact />
          </Link>
          <span className="feedback__business">Casa Verde Bistro</span>
        </div>
      </header>

      <main className="feedback__main">
        <div className="feedback__card card">
          <h1 className="feedback__title">How was your visit?</h1>
          <p className="feedback__subtitle">
            Your feedback helps us serve you better. It takes less than a minute.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <span className="field-label">Your rating</span>
              <StarRating value={rating} onChange={setRating} size="lg" />
              {rating > 0 && (
                <span className="feedback__rating-label" aria-hidden="true">
                  {rating} / 5
                </span>
              )}
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
              <label className="field-label" htmlFor="comment">
                Anything else you want to share?
              </label>
              <textarea
                id="comment"
                className="textarea"
                placeholder="Tell us what worked — and what didn’t…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={rating === 0}
            >
              Submit feedback
            </button>
          </form>

          <p className="feedback__privacy">100% anonymous · No login required</p>
        </div>
      </main>
    </div>
  )
}

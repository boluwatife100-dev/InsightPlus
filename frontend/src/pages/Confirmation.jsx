import { Link } from 'react-router-dom'
import './Confirmation.css'

// Confirmation screen shown right after a feedback submission (PRD §5.3).
// Reads the just-submitted submission from router state (Phase 3: real data).
export default function Confirmation() {
  return (
    <div className="confirm">
      <main className="confirm__main">
        <div className="confirm__card card">
          <div className="confirm__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="confirm__eyebrow">Feedback received</span>
          <h1 className="confirm__title">Thanks for your feedback!</h1>
          <p className="confirm__text">
            Your response has been shared with the team. It goes straight into their dashboard —
            and straight into what they improve next.
          </p>
          <div className="confirm__actions">
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          </div>
          <p className="confirm__tip">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M12 9v4m0 4h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Every response is anonymous and only used to improve the experience.
          </p>
        </div>
      </main>
    </div>
  )
}

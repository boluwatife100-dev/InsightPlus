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
        </div>
      </main>
    </div>
  )
}

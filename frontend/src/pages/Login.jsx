import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import './Login.css'

// Business owner authentication entry point.
// MVP: UI shell only — functional auth is optional (PRD §10).
// On submit, navigates to the dashboard shell with a demo account.
export default function Login() {
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const switchMode = (next) => setMode(next)

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="auth">
      <div className="auth__side">
        <div className="auth__side-inner">
          <Link to="/" className="auth__logo-link">
            <Logo />
          </Link>
          <blockquote className="auth__quote">
            “We found out about our wait-time problem within a week. Fixing it directly raised our
            4.1 to 4.6 stars.”
          </blockquote>
          <p className="auth__quote-author">Maria Lopez — Casa Verde Bistro</p>
        </div>
      </div>

      <main className="auth__panel">
        <div className="auth__card card">
          <h1 className="auth__title">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="auth__subtitle">
            {mode === 'login'
              ? 'Log in to see what your customers are saying.'
              : 'Get your unique feedback link in under a minute.'}
          </p>

          <div className="auth__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth__tab ${mode === 'login' ? 'auth__tab--active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Log in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth__tab ${mode === 'signup' ? 'auth__tab--active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Sign up
            </button>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="field">
                <label className="field-label" htmlFor="business">
                  Business name
                </label>
                <input
                  id="business"
                  className="input"
                  type="text"
                  placeholder="e.g. Casa Verde Bistro"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="field">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              {mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <p className="auth__demo-note">
            Demo mode — a single mocked business account is used for the hackathon demo. No real
            authentication is performed yet.
          </p>
        </div>

        <p className="auth__foot">
          <Link to="/">← Back to home</Link>
        </p>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { authService } from '../services/index.js'
import { DEMO_CREDENTIALS } from '../config.js'
import './Login.css'

// Login / signup screen. Submissions hit authService.login() (mocked for
// the hackathon: demo@InsightLoop.app / demo1234, real backend via
// VITE_USE_MOCK=false).
const SIDE_STATS = [
  {
    value: '4.6★',
    label: 'Avg. rating after fix',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.2l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.9l-5.6 3.2 1.1-6.2L3 9.8l6.2-.9L12 3.2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: '84',
    label: 'Satisfaction score',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: '12k+',
    label: 'Responses tagged',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 11.5 3h.5A8.5 8.5 0 0 1 21 11.5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function Login() {
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [authError, setAuthError] = useState(null)
  const navigate = useNavigate()

  const switchMode = (next) => {
    setMode(next)
    setAuthError(null)
  }

  const fillDemoAccount = () => {
    setMode('login')
    setBusinessName(DEMO_CREDENTIALS.business)
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setAuthError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setAuthError(null)
    try {
      if (mode === 'signup') {
        await authService.signup({ email, password, businessName })
      } else {
        await authService.login({ email, password })
      }
      navigate('/dashboard')
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth__statusbar" aria-hidden="true">
        <span className="auth__statusbar-time">9:41</span>
        <span className="auth__statusbar-icons">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4v3M12 9v2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="2" y="11" width="2.6" height="9" rx="1" fill="currentColor" />
            <rect x="6.5" y="8.5" width="2.6" height="11.5" rx="1" fill="currentColor" />
            <rect x="11" y="6" width="2.6" height="14" rx="1" fill="currentColor" />
            <rect x="15.5" y="3.5" width="2.6" height="16.5" rx="1" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 13.5A16.5 16.5 0 0 1 21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 18A11 11 0 0 1 21 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="8" width="18" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13 8v10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>

      <aside className="auth__side">
        <div className="auth__side-deco" aria-hidden="true" />
        <div className="auth__side-inner">
          <Link to="/" className="auth__logo-link" aria-label="InsightLoop home">
            <img src={"/in-logo.png"} alt="InsightLoop logo" className="bg-white rounded-full p-2" />
          </Link>

          <div className="auth__side-body">
            <blockquote className="auth__quote">
              “We found out about our wait-time problem within a week. Fixing it directly raised our
              4.1 to 4.6 stars.”
            </blockquote>
            <p className="auth__quote-author">Sarah Johnson — Owner, Rite Restaurant</p>

            <div className="auth__side-stats">
              {SIDE_STATS.map((stat) => (
                <div key={stat.label} className="auth__side-stat">
                  <span className="auth__side-stat-icon">{stat.icon}</span>
                  <strong className="auth__side-stat-value">{stat.value}</strong>
                  <span className="auth__side-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="auth__panel">
        <div className="auth__card">
          <h1 className="auth__title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
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
                  className="input auth__input"
                  type="text"
                  placeholder="e.g. Rite Restaurant"
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
                className="input auth__input"
                type="email"
                placeholder="you@business.com"
                autoComplete="username"
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
                className="input auth__input"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {authError && (
              <p className="auth__error" role="alert">
                {authError}
              </p>
            )}

            <button type="submit" className="btn btn-primary rounded-sm btn-block btn-lg" disabled={submitting}>
              {submitting ? 'Signing in…' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <div className="auth__divider" aria-hidden="true" />

          <div className="auth__demo">
            <p className="auth__demo-title">Explore the demo dashboard</p>
            <button type="button" className="btn rounded-sm btn-outline btn-block" onClick={fillDemoAccount}>
              Use demo account
            </button>
            <div className=" auth__demo-creds">
              <code>demo@InsightLoop.app</code>
              <code>demo1234</code>
            </div>
          </div>

          <p className="auth__demo-note">
            Demo mode — authentication goes through authService, mocked for the hackathon. No real
            account is created.
          </p>
        </div>

        <p className="auth__foot">
          <Link to="/">Back to home</Link>
        </p>
      </main>
    </div>
  )
}
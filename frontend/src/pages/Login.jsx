import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { authService } from '../services/index.js'
import { DEMO_CREDENTIALS } from '../config.js'
import './Login.css'

// Login / signup screen. Submissions hit authService.login() (mocked for
// the hackathon: demo@insightplus.app / demo1234, real backend via
// VITE_USE_MOCK=false).
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
      await authService.login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth">
      <aside className="auth__side">
        <div className="auth__side-inner">
          <Link to="/" className="auth__logo-link" aria-label="InsightPlus home">
            <Logo />
          </Link>

          <blockquote className="auth__quote">
            “We found out about our wait-time problem within a week. Fixing it directly raised our
            4.1 to 4.6 stars.”
          </blockquote>
          <p className="auth__quote-author">Sarah Johnson — Owner, Rite Restaurant</p>

          <dl className="auth__side-stats">
            <div>
              <dt>4.6★</dt>
              <dd>Avg. rating after fix</dd>
            </div>
            <div>
              <dt>84</dt>
              <dd>Satisfaction score</dd>
            </div>
            <div>
              <dt>12k+</dt>
              <dd>Responses tagged</dd>
            </div>
          </dl>
        </div>
      </aside>

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
                className="input"
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
                className="input"
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

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
              {submitting ? 'Signing in…' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <div className="auth__demo">
            <p className="auth__demo-title">Explore the demo dashboard</p>
            <button type="button" className="btn btn-secondary btn-block" onClick={fillDemoAccount}>
              Use demo account
            </button>
            <p className="auth__demo-creds">
              {DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}
            </p>
          </div>

          <p className="auth__demo-note">
            Demo mode — authentication goes through authService, mocked for the hackathon. No real
            account is created.
          </p>
        </div>

        <p className="auth__foot">
          <Link to="/">← Back to home</Link>
        </p>
      </main>
    </div>
  )
}

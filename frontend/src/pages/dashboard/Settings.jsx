import { useEffect, useState } from 'react'
import { businessService } from '../../services/index.js'
import { useApi } from '../../hooks/useApi.js'
import './Settings.css'

// Settings page — business profile shell (UI only for the MVP demo).
// Loads the current business via businessService.getCurrentBusiness()
// and updates it through businessService.updateBusiness().
export default function Settings() {
  const { data: business, error, loading, reload } = useApi(
    () => businessService.getCurrentBusiness(),
    [],
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    if (business) {
      setName(business.name ?? '')
      setEmail(business.email ?? '')
    }
  }, [business])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (saving) return
    setSaving(true)
    setSaveError(null)
    try {
      await businessService.updateBusiness({ name, email })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (error) {
    return (
      <div className="card error-card" role="alert">
        <p className="error-card__title">Couldn't load your business profile.</p>
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
        <h1 className="dash__page-title">Settings</h1>
        <p className="dash__page-subtitle">Manage your business profile and feedback link.</p>
      </header>

      <div className="dash__grid">
        <div className="dash__span-7">
          <form className="card" onSubmit={handleSubmit}>
            <h2 className="settings__section-title">Business profile</h2>

            <div className="field">
              <label className="field-label" htmlFor="settings-business">
                Business name
              </label>
              <input
                id="settings-business"
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="settings-email">
                Contact email
              </label>
              <input
                id="settings-email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading || saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            {saveError && (
              <span className="settings__error" role="alert">
                {saveError}
              </span>
            )}
            {saved && <span className="settings__saved">Saved ✓</span>}
          </form>
        </div>

        <div className="dash__span-5">
          <div className="card">
            <h2 className="settings__section-title">Your feedback link</h2>
            <p className="settings__hint">
              Share this link — or print the QR code — so customers can reach your feedback form.
            </p>
            <div className="settings__link-row">
              <code className="settings__link">insightplus.app/f/{business?.id ?? 'your-business'}</code>
              <button type="button" className="btn btn-secondary">
                Copy
              </button>
            </div>
            <div className="settings__qr" aria-hidden="true">
              <svg viewBox="0 0 60 60" fill="none">
                <rect x="6" y="6" width="20" height="20" rx="3" fill="currentColor" />
                <rect x="34" y="6" width="20" height="20" rx="3" fill="currentColor" />
                <rect x="6" y="34" width="20" height="20" rx="3" fill="currentColor" />
                <rect x="34" y="34" width="6" height="6" fill="currentColor" />
                <rect x="48" y="34" width="6" height="6" fill="currentColor" />
                <rect x="34" y="48" width="6" height="6" fill="currentColor" />
                <rect x="48" y="48" width="6" height="6" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
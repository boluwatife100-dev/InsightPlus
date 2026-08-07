import { useState } from 'react'
import './Settings.css'

// Settings page — business profile shell (UI only for the MVP demo).
// Out of scope for the hackathon: real auth, multi-business, billing (PRD §10).
export default function Settings() {
  const [businessName, setBusinessName] = useState('Rite Restaurant')
  const [email, setEmail] = useState('sarah@riterestaurant.example')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
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
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
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
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
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
              <code className="settings__link">insightplus.app/f/casa-verde</code>
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

import { useEffect, useState, useMemo } from 'react'
import { toast } from 'sonner'
import { QRCodeSVG } from 'qrcode.react'
import { businessService } from '../../services/index.js'
import { useApi } from '../../hooks/useApi.js'
import './Settings.css'

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

  const feedbackUrl = useMemo(() => {
    const businessId = business?.id ?? 'demo'
    const businessName = business?.name ?? 'Demo Business'
    return `${window.location.origin}/feedback?businessId=${businessId}&business=${encodeURIComponent(businessName)}`
  }, [business])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedbackUrl)
      toast.success('Link copied to clipboard')
    } catch (err) {
      toast.error('Could not copy link')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (saving) return
    setSaving(true)
    setSaveError(null)
    try {
      // Name is locked, so only email is actually editable/submitted
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
                className="input text-muted-foreground bg-gray-200"
                type="text"
                value={name}
                disabled
                readOnly
                title="Business name can't be changed"
              />
              <span className="field-hint">Business name can't be changed after setup.</span>
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
              <code
                className="settings__link"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {feedbackUrl}
              </code>
              <button type="button" className="btn btn-secondary" onClick={handleCopy}>
                Copy
              </button>
            </div>
            <div className="settings__qr">
              <QRCodeSVG
                value={feedbackUrl}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
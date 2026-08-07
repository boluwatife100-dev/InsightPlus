import { useEffect, useRef, useState } from 'react'
import './BusinessSwitcher.css'

// Business switcher — dropdown pill used in the desktop sidebar and the
// mobile subhead. `compact` renders the mobile pill variant (no avatar/plan).
// The business list is supplied by the parent (fetched via
// businessService.listBusinesses) so the switcher stays presentational.
export default function BusinessSwitcher({ compact = false, businesses = [] }) {
  const [open, setOpen] = useState(false)
  const [business, setBusiness] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (!business && businesses.length > 0) {
      setBusiness(businesses[0])
    }
  }, [businesses, business])

  return (
    <div className={`dash__switcher ${compact ? 'dash__switcher--compact' : ''}`} ref={ref}>
      <button
        type="button"
        className="dash__switcher-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={businesses.length === 0}
        onClick={() => setOpen((prev) => !prev)}
      >
        {!compact && (
          <span className="dash__business-avatar" aria-hidden="true">
            {business?.initials ?? '·'}
          </span>
        )}
        <span className="dash__business-meta">
          <strong>{business?.name ?? 'Select business'}</strong>
          {!compact && <span>{business?.plan ?? 'Loading…'}</span>}
        </span>
        <svg
          className={`dash__switcher-chevron ${open ? 'dash__switcher-chevron--open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && businesses.length > 0 && (
        <ul className="dash__switcher-menu" role="listbox" aria-label="Switch business">
          {businesses.map((item) => (
            <li key={item.id} role="option" aria-selected={item.id === business?.id}>
              <button
                type="button"
                className={`dash__switcher-option ${item.id === business?.id ? 'dash__switcher-option--active' : ''}`}
                onClick={() => {
                  setBusiness(item)
                  setOpen(false)
                }}
              >
                <span className="dash__business-avatar dash__business-avatar--sm" aria-hidden="true">
                  {item.initials}
                </span>
                <span className="dash__business-meta">
                  <strong>{item.name}</strong>
                  <span>{item.plan}</span>
                </span>
                {item.id === business?.id && (
                  <svg className="dash__switcher-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
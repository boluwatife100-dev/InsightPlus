import { useEffect, useRef, useState } from 'react'
import LandingButton from './LandingButton.jsx'
import SmartLink from './SmartLink.jsx'
import { NAV_GROUPS } from './content.jsx'
import { BatteryIcon, ChevronIcon, MenuIcon, SignalCheckIcon } from './icons.jsx'
import { CONTAINER, EASE_OUT, ICON_BUTTON, NAV_LINK_HOVER } from './styles.js'

// Decorative iOS status bar, phone only — sells the "app" feel above
// the marketing nav.
function StatusBar() {
  return (
    <div
      className="flex h-[calc(env(safe-area-inset-top)+2.5rem)] items-center justify-between bg-[linear-gradient(180deg,rgba(246,244,252,0.95),rgba(246,244,252,0))] px-6 pt-[calc(env(safe-area-inset-top)+0.25rem)] text-sm font-bold text-[var(--color-primary-strong)] min-[721px]:hidden"
      aria-hidden="true"
    >
      <span>9:41</span>
      <span className="flex items-center gap-2">
        <SignalCheckIcon className="h-[1.05rem] w-[1.05rem]" />
        <BatteryIcon className="h-[1.05rem] w-[1.05rem]" />
      </span>
    </div>
  )
}

// Native <details> disclosure: the menu opens on click and closes when a
// link inside is chosen, with no extra state to keep in sync.
function NavDropdown({ label, items, isOpen, onToggle }) {
  const closeDropdown = () => onToggle(false)

  return (
    <details className="group relative" open={isOpen} onToggle={(event) => onToggle(event.currentTarget.open)}>
      <summary className="inline-flex list-none items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-150 hover:bg-[var(--color-primary-faint)] hover:text-[var(--color-primary-strong)] [&::-webkit-details-marker]:hidden">
        {label}
        <span
          className={`inline-flex transition-transform duration-150 ${EASE_OUT} group-open:rotate-180`}
          aria-hidden="true"
        >
          <ChevronIcon className="h-[0.9rem] w-[0.9rem]" />
        </span>
      </summary>

      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 flex min-w-[13rem] -translate-x-1/2 flex-col gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-pop)]">
        {items.map((link) => (
          <SmartLink
            key={link.text}
            href={link.href}
            onClick={closeDropdown}
            className={`block whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--color-text)] ${NAV_LINK_HOVER}`}
          >
            {link.text}
          </SmartLink>
        ))}
      </div>
    </details>
  )
}

// Sticky marketing header. Full nav from 1101px; below that the links
// collapse into the slide-out drawer (see MobileMenu).
export default function LandingHeader({ menuOpen, onOpenMenu }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('details')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(215,205,240,0.7)] bg-[rgba(246,244,252,0.82)] backdrop-blur-[12px]">
      <StatusBar />

      <div className={`${CONTAINER} flex items-center gap-6 pt-1 pb-2 min-[721px]:py-3`}>
        <a href="#top" className="inline-flex shrink-0 leading-none">
          <img
            src="/in-logo.png"
            alt="InsightPlus logo"
            className="h-12 w-fit"
          />
        </a>

        <nav className="mx-auto hidden items-center gap-2 min-[1101px]:flex" aria-label="Main navigation">
          {NAV_GROUPS.map((group) => (
            <NavDropdown
              key={group.label}
              label={group.label}
              items={group.items}
              isOpen={openDropdown === group.label}
              onToggle={(isOpen) => setOpenDropdown(isOpen ? group.label : null)}
            />
          ))}
          <SmartLink
            href="/login?mode=signup"
            className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-150 hover:bg-[var(--color-primary-faint)] hover:text-[var(--color-primary-strong)]"
          >
            Pricing
          </SmartLink>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 min-[1101px]:flex">
          <LandingButton href="/login" variant="outline" className=" rounded-sm text-sm font-semibold">
            Login
          </LandingButton>
          <LandingButton href="/login?mode=signup" className=" rounded-sm text-sm font-semibold">
            Create an Account
          </LandingButton>
        </div>

        <button
          type="button"
          className={`ml-auto ${ICON_BUTTON} min-[1101px]:hidden`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <MenuIcon className="h-[1.35rem] w-[1.35rem]" />
        </button>
      </div>
    </header>
  )
}

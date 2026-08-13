import Logo from '../Logo.jsx'
import LandingButton from './LandingButton.jsx'
import SmartLink from './SmartLink.jsx'
import { NAV_GROUPS } from './content.jsx'
import { CloseIcon } from './icons.jsx'
import { EASE_OUT, ICON_BUTTON, NAV_LINK_HOVER } from './styles.js'

const GROUP_LABEL =
  'mb-2 text-xs font-bold tracking-[0.09em] text-[var(--color-text-faint)] uppercase'

const DRAWER_LINK = `block px-2 py-3 text-sm font-normal text-[var(--color-text)] tracking-wider border-b border-[var(--color-border)] ${NAV_LINK_HOVER}`

// Slide-out navigation for phone and tablet (hidden from 1101px).
//
// The panel stays mounted so it can transition in and out; when closed it
// is marked `inert`, which removes it from the tab order and the
// accessibility tree instead of just hiding it visually.
export default function MobileMenu({ open, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[55] bg-[rgba(33,27,54,0.45)] transition-opacity duration-[220ms] min-[1101px]:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-[60] flex w-[min(20rem,85vw)] flex-col gap-6 overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-pop)] transition-transform duration-300 ${EASE_OUT} min-[1101px]:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex items-center justify-between">
          <img src="/in-logo.png" alt="InsightLoop" className="h-10 w-fit" />
          <button type="button" className={ICON_BUTTON} aria-label="Close menu" onClick={onClose}>
            <CloseIcon className="h-[1.35rem] w-[1.35rem]" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-4" aria-label="Mobile navigation text-sm">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className={GROUP_LABEL}>{group.label}</p>
              {group.items.map((link) => (
                <SmartLink key={link.text} href={link.href} className={DRAWER_LINK} onClick={onClose}>
                  {link.text}
                </SmartLink>
              ))}
            </div>
          ))}

          <div>
            <p className={GROUP_LABEL}>Pricing</p>
            <SmartLink href="/login?mode=signup" className={DRAWER_LINK} onClick={onClose}>
              View plans
            </SmartLink>
          </div>
        </nav>

        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-4">
          <LandingButton href="/login" variant="outline" className="rounded-sm" width="full" onClick={onClose}>
            Login
          </LandingButton>
          <LandingButton href="/login?mode=signup" className="rounded-sm"  width="full" onClick={onClose}>
            Create an Account
          </LandingButton>
        </div>
      </aside>
    </>
  )
}

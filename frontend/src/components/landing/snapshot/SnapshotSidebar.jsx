import { BrandMarkIcon, ChevronIcon, LogoutIcon } from '../icons.jsx'
import { Avatar, MetaPair } from './SnapshotCard.jsx'
import { SNAPSHOT_BUSINESS, SNAPSHOT_NAV, SNAPSHOT_USER } from './data.jsx'

// Miniature dashboard sidebar. Desktop only (≥1101px) — below that the
// snapshot shows just the main column, exactly like the real app.
export default function SnapshotSidebar() {
  return (
    <aside className="hidden flex-col gap-3 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4 min-[1101px]:flex">
      <div className="flex items-center gap-2 p-1">
        <Avatar className="h-[1.6rem] w-[1.6rem] rounded-full">
          <BrandMarkIcon className="h-[0.95rem] w-[0.95rem]" />
        </Avatar>
        <span className="text-sm font-extrabold tracking-[-0.02em] text-[var(--color-text)]">
          InsightPlus
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-primary-faint)] p-2">
        <Avatar className="h-[1.6rem] w-[1.6rem] rounded-[var(--radius-xs)] text-[0.55rem]">
          {SNAPSHOT_BUSINESS.initials}
        </Avatar>
        <MetaPair name={SNAPSHOT_BUSINESS.name} role={SNAPSHOT_BUSINESS.role} />
        <ChevronIcon className="h-[0.7rem] w-[0.7rem] shrink-0 text-[var(--color-text-faint)]" />
      </div>

      <nav className="flex flex-col gap-1" aria-label="Dashboard">
        <p className="px-2 text-[0.6rem] font-bold tracking-[0.09em] text-[var(--color-text-faint)] uppercase">
          Menu
        </p>
        {SNAPSHOT_NAV.map((item) => (
          <span
            key={item.label}
            className={`flex items-center gap-2 rounded-[var(--radius-md)] p-2 text-xs font-semibold ${
              item.active
                ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]'
                : 'text-[var(--color-text-muted)]'
            }`}
          >
            <span className="inline-flex h-[0.8rem] w-[0.8rem] shrink-0 [&_svg]:h-full [&_svg]:w-full">
              {item.icon}
            </span>
            {item.label}
          </span>
        ))}
      </nav>

      <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-[image:var(--gradient-brand-soft)] p-3">
        <strong className="mb-1 block text-xs">Need help?</strong>
        <span className="text-[0.62rem] font-semibold text-[var(--color-primary-dark)]">
          Visit Help Center →
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
        <Avatar className="h-[1.7rem] w-[1.7rem] rounded-full text-[0.55rem]">
          {SNAPSHOT_USER.initials}
        </Avatar>
        <MetaPair name={SNAPSHOT_USER.name} role={SNAPSHOT_USER.role} />
        <LogoutIcon className="h-[0.85rem] w-[0.85rem] shrink-0 text-[var(--color-text-muted)]" />
      </div>
    </aside>
  )
}

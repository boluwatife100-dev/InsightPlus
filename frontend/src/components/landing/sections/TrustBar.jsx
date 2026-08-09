import { TRUSTED_BY } from '../content.jsx'
import { CONTAINER } from '../styles.js'

// Customer logo wall. Scrolls horizontally on phones (scrollbar hidden
// in both engines) and wraps to a centred row from tablet up.
export default function TrustBar() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 min-[721px]:py-12">
      <div className={CONTAINER}>
        <p className="mb-8 text-center text-xs font-bold tracking-[0.1em] text-[var(--color-text-faint)] uppercase">
          InsightPlus is trusted by
        </p>

        <ul
          className="m-0 flex list-none flex-nowrap items-center justify-start gap-8 overflow-x-auto p-0 pb-1 [scrollbar-width:none] min-[721px]:flex-wrap min-[721px]:justify-center min-[721px]:gap-12 min-[721px]:overflow-visible [&::-webkit-scrollbar]:hidden"
          aria-label="Trusted by"
        >
          {TRUSTED_BY.map((logo) => (
            <li
              key={logo.name}
              className="inline-flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-[-0.01em] text-[#8d86a6] transition-colors duration-150 hover:text-[#5f587f]"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center [&_svg]:h-full [&_svg]:w-full">
                {logo.glyph}
              </span>
              {logo.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

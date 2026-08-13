import SectionHeading from '../SectionHeading.jsx'
import { TESTIMONIALS } from '../content.jsx'
import { BRAND_GRADIENT, CONTAINER, EASE_OUT, SECTION_Y } from '../styles.js'
import { InfiniteMovingCards } from '../../ui/infinite-moving-cards.jsx'

function TestimonialCard({ quote, author, role, initials }) {
  return (
    <figure
      className={`m-0 flex flex-none basis-[calc(100%-0.75rem)] snap-start flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)] transition-transform duration-[220ms] ${EASE_OUT} hover:-translate-y-[3px] min-[721px]:p-8 min-[861px]:basis-[calc(25%-0.75rem)]`}
    >
      <div className="text-sm tracking-[0.12em] text-[var(--color-amber-bright)]" aria-hidden="true">
        ★★★★★
      </div>

      <blockquote className="m-0 flex-1 text-base leading-[1.6] font-semibold text-[var(--color-text)]">
        “{quote}”
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-[0.02em] text-white ${BRAND_GRADIENT}`}
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="flex flex-col leading-[1.35]">
          <strong className="text-sm">{author}</strong>
          <span className="text-xs text-[var(--color-text-muted)]">{role}</span>
        </div>
      </figcaption>
    </figure>
  )
}

// Swipeable testimonial carousel.
//
// Scrolling is native (CSS scroll-snap) rather than JS-driven, so the
// track keeps momentum scrolling on touch devices. The dots only mirror
// the scroll position and scroll the track back when clicked.
export default function Testimonials() {
  return (
    <section id="testimonials" className={`bg-[var(--color-lavender)] ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading title="What our customers say">
          See how InsightLoop is helping businesses make sense of customer feedback and make better
          decisions.
        </SectionHeading>

        <div className="mt-6 w-full mx-auto">
          <InfiniteMovingCards
            items={TESTIMONIALS.map((t) => ({ name: t.author, title: t.role, quote: t.quote, image: t.image }))}
            className=""
            direction="left"
            speed="slow"
          />
        </div>
      </div>
    </section>
  )
}

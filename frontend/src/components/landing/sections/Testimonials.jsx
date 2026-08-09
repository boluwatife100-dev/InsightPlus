import { useRef, useState } from 'react'
import SectionHeading from '../SectionHeading.jsx'
import { TESTIMONIALS } from '../content.jsx'
import { BRAND_GRADIENT, CONTAINER, EASE_OUT, SECTION_Y } from '../styles.js'

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
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToCard = (index) => {
    setActive(index)
    const track = trackRef.current
    const target = track?.children[index]
    if (!target) return
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  const onTrackScroll = () => {
    const track = trackRef.current
    if (!track?.children.length) return
    const card = track.children[0]
    const index = Math.round(track.scrollLeft / card.offsetWidth)
    setActive(Math.max(0, Math.min(index, TESTIMONIALS.length - 1)))
  }

  return (
    <section id="testimonials" className={`bg-[var(--color-lavender)] ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading title="What our customers say">
          See how InsightPlus is helping businesses make sense of customer feedback and make better
          decisions.
        </SectionHeading>

        <div className="relative">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] min-[721px]:gap-6 [&::-webkit-scrollbar]:hidden"
            ref={trackRef}
            onScroll={onTrackScroll}
          >
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.author} {...testimonial} />
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2" role="group" aria-label="Choose a testimonial">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.author}
                type="button"
                className={`h-2 rounded-[var(--radius-pill)] border-0 p-0 transition-all duration-150 ${EASE_OUT} ${
                  index === active ? 'w-6 bg-[var(--color-primary)]' : 'w-2 bg-[var(--color-lavender-deep)]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === active}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import LandingButton from '../LandingButton.jsx'
import SectionHeading from '../SectionHeading.jsx'
import { STEPS } from '../content.jsx'
import { PlayIcon } from '../icons.jsx'
import { CONTAINER, EASE_OUT, SECTION_Y } from '../styles.js'

// Three-step explainer. Cards stack on phones and go 3-up from 861px.
export default function HowItWorks() {
  return (
    <section id="how-it-works" className={`${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading className="my-8" title="HOW IT WORKS">
          Collect. Understand. Improve. Turn every customer voice into a better business.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.title}
              className={`flex flex-col items-center gap-4 rounded-2xl capitalize bg-[#F6F0FF] px-6 py-10 text-center shadow-sm transition-transform duration-200 tracking-wider ${EASE_OUT} hover:-translate-y-[4px] md:px-8 md:py-12`}
            >
              <span
                className="mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(124,58,237,0.08)] [&_svg]:h-[2.25rem] [&_svg]:w-[2.25rem]"
                aria-hidden="true"
              >
                {step.icon}
              </span>
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">{step.title}</h3>
              <p className="text-sm leading-[1.7] text-[var(--color-text-muted)] max-w-[22ch]">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center min-[721px]:mt-12">
          <LandingButton href="#" size="lg" width="mobile" className="max-w-[20rem]">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.22] [&_svg]:ml-[0.1rem] [&_svg]:h-[0.8rem] [&_svg]:w-[0.8rem]"
              aria-hidden="true"
            >
              <PlayIcon />
            </span>
            See how it works
          </LandingButton>
        </div>
      </div>
    </section>
  )
}

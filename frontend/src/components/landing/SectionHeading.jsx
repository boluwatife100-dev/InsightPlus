// Centred section title + supporting line ("How it works",
// "What our customers say"). Keeps the measure and spacing identical
// across sections.
export default function SectionHeading({ title, children }) {
  return (
    <div className="mx-auto my-12">
      <h2 className="mb-3 text-center text-semibold text-3xl tracking-[-0.03em] min-[721px]:text-4xl">{title}</h2>
      <p className="px-2 text-center text-sm leading-[1.7] text-[var(--color-text-muted)] md:text-base tracking-wide">
        {children}
      </p>
    </div>
  )
}

export default function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="section-anchor py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6">
        <div className="flex flex-col gap-4">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-teal">
              {eyebrow}
            </span>
          ) : null}
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              {title}
            </h2>
            {subtitle ? <p className="text-ink/70">{subtitle}</p> : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

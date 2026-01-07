import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
      <div className="absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-20 md:px-6 md:py-28">
        <span className="animate-fade-in rounded-full border border-teal/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Custom Tailored Streetwear
        </span>
        <h1 className="animate-fade-up font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
          Welcome to TSL - Customize your styled wear
        </h1>
        <p className="animate-fade-up max-w-2xl text-lg text-ink/70 md:text-xl">
          Build premium pieces that feel like you. Choose fabrics, colors, and
          finishes, then send your order to our design team in one click.
        </p>
        <div className="animate-fade-up flex flex-wrap items-center gap-4">
          <Link
            to="/customize"
            className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            Get Started
          </Link>
          <Link
            to="/#products"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink/80 transition hover:border-ink/40"
          >
            Explore products
          </Link>
        </div>
        <div className="grid w-full gap-4 pt-8 md:grid-cols-3">
          {[
            {
              label: "Premium Fabrics",
              value: "48+"
            },
            {
              label: "Custom Orders Delivered",
              value: "2.4k"
            },
            {
              label: "Design Variations",
              value: "120+"
            }
          ].map((item) => (
            <div
              key={item.label}
              className="card-sheen rounded-2xl border border-clay bg-white/80 p-5 backdrop-blur"
            >
              <p className="text-2xl font-semibold text-ink">{item.value}</p>
              <p className="text-sm text-ink/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-clay/70 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-8 text-sm text-ink/70 md:flex-row md:items-center md:px-6">
        <div>
          <p className="font-display text-base font-semibold text-ink">TSL</p>
          <p>Customized clothing platform</p>
        </div>
        <div className="flex flex-col gap-1">
          <span>hello@tslwear.com</span>
          <span>+94 72 335 4244</span>
        </div>
        <div className="text-xs uppercase tracking-[0.2em]">
          Crafted in Sri Lanka
        </div>
      </div>
    </footer>
  );
}

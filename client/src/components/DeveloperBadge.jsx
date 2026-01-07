import { Link } from "react-router-dom";

export default function DeveloperBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="animate-fade-in rounded-2xl border border-amber-400/70 bg-gradient-to-br from-amber-200/80 via-amber-100/80 to-orange-200/80 px-4 py-3 text-xs text-ink/80 shadow-lg backdrop-blur transition hover:-translate-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">
          Developer
        </p>
        <p className="mt-1 text-sm font-semibold text-ink">
          Praveena Kurukuladithya
        </p>
        <Link
          to="/about-developer"
          className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 transition hover:text-amber-800"
        >
          Who is behind this
        </Link>
      </div>
    </div>
  );
}

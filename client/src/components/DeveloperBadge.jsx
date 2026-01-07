import { Link } from "react-router-dom";

export default function DeveloperBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="rounded-2xl border border-clay bg-white/85 px-4 py-3 text-xs text-ink/70 shadow-lg backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">
          Developer
        </p>
        <p className="mt-1 text-sm font-semibold text-ink">
          Praveena Kurukuladithya
        </p>
        <Link
          to="/about-developer"
          className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal"
        >
          Who is behind this
        </Link>
      </div>
    </div>
  );
}

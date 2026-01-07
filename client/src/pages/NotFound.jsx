import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 py-20 text-ink/70">
      <h2 className="font-display text-4xl text-ink">Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}

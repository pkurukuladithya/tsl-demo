import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/cart"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-clay bg-white/70 text-ink transition hover:-translate-y-0.5 hover:shadow-glow"
      aria-label="View cart"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 1.9-1.4L21 8H7"
        />
        <circle cx="10" cy="20" r="1.6" />
        <circle cx="18" cy="20" r="1.6" />
      </svg>
      {totalItems > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-coral px-1 text-[11px] font-semibold text-white">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}

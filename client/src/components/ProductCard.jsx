import { Link } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback.jsx";
import { getCategoryLabel } from "../data/catalog.js";
import { formatPrice } from "../utils/format.js";

export const ProductCardSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-clay bg-white/80 p-4">
    <div className="aspect-[3/4] w-full rounded-2xl bg-clay/60" />
    <div className="mt-4 h-4 w-3/4 rounded-full bg-clay/70" />
    <div className="mt-2 h-3 w-1/3 rounded-full bg-clay/60" />
  </div>
);

export default function ProductCard({ product, to }) {
  if (!product) {
    return null;
  }

  const categoryLabel = getCategoryLabel(product.category);
  const price = formatPrice(product.basePrice);
  const imageUrl = product.images?.[0];
  const card = (
    <div className="card-sheen group flex h-full flex-col rounded-2xl border border-clay bg-white/90 p-4 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="aspect-[3/4] w-full">
          <ImageWithFallback
            src={imageUrl}
            alt={`${product.name} in ${categoryLabel}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70">
          {categoryLabel}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">{product.name}</h3>
          <p className="text-sm text-ink/60">{price}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-clay text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
          View
        </div>
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="block">
      {card}
    </Link>
  ) : (
    card
  );
}

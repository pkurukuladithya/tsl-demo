import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard.jsx";
import { categories, getCategoryLabel } from "../data/catalog.js";
import { api } from "../services/api.js";

export default function CustomizeCategory() {
  const { category } = useParams();
  const selectedCategory = useMemo(
    () => categories.find((item) => item.id === category),
    [category]
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) {
      return;
    }
    let mounted = true;
    setLoading(true);
    setProducts([]);
    setError("");
    api.products
      .list(category)
      .then((data) => {
        if (mounted) {
          setProducts(data || []);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [category]);

  if (!selectedCategory) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-ink/70">
        Category not found.
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-20 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal">
            {getCategoryLabel(category)}
          </p>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Pick a {selectedCategory.name}
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Choose a base piece, then tailor every detail.
          </p>
        </div>
        <Link
          to="/customize"
          className="rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70"
        >
          Back to categories
        </Link>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <div className="grid gap-6 md:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={`category-skeleton-${idx}`} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                to={`/customize/${category}/${product._id}`}
              />
            ))}
      </div>

      {!loading && !products.length ? (
        <div className="rounded-2xl border border-dashed border-clay bg-white/80 p-6 text-sm text-ink/60">
          No products available in this category yet.
        </div>
      ) : null}
    </div>
  );
}

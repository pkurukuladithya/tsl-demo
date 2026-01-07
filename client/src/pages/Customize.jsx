import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard.jsx";
import { categories } from "../data/catalog.js";
import { api } from "../services/api.js";

export default function Customize() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setError("");
    api.products
      .featured()
      .then((data) => {
        if (mounted) {
          setFeatured(data || []);
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
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 md:px-6">
      <div>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          Choose your starting canvas
        </h2>
        <p className="mt-3 text-ink/70">
          Pick a category and tailor every detail to your personal style.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/customize/${category.id}`}
            className="card-sheen flex h-full flex-col justify-between rounded-2xl border border-clay bg-white/90 p-6 transition hover:-translate-y-1"
          >
            <div>
              <div
                className="mb-4 h-12 w-12 rounded-2xl"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(135deg, #F25C3B, #F7B194)"
                      : "linear-gradient(135deg, #1F7A7A, #90D5D1)"
                }}
              />
              <h3 className="text-lg font-semibold text-ink">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-ink/60">
                {category.description}
              </p>
            </div>
            <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Start customizing
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-clay bg-white/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-ink">
              Featured pieces
            </h3>
            <p className="text-sm text-ink/60">
              Handpicked custom favorites from the studio.
            </p>
          </div>
          <Link
            to="/customize/tshirt"
            className="rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            Explore all
          </Link>
        </div>
        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <ProductCardSkeleton key={`customize-skeleton-${idx}`} />
              ))
            : featured.slice(0, 6).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  to={`/customize/${product.category}/${product._id}`}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

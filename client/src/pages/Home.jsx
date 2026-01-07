import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import { api } from "../services/api.js";

export default function Home() {
  const location = useLocation();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

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
    <div className="space-y-4">
      <Hero />

      <Section
        id="products"
        eyebrow="Our products"
        title="Build your look, piece by piece"
        subtitle="Curated essentials designed to be customized with premium fabrics, colors, and finishes."
      >
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <div className="grid gap-6 md:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <ProductCardSkeleton key={`featured-skeleton-${idx}`} />
              ))
            : featured.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  to={`/customize/${product.category}/${product._id}`}
                />
              ))}
        </div>
        <Link
          to="/customize"
          className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Start customizing
        </Link>
      </Section>

      <Section
        id="gallery"
        eyebrow="Gallery"
        title="Inspiration from recent drops"
        subtitle="Mix textures, contrasts, and finishes to craft your signature fit."
      >
        <GalleryGrid />
      </Section>

      <Section
        id="about"
        eyebrow="About us"
        title="Design-led, detail-obsessed"
        subtitle="TSL helps you personalize every stitch. From fabric to fit, we keep your taste at the center."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-clay bg-white/80 p-6">
            <h3 className="font-display text-xl text-ink">Crafted with care</h3>
            <p className="mt-3 text-sm text-ink/70">
              Our designers collaborate with you to refine each order and ensure
              the final piece feels personal, premium, and timeless.
            </p>
          </div>
          <div className="rounded-2xl border border-clay bg-white/80 p-6">
            <h3 className="font-display text-xl text-ink">Flexible and fast</h3>
            <p className="mt-3 text-sm text-ink/70">
              Whether it is a single statement piece or a full team kit, our
              workflow makes customization smooth from start to delivery.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact us"
        title="Let's bring your custom fit to life"
        subtitle="Send us a note or reach out directly. We reply quickly to every request."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <form className="rounded-2xl border border-clay bg-white/80 p-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Name
                </label>
                <input
                  className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
                  placeholder="Tell us about your custom order"
                />
              </div>
              <button
                type="button"
                className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white"
              >
                Send message
              </button>
            </div>
          </form>
          <div className="rounded-2xl border border-clay bg-white/80 p-6">
            <h3 className="font-display text-xl text-ink">TSL Studio</h3>
            <div className="mt-4 space-y-2 text-sm text-ink/70">
              <p>32 Park Road, Colombo</p>
              <p>Open Mon-Sat, 9am - 7pm</p>
              <p>Phone: +94 72 335 4244</p>
              <p>Email: hello@tslwear.com</p>
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-clay bg-sand/60 p-4 text-xs uppercase tracking-[0.2em] text-ink/60">
              Custom fittings by appointment
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

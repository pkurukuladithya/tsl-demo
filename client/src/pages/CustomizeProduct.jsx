import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageWithFallback from "../components/ImageWithFallback.jsx";
import GuestCheckoutModal from "../components/GuestCheckoutModal.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useWhatsAppOrder } from "../hooks/useWhatsAppOrder.js";
import {
  getCategoryLabel,
  getColorValue,
  materialOptions,
  sizeOptions
} from "../data/catalog.js";
import { api } from "../services/api.js";
import { mergeCartItems, stripCartKey } from "../utils/cart.js";
import { formatPrice } from "../utils/format.js";

export default function CustomizeProduct() {
  const { category, productId } = useParams();
  const { items, setItems } = useCart();
  const { user } = useAuth();
  const { placing, placeOrder } = useWhatsAppOrder();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [guestOpen, setGuestOpen] = useState(false);
  const [pendingItems, setPendingItems] = useState(null);

  const categoryLabel = useMemo(
    () => getCategoryLabel(product?.category || category),
    [product, category]
  );

  useEffect(() => {
    if (!productId) {
      return;
    }
    let mounted = true;
    setLoading(true);
    setProduct(null);
    setError("");
    api.products
      .getById(productId)
      .then((data) => {
        if (mounted) {
          setProduct(data);
          setError("");
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
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }
    const defaultImage = product.images?.[0] || "";
    setActiveImage(defaultImage);
    setQuantity(1);
    setNotes("");
    setSize(product.sizes?.length === 1 ? product.sizes[0] : "");
    setColor(product.colors?.length === 1 ? product.colors[0] : "");
    setMaterial(product.materials?.length === 1 ? product.materials[0] : "");
  }, [product]);

  const availableSizes = product?.sizes?.length ? product.sizes : sizeOptions;
  const availableColors = product?.colors?.length ? product.colors : [];
  const availableMaterials = product?.materials?.length
    ? product.materials
    : materialOptions;

  const validateSelection = () => {
    if (!size || !color || !material || quantity < 1) {
      toast.error("Select size, color, material, and quantity.");
      return false;
    }
    return true;
  };

  const buildItem = () => ({
    productId: product?._id,
    productName: product?.name,
    category: product?.category || category,
    size,
    color,
    material,
    quantity: Number(quantity),
    notes: notes.trim()
  });

  const handleAddToCart = () => {
    if (!validateSelection()) {
      return;
    }
    const nextItems = mergeCartItems(items, buildItem());
    setItems(nextItems);
    toast.success("Added to cart");
  };

  const handlePlaceOrder = async (guest) => {
    if (!validateSelection()) {
      return;
    }

    const nextItems = pendingItems || mergeCartItems(items, buildItem());

    if (!user && !guest) {
      setPendingItems(nextItems);
      setGuestOpen(true);
      return;
    }

    setItems(nextItems);
    setPendingItems(null);

    try {
      await placeOrder({
        items: nextItems.map(stripCartKey),
        guest
      });
      toast.success("WhatsApp message ready");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <div className="animate-pulse rounded-3xl border border-clay bg-white/80 p-6">
          <div className="aspect-[3/4] w-full rounded-2xl bg-clay/60" />
          <div className="mt-4 h-3 w-1/3 rounded-full bg-clay/50" />
        </div>
        <div className="animate-pulse rounded-3xl border border-clay bg-white/80 p-6">
          <div className="h-6 w-2/3 rounded-full bg-clay/60" />
          <div className="mt-6 h-10 w-full rounded-full bg-clay/50" />
          <div className="mt-4 h-10 w-full rounded-full bg-clay/50" />
          <div className="mt-4 h-10 w-full rounded-full bg-clay/50" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-ink/70">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-6">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-clay bg-white/80 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal">
                {categoryLabel}
              </p>
              <h2 className="font-display text-3xl text-ink">{product.name}</h2>
              <p className="text-sm text-ink/60">
                Starting at {formatPrice(product.basePrice)}
              </p>
            </div>
            <Link
              to={`/customize/${category}`}
              className="rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70"
            >
              Back to list
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-clay">
            <div className="aspect-[3/4] w-full bg-sand/60">
              <ImageWithFallback
                src={activeImage}
                alt={`${product.name} main view`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3 overflow-auto">
            {product.images.map((img, index) => (
              <button
                key={`${product._id}-thumb-${index}`}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`h-20 w-16 overflow-hidden rounded-2xl border transition ${
                  activeImage === img
                    ? "border-ink"
                    : "border-clay opacity-70 hover:opacity-100"
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-clay bg-white/80 p-6">
          <h3 className="font-display text-xl text-ink">Choose a size</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {availableSizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  size === option
                    ? "border-ink bg-ink text-white"
                    : "border-clay bg-white text-ink/70"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-clay bg-white/80 p-6">
          <h3 className="font-display text-xl text-ink">Pick a color</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {availableColors.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setColor(option)}
                className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  color === option
                    ? "border-ink bg-ink text-white"
                    : "border-clay bg-white text-ink/70"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-clay"
                  style={{ backgroundColor: getColorValue(option) }}
                />
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-clay bg-white/80 p-6">
          <h3 className="font-display text-xl text-ink">Material</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {availableMaterials.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMaterial(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  material === option
                    ? "border-teal bg-teal text-white"
                    : "border-clay bg-white text-ink/70"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-clay bg-white/80 p-6">
        <h3 className="font-display text-xl text-ink">Finalize details</h3>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) =>
              setQuantity(Math.max(1, Number(event.target.value) || 1))
            }
            className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
            Notes (optional)
          </label>
          <textarea
            rows="4"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
            placeholder="Add special requests, logo placement, etc."
          />
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => handlePlaceOrder()}
            disabled={placing}
            className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {placing ? "Preparing order..." : "Place Order"}
          </button>
        </div>
      </aside>

      <GuestCheckoutModal
        open={guestOpen}
        onClose={() => {
          setGuestOpen(false);
          setPendingItems(null);
        }}
        onSubmit={(guest) => {
          setGuestOpen(false);
          handlePlaceOrder(guest);
        }}
      />
    </div>
  );
}

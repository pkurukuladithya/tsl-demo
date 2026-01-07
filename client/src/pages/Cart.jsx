import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getCategoryLabel } from "../data/catalog.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useWhatsAppOrder } from "../hooks/useWhatsAppOrder.js";
import GuestCheckoutModal from "../components/GuestCheckoutModal.jsx";
import { stripCartKey } from "../utils/cart.js";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const { placing, placeOrder } = useWhatsAppOrder();
  const [guestOpen, setGuestOpen] = useState(false);

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const handlePlaceOrder = async (guest) => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!user && !guest) {
      setGuestOpen(true);
      return;
    }

    try {
      await placeOrder({ items: items.map(stripCartKey), guest });
      toast.success("WhatsApp message ready");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 py-16 text-ink/70">
        <h2 className="font-display text-3xl text-ink">Your cart is empty</h2>
        <p>Add your first custom piece to get started.</p>
        <Link
          to="/customize"
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Go to customization
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 md:grid-cols-[2fr_1fr] md:px-6">
      <div className="rounded-3xl border border-clay bg-white/80 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-ink">Your cart</h2>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50"
          >
            Clear all
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex flex-col gap-4 rounded-2xl border border-clay bg-white p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-ink">
                  {item.productName || item.category}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
                  {item.category ? getCategoryLabel(item.category) : "Custom"}
                </p>
                <p className="text-sm text-ink/60">
                  {item.size} / {item.color} / {item.material}
                </p>
                {item.notes ? (
                  <p className="mt-2 text-xs text-ink/50">
                    Notes: {item.notes}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.key, event.target.value)
                  }
                  className="w-20 rounded-xl border border-clay bg-white px-3 py-2 text-sm focus:border-teal focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.key)}
                  className="rounded-full border border-clay px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="flex h-fit flex-col gap-4 rounded-3xl border border-clay bg-white/80 p-6">
        <h3 className="font-display text-xl text-ink">Order summary</h3>
        <div className="flex items-center justify-between text-sm text-ink/70">
          <span>Subtotal (items)</span>
          <span>{totalItems}</span>
        </div>
        <div className="rounded-2xl border border-dashed border-clay bg-sand/60 p-4 text-xs text-ink/60">
          Pricing is confirmed on WhatsApp once we review your customization
          notes.
        </div>
        <button
          type="button"
          onClick={() => handlePlaceOrder()}
          disabled={placing}
          className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {placing ? "Preparing order..." : "Place Order"}
        </button>
      </aside>

      <GuestCheckoutModal
        open={guestOpen}
        onClose={() => setGuestOpen(false)}
        onSubmit={(guest) => {
          setGuestOpen(false);
          handlePlaceOrder(guest);
        }}
      />
    </div>
  );
}

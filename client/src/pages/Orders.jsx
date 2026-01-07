import { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { getCategoryLabel } from "../data/catalog.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    api.orders
      .list()
      .then((data) => {
        if (mounted) {
          setOrders(data || []);
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
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h2 className="font-display text-3xl text-ink">Order history</h2>
      {loading ? (
        <p className="text-ink/60">Loading orders...</p>
      ) : null}
      {error ? <p className="text-rose-600">{error}</p> : null}
      {!loading && !orders.length ? (
        <p className="text-ink/60">No orders yet.</p>
      ) : null}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-2xl border border-clay bg-white/80 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm text-ink/60">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                  {order.status}
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                {order.items?.length || 0} items
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-ink/70">
              {order.items?.map((item, idx) => (
                <p key={`${order._id}-${idx}`}>
                  {item.productName || item.category} ({item.category ? getCategoryLabel(item.category) : "Custom"}) /
                  {item.size} /
                  {item.color} / {item.material} / Qty {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

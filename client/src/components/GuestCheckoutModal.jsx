import { useEffect, useState } from "react";

export default function GuestCheckoutModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
      setMobile("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !mobile) {
      return;
    }
    onSubmit({ name, mobile });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="font-display text-xl font-semibold text-ink">
          Quick guest details
        </h3>
        <p className="mt-2 text-sm text-ink/60">
          Add your name and mobile number so we can personalize your WhatsApp
          message.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Mobile
            </label>
            <input
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="+94 7X XXX XXXX"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
            >
              Continue to WhatsApp
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-clay px-5 py-2 text-sm font-semibold text-ink/70"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

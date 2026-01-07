import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-16">
      <h2 className="font-display text-3xl text-ink">Create your TSL account</h2>
      <p className="text-ink/70">
        Save your custom pieces, sync your cart, and view past orders.
      </p>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-clay bg-white/80 p-6"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Mobile
            </label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="+94 7X XXX XXXX"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="Create a strong password"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="text-sm text-ink/60">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-ink">
          Login
        </Link>
      </p>
    </div>
  );
}

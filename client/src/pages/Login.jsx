import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login({ identifier, password });
      toast.success("Welcome back!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-16">
      <h2 className="font-display text-3xl text-ink">Login to TSL</h2>
      <p className="text-ink/70">
        Use your email or mobile number to access your account.
      </p>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-clay bg-white/80 p-6"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Email or Mobile
            </label>
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-clay bg-white px-4 py-3 text-sm focus:border-teal focus:outline-none"
              placeholder="********"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-ink/60">
        New to TSL?{" "}
        <Link to="/register" className="font-semibold text-ink">
          Create an account
        </Link>
      </p>
    </div>
  );
}

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import CartIcon from "./CartIcon.jsx";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/#products" },
  { label: "Gallery", to: "/#gallery" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
  { label: "Customize", to: "/customize" }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-clay/70 bg-white/75 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal text-white">
            TSL
          </span>
          <span>tsl-demo</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-teal" : "text-ink/70 hover:text-ink"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/orders"
                className="text-sm font-semibold text-ink/80 hover:text-ink"
              >
                Orders
              </Link>
              <Link
                to="/profile"
                className="text-sm font-semibold text-ink/80 hover:text-ink"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-clay px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/40"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-ink/80 hover:text-ink"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                Sign Up
              </Link>
            </>
          )}
          <CartIcon />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <CartIcon />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </div>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-clay/70 bg-white/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-ink/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link
                  to="/orders"
                  className="text-sm font-medium text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-clay px-4 py-2 text-sm font-semibold text-ink"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

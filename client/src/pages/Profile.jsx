import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <h2 className="font-display text-3xl text-ink">Profile</h2>
      <div className="rounded-3xl border border-clay bg-white/80 p-6">
        <div className="grid gap-4 text-sm text-ink/70">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Name</p>
            <p className="text-lg text-ink">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Email
            </p>
            <p className="text-lg text-ink">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Mobile
            </p>
            <p className="text-lg text-ink">{user?.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

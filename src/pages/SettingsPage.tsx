import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { profile, roles, tenantId } = useAuth();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Settings</h1>
      <div className="max-w-lg space-y-6">
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-lg font-semibold text-card-foreground">Profile</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{profile?.full_name || "—"}</span></p>
            <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{profile?.email || "—"}</span></p>
            <p><span className="text-muted-foreground">Department:</span> <span className="text-foreground">{profile?.department || "—"}</span></p>
            <p><span className="text-muted-foreground">Job Title:</span> <span className="text-foreground">{profile?.job_title || "—"}</span></p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-lg font-semibold text-card-foreground">Roles</h2>
          {roles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {r.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No roles assigned.</p>
          )}
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-lg font-semibold text-card-foreground">Organization</h2>
          <p className="text-sm text-muted-foreground">Tenant ID: <span className="text-foreground">{tenantId || "Not assigned"}</span></p>
        </div>
      </div>
    </div>
  );
}

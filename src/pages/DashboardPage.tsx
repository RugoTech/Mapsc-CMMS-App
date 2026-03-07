import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClipboardList, Wrench, FileText, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { tenantId } = useAuth();

  const { data: woCount = 0 } = useQuery({
    queryKey: ["wo-count", tenantId],
    queryFn: async () => {
      const { count } = await supabase
        .from("work_orders")
        .select("*", { count: "exact", head: true })
        .in("status", ["open", "in_progress"]);
      return count ?? 0;
    },
    enabled: !!tenantId,
  });

  const { data: wrCount = 0 } = useQuery({
    queryKey: ["wr-count", tenantId],
    queryFn: async () => {
      const { count } = await supabase
        .from("work_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      return count ?? 0;
    },
    enabled: !!tenantId,
  });

  const { data: assetCount = 0 } = useQuery({
    queryKey: ["asset-count", tenantId],
    queryFn: async () => {
      const { count } = await supabase
        .from("assets")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);
      return count ?? 0;
    },
    enabled: !!tenantId,
  });

  const { data: overdueCount = 0 } = useQuery({
    queryKey: ["overdue-count", tenantId],
    queryFn: async () => {
      const { count } = await supabase
        .from("work_orders")
        .select("*", { count: "exact", head: true })
        .in("status", ["open", "in_progress"])
        .lt("due_date", new Date().toISOString().split("T")[0]);
      return count ?? 0;
    },
    enabled: !!tenantId,
  });

  const stats = [
    { label: "Active Work Orders", value: woCount, icon: ClipboardList, color: "text-primary" },
    { label: "Pending Requests", value: wrCount, icon: FileText, color: "text-amber-500" },
    { label: "Active Assets", value: assetCount, icon: Wrench, color: "text-emerald-500" },
    { label: "Overdue WOs", value: overdueCount, icon: AlertTriangle, color: "text-destructive" },
  ];

  if (!tenantId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No organization associated. Contact your administrator.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

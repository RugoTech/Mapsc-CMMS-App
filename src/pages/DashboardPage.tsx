import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Wrench, FileText, AlertTriangle, Calendar, Package, TrendingUp, Clock } from "lucide-react";

export default function DashboardPage() {
  const { tenantId, profile } = useAuth();

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

  const { data: pmCount = 0 } = useQuery({
    queryKey: ["pm-due-count", tenantId],
    queryFn: async () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const { count } = await supabase
        .from("pm_schedules")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true)
        .lte("next_due_date", nextWeek.toISOString().split("T")[0]);
      return count ?? 0;
    },
    enabled: !!tenantId,
  });

  const { data: lowStockCount = 0 } = useQuery({
    queryKey: ["low-stock-count", tenantId],
    queryFn: async () => {
      const { data } = await supabase
        .from("parts")
        .select("id, quantity, min_quantity")
        .eq("is_active", true);
      return data?.filter(p => Number(p.quantity) <= Number(p.min_quantity)).length ?? 0;
    },
    enabled: !!tenantId,
  });

  const { data: recentWOs = [] } = useQuery({
    queryKey: ["recent-wos", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_orders")
        .select("id, code, description, status, priority, work_order_type, due_date")
        .in("status", ["open", "in_progress"])
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const stats = [
    { label: "Active Work Orders", value: woCount, icon: ClipboardList, color: "text-primary" },
    { label: "Pending Requests", value: wrCount, icon: FileText, color: "text-amber-500" },
    { label: "Active Assets", value: assetCount, icon: Wrench, color: "text-emerald-500" },
    { label: "Overdue WOs", value: overdueCount, icon: AlertTriangle, color: "text-destructive" },
    { label: "PMs Due (7d)", value: pmCount, icon: Calendar, color: "text-primary" },
    { label: "Low Stock Parts", value: lowStockCount, icon: Package, color: "text-amber-500" },
  ];

  if (!tenantId) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No organization associated with your account. Contact your administrator.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const priorityVariant = (p: string) => {
    switch (p) {
      case "high": return "destructive" as const;
      case "medium": return "warning" as const;
      case "low": return "info" as const;
      default: return "secondary" as const;
    }
  };

  const statusVariant = (s: string) => {
    switch (s) {
      case "open": return "info" as const;
      case "in_progress": return "warning" as const;
      case "completed": return "success" as const;
      default: return "secondary" as const;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">Welcome back, {profile?.full_name || "User"}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Active Work Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentWOs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active work orders.</p>
          ) : (
            <div className="space-y-3">
              {recentWOs.map((wo) => (
                <div key={wo.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{wo.code}</span>
                      <Badge variant={statusVariant(wo.status)} className="capitalize text-[10px]">
                        {wo.status.replace(/_/g, " ")}
                      </Badge>
                      <Badge variant={priorityVariant(wo.priority)} className="capitalize text-[10px]">
                        {wo.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{wo.description}</p>
                  </div>
                  {wo.due_date && (
                    <div className="ml-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {wo.due_date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

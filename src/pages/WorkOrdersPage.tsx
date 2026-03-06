import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function WorkOrdersPage() {
  const { tenantId } = useAuth();

  const { data: workOrders = [], isLoading } = useQuery({
    queryKey: ["work-orders", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_orders")
        .select("id, code, description, status, priority, work_order_type, due_date, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Work Orders</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : workOrders.length === 0 ? (
        <p className="text-muted-foreground">No work orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Priority</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr key={wo.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{wo.code}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-foreground">{wo.description}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{wo.work_order_type}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{wo.priority}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{wo.status}</td>
                  <td className="px-4 py-3 text-muted-foreground">{wo.due_date || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

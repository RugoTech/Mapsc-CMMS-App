import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function WorkOrdersPage() {
  const { tenantId } = useAuth();

  const { data: workOrders = [], isLoading } = useQuery({
    queryKey: ["work-orders", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_orders")
        .select("id, code, description, status, priority, work_order_type, due_date, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

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
      case "archived": return "secondary" as const;
      case "canceled": return "destructive" as const;
      default: return "secondary" as const;
    }
  };

  if (isLoading) return <PageLoading />;

  return (
    <div className="space-y-4">
      <DataTable>
        <DataTableHeader>
          <DataTableHead>Code</DataTableHead>
          <DataTableHead>Description</DataTableHead>
          <DataTableHead>Type</DataTableHead>
          <DataTableHead>Priority</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Due Date</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {workOrders.length === 0 ? (
            <DataTableEmpty message="No work orders found." />
          ) : (
            workOrders.map((wo) => (
              <DataTableRow key={wo.id}>
                <DataTableCell className="font-medium">{wo.code}</DataTableCell>
                <DataTableCell className="max-w-xs truncate">{wo.description}</DataTableCell>
                <DataTableCell>
                  <Badge variant="outline" className="capitalize text-[10px]">
                    {wo.work_order_type.replace(/_/g, " ")}
                  </Badge>
                </DataTableCell>
                <DataTableCell>
                  <Badge variant={priorityVariant(wo.priority)} className="capitalize text-[10px]">
                    {wo.priority}
                  </Badge>
                </DataTableCell>
                <DataTableCell>
                  <Badge variant={statusVariant(wo.status)} className="capitalize text-[10px]">
                    {wo.status.replace(/_/g, " ")}
                  </Badge>
                </DataTableCell>
                <DataTableCell className="text-muted-foreground">{wo.due_date || "—"}</DataTableCell>
              </DataTableRow>
            ))
          )}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function WorkRequestsPage() {
  const { tenantId } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["work-requests", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_requests")
        .select("id, code, description, status, priority, request_date, location_description")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const statusVariant = (s: string) => {
    switch (s) {
      case "pending": return "warning" as const;
      case "approved": return "success" as const;
      case "rejected": return "destructive" as const;
      case "converted": return "info" as const;
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
          <DataTableHead>Location</DataTableHead>
          <DataTableHead>Priority</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Date</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {requests.length === 0 ? (
            <DataTableEmpty message="No work requests found." />
          ) : (
            requests.map((wr) => (
              <DataTableRow key={wr.id}>
                <DataTableCell className="font-medium">{wr.code}</DataTableCell>
                <DataTableCell className="max-w-xs truncate">{wr.description}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{wr.location_description || "—"}</DataTableCell>
                <DataTableCell>
                  <Badge variant={wr.priority === "high" ? "destructive" : wr.priority === "medium" ? "warning" : "info"} className="capitalize text-[10px]">
                    {wr.priority}
                  </Badge>
                </DataTableCell>
                <DataTableCell>
                  <Badge variant={statusVariant(wr.status)} className="capitalize text-[10px]">
                    {wr.status}
                  </Badge>
                </DataTableCell>
                <DataTableCell className="text-muted-foreground">{wr.request_date}</DataTableCell>
              </DataTableRow>
            ))
          )}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function MetersPage() {
  const { tenantId } = useAuth();

  const { data: meters = [], isLoading } = useQuery({
    queryKey: ["meters", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meters")
        .select("id, code, name, meter_type, unit_of_measure, last_reading, is_active")
        .order("code")
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  if (isLoading) return <PageLoading />;

  return (
    <div className="space-y-4">
      <DataTable>
        <DataTableHeader>
          <DataTableHead>Code</DataTableHead>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Type</DataTableHead>
          <DataTableHead>UOM</DataTableHead>
          <DataTableHead className="text-right">Last Reading</DataTableHead>
          <DataTableHead>Active</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {meters.length === 0 ? (
            <DataTableEmpty message="No meters found." />
          ) : (
            meters.map((m) => (
              <DataTableRow key={m.id}>
                <DataTableCell className="font-medium">{m.code}</DataTableCell>
                <DataTableCell>{m.name}</DataTableCell>
                <DataTableCell className="text-muted-foreground capitalize">{m.meter_type}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{m.unit_of_measure}</DataTableCell>
                <DataTableCell className="text-right text-muted-foreground">{m.last_reading ?? "—"}</DataTableCell>
                <DataTableCell>
                  <Badge variant={m.is_active ? "success" : "secondary"} className="text-[10px]">
                    {m.is_active ? "Active" : "Inactive"}
                  </Badge>
                </DataTableCell>
              </DataTableRow>
            ))
          )}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function ProceduresPage() {
  const { tenantId } = useAuth();

  const { data: procedures = [], isLoading } = useQuery({
    queryKey: ["procedures", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("procedures")
        .select("id, code, name, procedure_type, total_duration, is_active, description")
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
          <DataTableHead className="text-right">Duration (min)</DataTableHead>
          <DataTableHead>Description</DataTableHead>
          <DataTableHead>Active</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {procedures.length === 0 ? (
            <DataTableEmpty message="No procedures found." />
          ) : (
            procedures.map((p) => (
              <DataTableRow key={p.id}>
                <DataTableCell className="font-medium">{p.code}</DataTableCell>
                <DataTableCell>{p.name}</DataTableCell>
                <DataTableCell className="text-muted-foreground capitalize">{p.procedure_type.replace(/_/g, " ")}</DataTableCell>
                <DataTableCell className="text-right text-muted-foreground">{p.total_duration}</DataTableCell>
                <DataTableCell className="max-w-xs truncate text-muted-foreground">{p.description || "—"}</DataTableCell>
                <DataTableCell>
                  <Badge variant={p.is_active ? "success" : "secondary"} className="text-[10px]">
                    {p.is_active ? "Active" : "Inactive"}
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

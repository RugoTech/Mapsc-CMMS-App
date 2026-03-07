import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function PartsPage() {
  const { tenantId } = useAuth();

  const { data: parts = [], isLoading } = useQuery({
    queryKey: ["parts", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parts")
        .select("id, code, name, part_number, quantity, min_quantity, max_quantity, unit_cost, unit_of_measure, location, is_active")
        .eq("is_active", true)
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
          <DataTableHead>Part #</DataTableHead>
          <DataTableHead>Location</DataTableHead>
          <DataTableHead className="text-right">Qty</DataTableHead>
          <DataTableHead className="text-right">Min</DataTableHead>
          <DataTableHead className="text-right">Unit Cost</DataTableHead>
          <DataTableHead>Stock</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {parts.length === 0 ? (
            <DataTableEmpty message="No parts found." colSpan={8} />
          ) : (
            parts.map((p) => {
              const isLow = Number(p.quantity) <= Number(p.min_quantity);
              return (
                <DataTableRow key={p.id}>
                  <DataTableCell className="font-medium">{p.code}</DataTableCell>
                  <DataTableCell>{p.name}</DataTableCell>
                  <DataTableCell className="text-muted-foreground">{p.part_number}</DataTableCell>
                  <DataTableCell className="text-muted-foreground">{p.location || "—"}</DataTableCell>
                  <DataTableCell className="text-right font-medium">
                    {p.quantity} {p.unit_of_measure}
                  </DataTableCell>
                  <DataTableCell className="text-right text-muted-foreground">{p.min_quantity}</DataTableCell>
                  <DataTableCell className="text-right text-muted-foreground">${Number(p.unit_cost).toFixed(2)}</DataTableCell>
                  <DataTableCell>
                    <Badge variant={isLow ? "destructive" : "success"} className="text-[10px]">
                      {isLow ? "Low" : "OK"}
                    </Badge>
                  </DataTableCell>
                </DataTableRow>
              );
            })
          )}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

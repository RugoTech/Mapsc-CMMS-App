import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function AssetsPage() {
  const { tenantId } = useAuth();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("id, code, name, asset_type, status, manufacturer, model, serial_number")
        .eq("is_active", true)
        .order("code")
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const statusVariant = (s: string) => {
    switch (s) {
      case "Operational": return "success" as const;
      case "Down": return "destructive" as const;
      case "Under Maintenance": return "warning" as const;
      default: return "secondary" as const;
    }
  };

  if (isLoading) return <PageLoading />;

  return (
    <div className="space-y-4">
      <DataTable>
        <DataTableHeader>
          <DataTableHead>Code</DataTableHead>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Type</DataTableHead>
          <DataTableHead>Status</DataTableHead>
          <DataTableHead>Manufacturer</DataTableHead>
          <DataTableHead>Model</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {assets.length === 0 ? (
            <DataTableEmpty message="No assets found." />
          ) : (
            assets.map((a) => (
              <DataTableRow key={a.id}>
                <DataTableCell className="font-medium">{a.code}</DataTableCell>
                <DataTableCell>{a.name}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{a.asset_type}</DataTableCell>
                <DataTableCell>
                  <Badge variant={statusVariant(a.status)} className="text-[10px]">
                    {a.status}
                  </Badge>
                </DataTableCell>
                <DataTableCell className="text-muted-foreground">{a.manufacturer || "—"}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{a.model || "—"}</DataTableCell>
              </DataTableRow>
            ))
          )}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

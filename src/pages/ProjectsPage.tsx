import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function ProjectsPage() {
  const { tenantId } = useAuth();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, code, name, status, budget, start_date, end_date, description")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const statusVariant = (s: string) => {
    switch (s) {
      case "Planning": return "info" as const;
      case "InProgress": return "warning" as const;
      case "Completed": return "success" as const;
      case "Cancelled": return "destructive" as const;
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
          <DataTableHead>Status</DataTableHead>
          <DataTableHead className="text-right">Budget</DataTableHead>
          <DataTableHead>Start</DataTableHead>
          <DataTableHead>End</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {projects.length === 0 ? (
            <DataTableEmpty message="No projects found." />
          ) : (
            projects.map((p) => (
              <DataTableRow key={p.id}>
                <DataTableCell className="font-medium">{p.code}</DataTableCell>
                <DataTableCell>{p.name}</DataTableCell>
                <DataTableCell>
                  <Badge variant={statusVariant(p.status)} className="text-[10px]">
                    {p.status}
                  </Badge>
                </DataTableCell>
                <DataTableCell className="text-right text-muted-foreground">${Number(p.budget).toLocaleString()}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{p.start_date || "—"}</DataTableCell>
                <DataTableCell className="text-muted-foreground">{p.end_date || "—"}</DataTableCell>
              </DataTableRow>
            ))
          )}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

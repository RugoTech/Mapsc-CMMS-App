import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/ui/loading";
import { DataTable, DataTableHeader, DataTableHead, DataTableBody, DataTableRow, DataTableCell, DataTableEmpty } from "@/components/ui/data-table";

export default function PMSchedulesPage() {
  const { tenantId } = useAuth();

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ["pm-schedules", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pm_schedules")
        .select("id, code, name, trigger_type, frequency, next_due_date, duration, is_active")
        .order("next_due_date", { ascending: true })
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  if (isLoading) return <PageLoading />;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <DataTable>
        <DataTableHeader>
          <DataTableHead>Code</DataTableHead>
          <DataTableHead>Name</DataTableHead>
          <DataTableHead>Trigger</DataTableHead>
          <DataTableHead>Frequency</DataTableHead>
          <DataTableHead>Next Due</DataTableHead>
          <DataTableHead className="text-right">Duration (min)</DataTableHead>
          <DataTableHead>Active</DataTableHead>
        </DataTableHeader>
        <DataTableBody>
          {schedules.length === 0 ? (
            <DataTableEmpty message="No PM schedules found." colSpan={7} />
          ) : (
            schedules.map((s) => {
              const isOverdue = s.next_due_date && s.next_due_date < today;
              return (
                <DataTableRow key={s.id}>
                  <DataTableCell className="font-medium">{s.code}</DataTableCell>
                  <DataTableCell>{s.name}</DataTableCell>
                  <DataTableCell>
                    <Badge variant="outline" className="capitalize text-[10px]">{s.trigger_type}</Badge>
                  </DataTableCell>
                  <DataTableCell className="text-muted-foreground capitalize">{s.frequency || "—"}</DataTableCell>
                  <DataTableCell>
                    {s.next_due_date ? (
                      <span className={isOverdue ? "font-medium text-destructive" : "text-muted-foreground"}>
                        {s.next_due_date}
                        {isOverdue && " (overdue)"}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </DataTableCell>
                  <DataTableCell className="text-right text-muted-foreground">{s.duration}</DataTableCell>
                  <DataTableCell>
                    <Badge variant={s.is_active ? "success" : "secondary"} className="text-[10px]">
                      {s.is_active ? "Active" : "Inactive"}
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

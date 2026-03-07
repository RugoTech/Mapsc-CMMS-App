import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function PMSchedulesPage() {
  const { tenantId } = useAuth();

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ["pm-schedules", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pm_schedules")
        .select("id, code, name, trigger_type, frequency, next_due_date, is_active")
        .order("next_due_date", { ascending: true })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">PM Schedules</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : schedules.length === 0 ? (
        <p className="text-muted-foreground">No PM schedules found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Trigger</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Frequency</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Next Due</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Active</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{s.code}</td>
                  <td className="px-4 py-3 text-foreground">{s.name}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{s.trigger_type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.frequency || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.next_due_date || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.is_active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

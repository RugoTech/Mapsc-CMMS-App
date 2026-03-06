import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function ProjectsPage() {
  const { tenantId } = useAuth();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, code, name, status, budget, start_date, end_date")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Projects</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Budget</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Start</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">End</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{p.code}</td>
                  <td className="px-4 py-3 text-foreground">{p.name}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{p.status}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">${Number(p.budget).toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.start_date || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.end_date || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

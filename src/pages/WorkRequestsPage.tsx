import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function WorkRequestsPage() {
  const { tenantId } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["work-requests", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_requests")
        .select("id, code, description, status, priority, request_date")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Work Requests</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-muted-foreground">No work requests found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Priority</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((wr) => (
                <tr key={wr.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{wr.code}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-foreground">{wr.description}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{wr.priority}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{wr.status}</td>
                  <td className="px-4 py-3 text-muted-foreground">{wr.request_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

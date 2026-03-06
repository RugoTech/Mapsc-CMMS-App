import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function AssetsPage() {
  const { tenantId } = useAuth();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("id, code, name, asset_type, status, manufacturer, model")
        .eq("is_active", true)
        .order("code")
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Assets</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : assets.length === 0 ? (
        <p className="text-muted-foreground">No assets found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Manufacturer</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{a.code}</td>
                  <td className="px-4 py-3 text-foreground">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.asset_type}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{a.status}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.manufacturer || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

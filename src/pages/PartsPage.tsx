import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function PartsPage() {
  const { tenantId } = useAuth();

  const { data: parts = [], isLoading } = useQuery({
    queryKey: ["parts", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parts")
        .select("id, code, name, part_number, quantity, min_quantity, unit_cost, unit_of_measure")
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
      <h1 className="mb-6 text-2xl font-bold text-foreground">Parts & Inventory</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : parts.length === 0 ? (
        <p className="text-muted-foreground">No parts found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Part #</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Qty</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Min</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Unit Cost</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{p.code}</td>
                  <td className="px-4 py-3 text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.part_number}</td>
                  <td className="px-4 py-3 text-right text-foreground">{p.quantity} {p.unit_of_measure}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{p.min_quantity}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">${Number(p.unit_cost).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

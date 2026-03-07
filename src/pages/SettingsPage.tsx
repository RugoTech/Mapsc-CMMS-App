import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageLoading } from "@/components/ui/loading";
import { Building2, User, Shield, MapPin } from "lucide-react";

export default function SettingsPage() {
  const { profile, roles, tenantId } = useAuth();

  const { data: tenant, isLoading: tenantLoading } = useQuery({
    queryKey: ["tenant-info", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenants")
        .select("name, slug, plan_type, subscription_plan, subscription_start_at, subscription_end_at")
        .eq("id", tenantId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const { data: plants = [] } = useQuery({
    queryKey: ["plants", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plants")
        .select("id, code, name, address, is_active")
        .order("code")
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const { data: zones = [] } = useQuery({
    queryKey: ["zones", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zones")
        .select("id, code, name, is_active")
        .order("code")
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium text-foreground">{profile?.full_name || "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">{profile?.email || "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium text-foreground">{profile?.department || "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job Title</span>
                <span className="font-medium text-foreground">{profile?.job_title || "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium text-foreground">{profile?.phone || "—"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Roles & Access</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <Badge key={r} variant="default" className="capitalize">
                    {r.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No roles assigned.</p>
            )}
          </CardContent>
        </Card>

        {/* Organization Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Organization</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {tenantLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : tenant ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-foreground">{tenant.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge variant="info" className="capitalize">{tenant.plan_type}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscription</span>
                  <span className="capitalize text-foreground">{tenant.subscription_plan}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not assigned to an organization.</p>
            )}
          </CardContent>
        </Card>

        {/* Facility Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Facility Structure</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Plants ({plants.length})</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {plants.map((p) => (
                    <Badge key={p.id} variant={p.is_active ? "outline" : "secondary"} className="text-[10px]">
                      {p.code} — {p.name}
                    </Badge>
                  ))}
                  {plants.length === 0 && <span className="text-muted-foreground">None</span>}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Zones ({zones.length})</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {zones.map((z) => (
                    <Badge key={z.id} variant={z.is_active ? "outline" : "secondary"} className="text-[10px]">
                      {z.code} — {z.name}
                    </Badge>
                  ))}
                  {zones.length === 0 && <span className="text-muted-foreground">None</span>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

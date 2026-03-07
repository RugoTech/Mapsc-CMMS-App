import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/work-orders": "Work Orders",
  "/work-requests": "Work Requests",
  "/assets": "Assets",
  "/meters": "Meters",
  "/procedures": "Procedures",
  "/parts": "Parts & Inventory",
  "/pm-schedules": "PM Schedules",
  "/projects": "Projects",
  "/settings": "Settings",
};

export default function Header() {
  const { profile, roles, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "MAPSC CMMS";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const primaryRole = roles[0]?.replace(/_/g, " ") || "User";

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{pageTitle}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="hidden sm:inline-flex capitalize">
          {primaryRole}
        </Badge>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="hidden text-sm text-foreground sm:inline">{profile?.full_name || profile?.email}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Wrench,
  Package,
  Calendar,
  FolderKanban,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/work-orders", label: "Work Orders", icon: ClipboardList },
  { to: "/work-requests", label: "Work Requests", icon: FileText },
  { to: "/assets", label: "Assets", icon: Wrench },
  { to: "/parts", label: "Parts & Inventory", icon: Package },
  { to: "/pm-schedules", label: "PM Schedules", icon: Calendar },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { profile } = useAuth();

  return (
    <aside className="flex w-60 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <span className="text-lg font-bold text-sidebar-primary">MAPSC CMMS</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      {profile && (
        <div className="border-t border-sidebar-border p-3">
          <p className="truncate text-xs text-sidebar-foreground/70">{profile.email}</p>
        </div>
      )}
    </aside>
  );
}

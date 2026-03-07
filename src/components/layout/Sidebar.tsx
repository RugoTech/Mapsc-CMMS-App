import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Wrench,
  Package,
  Calendar,
  FolderKanban,
  Settings,
  Gauge,
  FileBox,
  Users,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const mainNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/work-orders", label: "Work Orders", icon: ClipboardList },
  { to: "/work-requests", label: "Work Requests", icon: FileText },
];

const assetNav = [
  { to: "/assets", label: "Assets", icon: Wrench },
  { to: "/meters", label: "Meters", icon: Gauge },
  { to: "/procedures", label: "Procedures", icon: FileBox },
];

const inventoryNav = [
  { to: "/parts", label: "Parts & Inventory", icon: Package },
];

const planningNav = [
  { to: "/pm-schedules", label: "PM Schedules", icon: Calendar },
  { to: "/projects", label: "Projects", icon: FolderKanban },
];

const adminNav = [
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavSection({ title, items }: { title: string; items: typeof mainNav }) {
  return (
    <div className="mb-2">
      <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
        {title}
      </p>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </NavLink>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { profile } = useAuth();

  return (
    <aside className="flex w-60 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <span className="text-lg font-bold tracking-tight text-sidebar-primary">MAPSC CMMS</span>
      </div>
      <ScrollArea className="flex-1 px-2 py-3">
        <NavSection title="Overview" items={mainNav} />
        <Separator className="my-2 bg-sidebar-border" />
        <NavSection title="Assets" items={assetNav} />
        <Separator className="my-2 bg-sidebar-border" />
        <NavSection title="Inventory" items={inventoryNav} />
        <Separator className="my-2 bg-sidebar-border" />
        <NavSection title="Planning" items={planningNav} />
        <Separator className="my-2 bg-sidebar-border" />
        <NavSection title="Admin" items={adminNav} />
      </ScrollArea>
      {profile && (
        <div className="border-t border-sidebar-border p-3">
          <p className="truncate text-xs font-medium text-sidebar-foreground/90">{profile.full_name || "User"}</p>
          <p className="truncate text-[10px] text-sidebar-foreground/50">{profile.email}</p>
        </div>
      )}
    </aside>
  );
}

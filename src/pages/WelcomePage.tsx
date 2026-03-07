import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, ClipboardList, Package, Calendar } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <Wrench className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">MAPSC CMMS</h1>
        <p className="mt-3 text-lg text-muted-foreground">Enterprise Maintenance Management System</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ClipboardList className="h-4 w-4 text-primary" />
            Work Orders
          </div>
          <div className="flex items-center gap-1.5">
            <Wrench className="h-4 w-4 text-primary" />
            Asset Management
          </div>
          <div className="flex items-center gap-1.5">
            <Package className="h-4 w-4 text-primary" />
            Inventory Control
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            Preventive Maintenance
          </div>
        </div>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

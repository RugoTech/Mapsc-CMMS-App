import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">MAPSC CMMS</h1>
        <p className="mt-3 text-lg text-muted-foreground">Enterprise Maintenance Management System</p>
        <div className="mt-8">
          <Link
            to="/login"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

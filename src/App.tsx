import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import AppLayout from "@/components/layout/AppLayout";
import WorkOrdersPage from "@/pages/WorkOrdersPage";
import WorkRequestsPage from "@/pages/WorkRequestsPage";
import AssetsPage from "@/pages/AssetsPage";
import PartsPage from "@/pages/PartsPage";
import PMSchedulesPage from "@/pages/PMSchedulesPage";
import ProjectsPage from "@/pages/ProjectsPage";
import SettingsPage from "@/pages/SettingsPage";
import WelcomePage from "@/pages/WelcomePage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <WelcomePage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/work-orders" element={<WorkOrdersPage />} />
                <Route path="/work-requests" element={<WorkRequestsPage />} />
                <Route path="/assets" element={<AssetsPage />} />
                <Route path="/parts" element={<PartsPage />} />
                <Route path="/pm-schedules" element={<PMSchedulesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

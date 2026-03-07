import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{profile?.full_name || profile?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

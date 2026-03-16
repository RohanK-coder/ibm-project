import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, UserCircle2, Briefcase } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h1 className="text-xl font-bold">PathForge AI</h1>
          </div>

          <nav className="flex items-center gap-3">
            <Link to="/courses" className="text-sm font-medium hover:underline">
              Courses
            </Link>
            <Link to="/career" className="text-sm font-medium hover:underline">
              Career Helper
            </Link>
            {user?.role === "professor" && (
              <Link
                to="/professor"
                className="text-sm font-medium hover:underline"
              >
                Professor
              </Link>
            )}
            {user && (
              <div className="ml-4 flex items-center gap-2">
                <UserCircle2 className="h-5 w-5" />
                <span className="text-sm">{user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
            {!user && (
              <Button asChild>
                <Link to="/login">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
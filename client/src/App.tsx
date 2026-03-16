import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import CareerHelperPage from "./pages/CareerHelperPage";
import CoursesPage from "./pages/CoursesPage";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import CreateGroupPage from "./pages/CreateGroupPage";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";

function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();

  return (
    <AppShell>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "professor" ? (
                <Navigate to="/professor" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["student", "admin"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/career"
          element={
            <ProtectedRoute>
              <CareerHelperPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor"
          element={
            <ProtectedRoute roles={["professor", "admin"]}>
              <ProfessorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/groups/new"
          element={
            <ProtectedRoute roles={["professor", "admin"]}>
              <CreateGroupPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppShell>
  );
}
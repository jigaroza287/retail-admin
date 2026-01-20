import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { UserRole } from "../types/user";

interface Props {
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

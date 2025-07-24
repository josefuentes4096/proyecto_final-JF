// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (requireAdmin && user !== "admin") return <Navigate to="/" />;

  return children;
}

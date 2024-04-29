import { LoggedInLayout } from "../../layouts";
import { useAuthStore } from "../../store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <LoggedInLayout>
      <Outlet />
    </LoggedInLayout>
  );
}

export { ProtectedRoute };

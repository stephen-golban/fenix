import React from "react";

import { useAuthStore } from "../../store";
import { Navigate, useLocation } from "react-router-dom";

import "./index.css";

const LoggedOutLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/categorii" state={{ from: location }} replace />;
  }
  return (
    <div className="layout">
      <h1>Fenix Admin</h1>
      {children}
    </div>
  );
};

export { LoggedOutLayout };

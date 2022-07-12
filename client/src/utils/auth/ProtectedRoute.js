import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // Here check if the profile is completed
  // If is completed -> go to dashboard
  // If is not completed -> go to register-profile
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

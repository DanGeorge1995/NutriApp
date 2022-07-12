import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children ? children : <Outlet />;
};

export default PublicRoute;

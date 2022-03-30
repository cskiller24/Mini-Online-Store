import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminGuard = () => {
  const location = useLocation();
  const { user, token } = useAuth();

  return (
    <>
      {user.is_admin && token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AdminGuard;

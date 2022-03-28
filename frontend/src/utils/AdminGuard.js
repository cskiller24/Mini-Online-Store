import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminGuard = () => {
  const location = useLocation();
  const { state } = useAuth();
  const user = state.user;
  return (
    <>
      {user.is_admin === true ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AdminGuard;

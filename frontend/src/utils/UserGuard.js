import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserGuard = () => {
  const location = useLocation();
  const { user, token } = useAuth();
  return (
    <>
      {!user.is_admin && token ? (
        <Outlet />
      ) : (
        <Navigate to="/admin" state={{ from: location }} replace />
      )}
    </>
  );
};

export default UserGuard;

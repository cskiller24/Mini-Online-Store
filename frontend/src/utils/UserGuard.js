import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserGuard = () => {
  const location = useLocation();
  const { getUser } = useAuth();
  const user = getUser;
  return (
    <>
      {user?.is_admin === false ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default UserGuard;

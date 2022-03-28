import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Guest = () => {
  const location = useLocation;
  const { state } = useAuth();
  return (
    <>
      {!state.token ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default Guest;

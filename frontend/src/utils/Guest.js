import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Guest = () => {
  const { token, user } = useAuth();
  return <>{!token || !user ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default Guest;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiresAuth = () => {
  const { token, user } = useAuth();
  return <>{token && user ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default RequiresAuth;

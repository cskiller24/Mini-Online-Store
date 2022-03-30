import React from "react";
import useAuth from "../hooks/useAuth";

const Context = () => {
  const { user, token } = useAuth();
  return <div>{token && user ? "true" : "false"}</div>;
};

export default Context;

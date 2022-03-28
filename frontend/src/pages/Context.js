import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import UserContext, { UserProvider } from "../contexts/UserContext";

const Context = () => {
  const { user, setUser } = useContext(AuthContext);
  const { test } = useContext(UserContext);
  const userSet = (name) => {
    setUser(name);
  };
  return (
    <UserProvider>
      <input type="text" onChange={(e) => setUser(e.target.value)}></input>
      {user}
      {test}
    </UserProvider>
  );
};

export default Context;

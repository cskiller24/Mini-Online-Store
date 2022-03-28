import { createContext, useReducer, useState } from "react";
import { authReducer, authActions } from "../reducer/authReducer";

const AuthContext = createContext();

// const user = {
//   id: "",
//   name: "",
//   email: "",
//   address: "",
//   contact_number: "",
//   is_admin: false,
// };

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  const login = (user) => {
    const data = {
      email: user.email,
      password: user.password,
    };
    dispatch({ type: authActions.LOGIN, payload: data });
  };

  const register = (user) => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      address: user.address,
      contact_number: user.contact_number,
    };
    dispatch({ type: authActions.REGISTER, payload: data });
  };

  const logout = () => {
    dispatch({ type: authActions.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

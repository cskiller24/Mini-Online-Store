import { createContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiLogin, apiRegister, apiLogout } from "../api/guest/guestApi";
import { token as API_TOKEN } from "../utils/constants";

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
  const location = useLocation();

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem(API_TOKEN));

  const [message, setMessage] = useState(null);

  const login = (user) => {
    const data = {
      email: user.email,
      password: user.password,
    };

    const response = apiLogin(data);
    if (response.status === false) {
      setMessage(response.data);
      return { status: response.status, data: response.data };
    }
    if (response.status === true) {
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem(API_TOKEN, response.data.token);
      <Navigate to="/" state={{ from: location }} replace />;
    }
  };

  const register = async (user) => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      address: user.address,
      contact_number: user.contact_number,
    };

    const response = await apiRegister(data);

    if (response?.status === false) {
      setMessage(response.data);
      return response;
    }
    if (response?.status === true) {
      <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

  const logout = () => {
    apiLogout();
  };

  return (
    <AuthContext.Provider
      value={{ token, user, message, setMessage, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

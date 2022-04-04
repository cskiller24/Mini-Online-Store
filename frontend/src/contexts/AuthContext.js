import { createContext, useState } from "react";
import { apiLogin, apiRegister, apiLogout } from "../api/guest/guestApi";
import { TOKEN as API_TOKEN, USER } from "../utils/constants";

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
  const [user, setUser] = useState(() =>
    localStorage.getItem(USER) !== "undefined"
      ? JSON.parse(localStorage.getItem(USER))
      : null
  );
  const [token, setToken] = useState(localStorage.getItem(API_TOKEN) ?? null);

  const login = async (data) => {
    const response = await apiLogin(data);
    if (response.status === true) {
      setToken(response?.data.token);
      setUser(response?.data.user);
      localStorage.setItem(USER, JSON.stringify(response.data.user));
      localStorage.setItem(API_TOKEN, response.data.token);
    }
    return response;
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
    return response;
  };

  const logout = async () => {
    const response = await apiLogout();
    if (response.status === true) {
      localStorage.removeItem(USER);
      localStorage.removeItem(API_TOKEN);
      setUser(null);
      setToken(null);
    }
    return response;
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

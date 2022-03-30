import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequiresAuth from "./utils/RequiresAuth";
import UserGuard from "./utils/UserGuard";
import AdminGuard from "./utils/AdminGuard";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Guest from "./utils/Guest";
import Login from "./pages/Guest/Login";
import Register from "./pages/Guest/Register";
import Context from "./pages/Context";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Guest />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<UserGuard />}>
            <Route path="" element={<User />} />
          </Route>
          <Route path="/admin" element={<AdminGuard />}>
            <Route path="" element={<Admin />} />
          </Route>
        </Route>
        <Route path="/debug" element={<Context />} />
      </Routes>
    </AuthProvider>
  );
};
export default App;

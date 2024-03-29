import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequiresAuth from "./utils/RequiresAuth";
import UserGuard from "./utils/UserGuard";
import AdminHome from "./pages/Admin/AdminHome";
import AdminGuard from "./utils/AdminGuard";
import Guest from "./utils/Guest";
import Login from "./pages/Guest/Login";
import Register from "./pages/Guest/Register";
import Logout from "./pages/Logout";
import { StoreProvider } from "./contexts/StoreContext";
import UserHome from "./pages/User/UserHome";
import UserCarts from "./pages/User/UserCarts";
import UserCheckout from "./pages/User/UserCheckout";
import UserTransactions from "./pages/User/UserTransactions";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminTransactions from "./pages/Admin/AdminTransactions";
import AdminRestock from "./pages/Admin/AdminRestock";

const App = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <Routes>
          <Route element={<Guest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<RequiresAuth />}>
            <Route path="/" element={<UserGuard />}>
              <Route path="" element={<UserHome />} />
              <Route path="carts" element={<UserCarts />} />
              <Route path="checkout" element={<UserCheckout />} />
              <Route path="transactions" element={<UserTransactions />} />
            </Route>
            <Route path="/admin" element={<AdminGuard />}>
              <Route path="" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="restock" element={<AdminRestock />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </StoreProvider>
    </AuthProvider>
  );
};
export default App;

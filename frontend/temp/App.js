
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
import UserTransactions from "./pages/User/UserTransactions";
import { Products as TestProducts } from "./test/Products";
import { Carts as TestCarts } from "./test/Carts";
import { Transactions as TestTransactions } from "./test/Transactions";
import UserCheckout from "./pages/User/UserCheckout";
import UserLayout from "./pages/layouts/UserLayout";
import AdminLayout from "./pages/layouts/AdminLayout";
import UserHome from "./pages/User/UserHome";
import UserCarts from "./pages/User/UserCarts";
import AdminHome from "./pages/Admin/AdminHome";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminTransactions from "./pages/Admin/AdminTransactions";
import AdminRestock from "./pages/Admin/AdminRestock";
import NotFound from "./pages/NotFound";

function App() {
  const addToCart = (product) => {
    const cart = carts.find((cart) => cart.name === product.name);
    if (cart) {
      updateQuantity(cart.id, 1);
      return;
    }
    const id = Math.floor(Math.random() * 1000) + 1;
    const addProduct = { ...product, id: id, quantity: 1 };
    setCart([...carts, addProduct]);
  };

  const updateQuantity = (id, method) => {
    if (method === 1) {
      // Add Quantity
      let newCart = carts.map((cart) =>
        cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
      );
      setCart(newCart);
      return;
    }
    if (method === 0) {
      // Decrease Quantity
      let newCart = carts.map((cart) =>
        cart.id === id && cart.quantity > 0
          ? { ...cart, quantity: cart.quantity - 1 }
          : cart
      );

      newCart = newCart.filter((cart) => cart.quantity > 0);
      setCart(newCart);
      return;
    }
  };

  const addProduct = (product) => {
    const newProduct = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    };

    setProducts([...products, newProduct]);
  };

  const editProduct = (id, product) => {
    const newEditProduct = products.map((existing) =>
      existing.id === id
        ? {
            ...existing,
            name: product.name,
            description: product.description,
            price: product.price,
            //image: product.image, TODO
          }
        : existing
    );
    setProducts(newEditProduct);
  };

  const addStock = (id, stock) => {
    const addStock = products.map((product) =>
      product.id === id
        ? { ...product, quantity: parseInt(product.quantity) + parseInt(stock) }
        : product
    );

    setProducts(addStock);
  };

  const updateStatus = (id, status) => {
    const updateTransaction = transactions.map((transaction) =>
      transaction.id === id ? { ...transaction, status: status } : transaction
    );
    setTransactions(updateTransaction);
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setCart([]);
  };

  const cancelTransaction = (id) => {
    const updatedTransaction = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: "Cancelled" }
        : transaction
    );
    setTransactions(updatedTransaction);
  };

  const [products, setProducts] = useState(TestProducts);

  const [carts, setCart] = useState(TestCarts);

  const [transactions, setTransactions] = useState(TestTransactions);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<UserLayout />}>
        <Route
          path=""
          element={<UserHome products={products} addToCart={addToCart} />}
        />
        <Route
          path="/transactions"
          element={
            <UserTransactions
              transactions={transactions}
              cancelTransaction={cancelTransaction}
            />
          }
        />
        <Route
          path="/carts"
          element={<UserCarts carts={carts} updateQuantity={updateQuantity} />}
        />
        <Route
          path="/checkout"
          element={
            <UserCheckout checkout={carts} addTransaction={addTransaction} />
          }
        />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<AdminHome />} />
        <Route
          path="products"
          element={
            <AdminProducts
              products={products}
              addProduct={addProduct}
              editProduct={editProduct}
            />
          }
        />
        <Route
          path="transactions"
          element={
            <AdminTransactions
              transactions={transactions}
              updateStatus={updateStatus}
            />
          }
        />
        <Route
          path="restock"
          element={<AdminRestock products={products} addStock={addStock} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

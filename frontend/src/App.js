import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Register from "./views/Auth/Register";
import NotFound from "./views/NotFound";
import Login from "./views/Auth/Login";
import User from "./views/layouts/User";
import Admin from "./views/layouts/Admin";
import { useEffect, useState } from "react";
import Carts from "./views/Carts";
import Dashboard from "./views/admin/Dashboard";
import Products from "./views/admin/Products";
import Transactions from "./views/admin/Transactions";
import Restock from "./views/admin/Restock";
import { Products as TestProducts } from "./test/Products";
import { Carts as TestCarts } from "./test/Carts";

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
            image: product.image,
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

  const [products, setProducts] = useState(TestProducts);

  const [carts, setCart] = useState(TestCarts);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    carts.map((cart) => (newTotal += cart.price * cart.quantity));
    setTotal(newTotal);
  }, [carts]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<User />}>
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <Carts
              carts={carts}
              total={total}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<Dashboard />} />
        <Route
          path="products"
          element={
            <Products
              products={products}
              addProduct={addProduct}
              editProduct={editProduct}
            />
          }
        />
        <Route path="transactions" element={<Transactions />} />
        <Route
          path="restock"
          element={<Restock products={products} addStock={addStock} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

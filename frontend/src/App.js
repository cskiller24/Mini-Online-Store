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
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "This product",
      description: "This is a description for a product 1",
      image: "https://picsum.photos/1000/200",
      quantity: 10,
      price: 20,
    },
    {
      id: "2",
      name: "This product 2",
      description: "This is a description for a product 2",
      image: "https://picsum.photos/200",
      quantity: 20,
      price: 40,
    },
    {
      id: "3",
      name: "This product 3",
      description: "This is a description for a product 3",
      image: "https://picsum.photos/200",
      quantity: 20,
      price: 1000,
    },
    {
      id: "4",
      name: "This product 3",
      description: "This is a description for a product 3",
      image: "https://picsum.photos/200",
      quantity: 20,
      price: 1000,
    },
    {
      id: "5",
      name: "This product 3",
      description: "This is a description for a product 3",
      image: "https://picsum.photos/200",
      quantity: 20,
      price: 1000,
    },
  ]);

  const [carts, setCart] = useState([
    {
      id: 1,
      name: "product 1",
      image: "https://picsum.photos/200",
      quantity: 4,
      price: 1000,
    },
    {
      id: 2,
      name: "product 1",
      image: "https://picsum.photos/200",
      quantity: 4,
      price: 1000,
    },
    {
      id: 3,
      name: "product 1",
      image: "https://picsum.photos/200",
      quantity: 4,
      price: 1000,
    },
    {
      id: 4,
      name: "product 1",
      image: "https://picsum.photos/200",
      quantity: 4,
      price: 1000,
    },
    {
      id: 5,
      name: "product 1",
      image: "https://picsum.photos/200",
      quantity: 4,
      price: 1000,
    },
    // {
    //   id: 6,
    //   name: "product 1",
    //   image: "https://picsum.photos/200",
    //   quantity: 4,
    //   price: 1000,
    // },
    // {
    //   id: 7,
    //   name: "product 1",
    //   image: "https://picsum.photos/200",
    //   quantity: 4,
    //   price: 1000,
    // },
    // {
    //   id: 8,
    //   name: "product 1",
    //   image: "https://picsum.photos/200",
    //   quantity: 4,
    //   price: 1000,
    // },
    // {
    //   id: 9,
    //   name: "product 1",
    //   image: "https://picsum.photos/200",
    //   quantity: 4,
    //   price: 1000,
    // },
    // {
    //   id: 10,
    //   name: "product 1",
    //   image: "https://picsum.photos/200",
    //   quantity: 4,
    //   price: 1000,
    // },
  ]);

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
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

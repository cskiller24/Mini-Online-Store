import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Register from "./views/Auth/Register";
import NotFound from "./views/NotFound";
import Login from "./views/Auth/Login";
import User from "./views/layouts/User";
import Admin from "./views/layouts/Admin";
import { useState } from "react";
import Carts from "./views/Carts";

function App() {
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
  ]);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<User />}>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Carts carts={carts} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";

const Admin = () => {
  const { products } = useStore();
  console.log(products);
  return (
    <div>
      Admin<Link to="/logout">Logout</Link>
    </div>
  );
};

export default Admin;

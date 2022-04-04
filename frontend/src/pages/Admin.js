import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      Admin<Link to="/logout">Logout</Link>
    </div>
  );
};

export default Admin;

import React from "react";
import useAuth from "../hooks/useAuth";
import { TOKEN as API_TOKEN, USER } from "../utils/constants";
import {Link} from "react-router-dom";

const User = () => {
  const { user } = useAuth();
  return <div>User<Link to="/logout">Logout</Link></div>;
};

export default User;

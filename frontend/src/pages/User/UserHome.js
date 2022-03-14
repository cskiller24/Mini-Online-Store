import { Box } from "@mui/material";
import React from "react";
import UserProduct from "./components/UserProduct";

const UserHome = ({ products, addToCart }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {products.map((product) => (
        <UserProduct key={product.id} product={product} addToCart={addToCart} />
      ))}
    </Box>
  );
};

export default UserHome;

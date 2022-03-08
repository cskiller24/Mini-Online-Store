import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Cart from "../components/Cart";

const Carts = ({ carts }) => {
  const [total, setTotal] = useState(1000);
  function addTotal(price, quantity) {
    let newTotal = total + price * quantity;
    console.log(newTotal);
    setTotal(newTotal);
  }
  return (
    <Box>
      <Typography component="h1" variant="h2" textAlign="center">
        {total}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {carts.map((cart) => (
          <Cart cart={cart} key={cart.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Carts;

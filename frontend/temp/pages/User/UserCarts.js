import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserCart from "./components/UserCart";

const UserCarts = ({ carts, updateQuantity }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    carts.map((cart) => (newTotal += cart.price * cart.quantity));
    setTotal(newTotal);
  }, [carts]);

  return (
    <Box>
      <Link to="/checkout">
        <Button variant="contained" fullWidth sx={{ my: 3 }}>
          CheckOut {total}
        </Button>
      </Link>
      {carts && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {carts.map((cart) => (
            <UserCart cart={cart} key={cart.id} updateCart={updateQuantity} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserCarts;

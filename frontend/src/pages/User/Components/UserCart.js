import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import useStore from "../../../hooks/useStore";

const UserCart = ({ cart, setIsCartAlertOpen }) => {
  const { insert_cart, decrease_cart } = useStore();
  const addToCart = async (id, cart) => {
    await insert_cart(id, cart);
    setIsCartAlertOpen({ state: true, message: "Successfully Added to Cart" });
  };
  const decreaseToCart = async (id, cart) => {
    await decrease_cart(id, cart);
    setIsCartAlertOpen({ state: true, message: "Successfully Decrease Cart" });
  };
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "0.5rem",
        mx: 1.5,
        width: "250px",
        height: "350px",
        mt: 1.5,
      }}
    >
      <img
        src={cart.image}
        alt="test2"
        style={{ maxWidth: "100%", height: "250px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 0.2 }}>
        <Typography component="h1" variant="h6" fontWeight="300">
          {cart.name}
        </Typography>
        <Typography component="h1" variant="h6" fontWeight="bold">
          {cart.price}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => {
              decreaseToCart(cart.id, cart);
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button disabled>{cart.quantity}</Button>
          <Button
            onClick={() => {
              addToCart(cart.id, cart);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default UserCart;

import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import useStore from "../../../hooks/useStore";

const UserProduct = ({ product, setIsCartAlertOpen }) => {
  const { id, name, price, image, slug } = product;
  const { insert_cart } = useStore();
  const addToCart = async (id, product) => {
    await insert_cart(id, product);
    setIsCartAlertOpen({ state: true, message: "Successfully Added to Carts" });
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
        src={image}
        alt="test2"
        style={{ maxWidth: "100%", height: "250px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 0.2 }}>
        <Typography component="h1" variant="h6" fontWeight="300">
          {name}
        </Typography>
        <Typography component="h1" variant="h6" fontWeight="bold">
          {price}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`product/${slug}`}>
          <Button variant="contained">View</Button>
        </Link>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={() => {
            addToCart(id, product);
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Paper>
  );
};

export default UserProduct;

import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const UserProduct = ({ product, addToCart }) => {
  return (
    <div>
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
          src={product.image}
          alt="test2"
          style={{ maxWidth: "100%", height: "250px" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 0.2 }}>
          <Typography component="h1" variant="h6" fontWeight="300">
            {product.name}
          </Typography>
          <Typography component="h1" variant="h6" fontWeight="bold">
            {product.price}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="">
            <Button variant="contained">View</Button>
          </Link>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default UserProduct;

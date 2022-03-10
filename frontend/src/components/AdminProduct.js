import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import EditProductModal from "./EditProductModal";

const AdminProduct = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Paper
      sx={{
        padding: "0.5rem",
        mx: 1,
        width: "250px",
        mt: 1.5,
      }}
      elevation={6}
    >
      <img
        src={product.image}
        alt="test2"
        style={{ maxWidth: "100%", height: "250px" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component="h1"
          variant="h6"
          textAlign="center"
          fontWeight="bold"
        >
          {product.name}
        </Typography>
        <Typography component="h1" variant="h6" textAlign="center">
          ${product.price}
        </Typography>
        <Button variant="outlined" onClick={() => setModalOpen(true)}>
          Edit Product
        </Button>
        <EditProductModal
          product={product}
          open={modalOpen}
          toggleOpen={() => setModalOpen(!modalOpen)}
        />
      </Box>
    </Paper>
  );
};

export default AdminProduct;

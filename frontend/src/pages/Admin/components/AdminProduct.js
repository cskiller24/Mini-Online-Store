import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AdminDeleteProductModal from "./AdminDeleteProductModal";
import AdminEditProductModal from "./AdminEditProductModal";

const AdminProduct = ({ product, setMessageAlert }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
        <Button
          variant="outlined"
          color="error"
          onClick={() => setDeleteModalOpen(true)}
          sx={{ mt: 1 }}
        >
          Delete Product
        </Button>
        <AdminEditProductModal
          product={product}
          open={modalOpen}
          toggleOpen={() => setModalOpen(!modalOpen)}
          setMessageAlert={setMessageAlert}
        />
        <AdminDeleteProductModal
          open={deleteModalOpen}
          toggleOpen={setDeleteModalOpen}
          setMessageAlert={setMessageAlert}
          id={product.id}
        />
      </Box>
    </Paper>
  );
};

export default AdminProduct;

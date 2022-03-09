import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import ProductModal from "../../components/ProductModal";

const Products = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        sx={{
          display: "block",
          width: "100%",
          backgroundColor: "secondary",
          mb: 4,
        }}
        onClick={() => setOpen(true)}
      >
        Add Product
      </Button>
      <ProductModal open={open} toggleOpen={() => setOpen(!open)} />
      <Box
        sx={{
          display: "flex",
          flexFlow: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Paper>TEST</Paper>
        <Paper>TEST</Paper>
        <Paper>TEST</Paper>
        <Paper>TEST</Paper>
        <Paper>TEST</Paper>
        <Paper>TEST</Paper>
      </Box>
    </>
  );
};

export default Products;

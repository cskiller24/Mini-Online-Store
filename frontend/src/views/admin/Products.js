import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AdminProduct from "../../components/AdminProduct";
import ProductModal from "../../components/ProductModal";

const Products = ({ products }) => {
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
      <ProductModal open={open} toggleOpen={() => setOpen(false)} />
      <Box
        sx={{
          display: "flex",
          flexFlow: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((product) => (
          <AdminProduct product={product} key={product.id} />
        ))}
      </Box>
    </>
  );
};

export default Products;

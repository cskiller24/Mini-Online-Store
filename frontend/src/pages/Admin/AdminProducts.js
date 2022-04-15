import Close from "@mui/icons-material/Close";
import { Alert, Box, Button, Collapse, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import AdminProduct from "./components/AdminProduct";
import AdminProductModal from "./components/AdminProductModal";

const AdminProducts = () => {
  const { products, fetch_products } = useStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messageAlert, setMessageAlert] = useState({
    state: false,
    message: "",
  });
  useEffect(() => {
    const index = async () => {
      if (products.length <= 0) {
        await fetch_products();
      }
      setIsLoading(false);
    };
    index();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Collapse in={messageAlert.state}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMessageAlert({
                  state: false,
                  message: "",
                });
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
        >
          {messageAlert.message}
        </Alert>
      </Collapse>
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
      <AdminProductModal
        open={open}
        toggleOpen={() => setOpen(false)}
        setMessageAlert={setMessageAlert}
      />
      <Box
        sx={{
          display: "flex",
          flexFlow: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((product) => (
          <AdminProduct
            product={product}
            key={product.id}
            setMessageAlert={setMessageAlert}
          />
        ))}
      </Box>
    </>
  );
};

export default AdminProducts;

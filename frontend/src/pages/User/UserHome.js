import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import UserProduct from "./Components/UserProduct";

const UserHome = () => {
  const { products, fetch_products } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isCartAlertOpen, setIsCartAlertOpen] = useState(false);
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
      <Collapse in={isCartAlertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsCartAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2 }}
        >
          Successfully Added to Carts
        </Alert>
      </Collapse>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {products?.map((product) => (
          <UserProduct
            key={product.id}
            product={product}
            setIsCartAlertOpen={setIsCartAlertOpen}
          />
        ))}
      </Box>
    </>
  );
};

export default UserHome;

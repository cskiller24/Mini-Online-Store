import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import UserProduct from "./Components/UserProduct";
import { useLocation } from "react-router-dom";

const UserHome = () => {
  const { state } = useLocation();
  const { products, fetch_products } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState({
    state: false,
    message: "Successfully Added to Cart",
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

  useEffect(() => {
    if (state?.message) {
      setIsAlertOpen({
        state: true,
        message: state.message,
      });
      state.message = "";
    }
  }, [state]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Collapse in={isAlertOpen.state}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsAlertOpen({
                  state: false,
                  message: "",
                });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2 }}
        >
          {isAlertOpen.message}
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
            setIsCartAlertOpen={setIsAlertOpen}
          />
        ))}
      </Box>
    </>
  );
};

export default UserHome;

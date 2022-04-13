import { Alert, Button, Collapse, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import UserCart from "./Components/UserCart";
import Close from "@mui/icons-material/Close";

const UserCarts = () => {
  const { fetch_carts, carts } = useStore();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartAlertOpen, setIsCartAlertOpen] = useState({
    state: false,
    message: "Successfully Added to Cart",
  });

  useEffect(() => {
    const index = async () => {
      if (carts.length <= 0) {
        await fetch_carts();
      }
      setIsLoading(false);
    };
    index();
  }, []);

  useEffect(() => {
    let newTotal = 0;
    carts.map((cart) => (newTotal += cart.price * cart.quantity));
    setTotal(newTotal);
  }, [carts]);

  if (isLoading) {
    return <Loading />;
  }

  if (carts.length <= 0 && !isLoading) {
    return (
      <Typography variant="h2" sx={{ mt: 3, textAlign: "center" }}>
        No Carts
      </Typography>
    );
  }

  return (
    <Box>
      <Collapse in={isCartAlertOpen.state}>
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
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2 }}
        >
          {isCartAlertOpen.message}
        </Alert>
      </Collapse>
      <Link to="/checkout">
        <Button variant="contained" fullWidth sx={{ my: 3 }}>
          CheckOut {total}
        </Button>
      </Link>
      {carts && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {carts.map((cart) => (
            <UserCart
              cart={cart}
              key={cart.id}
              setIsCartAlertOpen={setIsCartAlertOpen}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserCarts;

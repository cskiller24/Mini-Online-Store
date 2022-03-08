import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Cart from "../components/Cart";

const Carts = ({ carts, total, updateQuantity }) => {
  return (
    <Box>
      <Typography component="h1" variant="h2" textAlign="center">
        {total}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {carts.map((cart) => (
          <Cart cart={cart} key={cart.id} updateCart={updateQuantity} />
        ))}
      </Box>
    </Box>
  );
};

export default Carts;

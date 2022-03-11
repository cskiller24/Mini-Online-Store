import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";

const Carts = ({ carts, total, updateQuantity }) => {
  return (
    <Box>
      <Link to="/checkout">
        <Button variant="contained" fullWidth sx={{ mt: 3 }}>
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
            <Cart cart={cart} key={cart.id} updateCart={updateQuantity} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Carts;

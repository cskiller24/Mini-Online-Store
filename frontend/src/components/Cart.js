import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = ({ cart, updateCart }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "0.5rem",
        mx: 1.5,
        width: "250px",
        height: "350px",
        mt: 1.5,
      }}
    >
      <img
        src={cart.image}
        alt="test2"
        style={{ maxWidth: "100%", height: "250px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 0.2 }}>
        <Typography component="h1" variant="h6" fontWeight="300">
          {cart.name}
        </Typography>
        <Typography component="h1" variant="h6" fontWeight="bold">
          {cart.price}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => {
              updateCart(cart.id, 0);
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button disabled>{cart.quantity}</Button>
          <Button
            onClick={() => {
              updateCart(cart.id, 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default Cart;

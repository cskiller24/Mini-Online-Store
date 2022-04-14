import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

const UserCheckout = () => {
  const navigate = useNavigate();
  const { user, create_transaction } = useStore();
  // console.log(user);
  const { name, address, contact_number } = user;
  const [fieldName, setFieldName] = useState(
    name.replace(/([A-Z])/g, " $1").trim()
  );
  const [fieldAddress, setFieldAddress] = useState(address);
  const [fieldContactNumber, setFieldContactNumber] = useState(contact_number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: fieldName,
      address: fieldAddress,
      contact_number: fieldContactNumber,
    };
    await create_transaction(data);
    navigate("/", {
      state: { message: "Successfully Checked Out" },
      replace: true,
    });
  };
  return (
    <>
      <Typography variant="h2" textAlign="center" mt={3}>
        Checkout
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              value={fieldName}
              onChange={(e) => setFieldName(e.value.target)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contact Number"
              type="tel"
              value={fieldContactNumber}
              onChange={(e) => setFieldContactNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Address"
              type="tel"
              value={fieldAddress}
              onChange={(e) => setFieldAddress(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserCheckout;

import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import React from "react";

const CheckOut = ({ checkout, addTransaction }) => {
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const transaction = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: data.get("name"),
      contact_number: data.get("contact_number"),
      address: data.get("address"),
      status: "Pending",
      products: [...checkout],
    };
    addTransaction(transaction);
    navigate("/");
  };

  return (
    <>
      {checkout === [] ||
      checkout === null ||
      checkout === undefined ||
      checkout.length <= 0 ? (
        <Typography variant="h2" textAlign="center" sx={{ mt: 3 }}>
          Empty Cart
        </Typography>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Paper elevation={6} sx={{ p: 2, width: "65%" }}>
            <Typography variant="h4" textAlign="center">
              Checkout
            </Typography>
            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    size="small"
                    name="name"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Contact #"
                    type="text"
                    name="contact_number"
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    type="text"
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default CheckOut;

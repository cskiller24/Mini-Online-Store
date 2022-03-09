import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React from "react";

const Dashboard = () => {
  const dashboard_test = [0, 1, 2, 3];
  return (
    <Grid component="main" container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{
            height: "75vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper
            sx={{
              mb: "0.5rem",
              height: 225,
              padding: "1rem",
              display: "flex",
              alignItems: "center",
            }}
            elevation={4}
          >
            <PersonIcon sx={{ fontSize: "50px" }} />
            <Typography
              component="h4"
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              25 Users
            </Typography>
          </Paper>
          <Paper
            sx={{
              mb: "0.5rem",
              height: 225,
              padding: "1rem",
              display: "flex",
              alignItems: "center",
            }}
            elevation={4}
          >
            <ShoppingBagIcon sx={{ fontSize: "50px" }} />
            <Typography
              component="h4"
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              25 Products
            </Typography>
          </Paper>
          <Paper
            sx={{
              mb: "0.5rem",
              height: 225,
              padding: "1rem",
              display: "flex",
              alignItems: "center",
            }}
            elevation={4}
          >
            <ThumbUpIcon sx={{ fontSize: "50px" }} />
            <Typography
              component="h4"
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              25 Transactions
            </Typography>
          </Paper>
          <Paper
            sx={{
              mb: "0.5rem",
              height: 225,
              padding: "1rem",
              display: "flex",
              alignItems: "center",
            }}
            elevation={4}
          >
            <AttachMoneyIcon sx={{ fontSize: "50px" }} />
            <Typography
              component="h4"
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              Product Z
            </Typography>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={8} sx={{ height: 100 }}>
        <Paper
          sx={{
            height: "75vh",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          elevation={4}
        >
          <Typography component="h1" variant="h3" textAlign="center">
            Chart Does Not Exist
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

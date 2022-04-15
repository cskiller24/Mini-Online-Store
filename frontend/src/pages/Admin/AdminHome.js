import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const { fetch_admin, adminData } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const index = async () => {
      if (!adminData) {
        await fetch_admin();
      }
      setIsLoading(false);
    };
    index();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
              {adminData.userCount} Users
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
              {adminData.productCount} Products
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
              {adminData.transactionCount} Transactions
            </Typography>
          </Paper>
          <Paper
            sx={{
              mb: "0.5rem",
              height: 225,
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            elevation={4}
            onClick={() => navigate(`/${adminData.topProduct.product.slug}`)}
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
              {adminData.topProduct.product.name}
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
            Admin Data
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminHome;

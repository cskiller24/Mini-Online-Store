import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const UserGuard = () => {
  const location = useLocation();
  const { user, token } = useAuth();
  const theme = createTheme();
  return (
    <>
      {!user.is_admin && token ? (
        <ThemeProvider theme={theme}>
          <Grid component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                backgroundColor: "#130840",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  <Typography variant="h4" component="h4">
                    Mini Online Store
                  </Typography>
                </Link>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link
                    to="/transactions"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      padding: "1.5rem",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  >
                    <InfoIcon fontSize="large" />
                  </Link>
                  <Link
                    to="/carts"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      padding: "1.5rem",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  >
                    <ShoppingCartOutlinedIcon fontSize="large" />
                  </Link>
                  <Link
                    to="/logout"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      padding: "1.5rem",
                      marginLeft: "0.5rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    <LogoutIcon fontSize="large" />
                  </Link>
                </Box>
              </Container>
            </Box>
            <Container>
              <Outlet />
            </Container>
          </Grid>
        </ThemeProvider>
      ) : (
        <Navigate to="/admin" state={{ from: location }} replace />
      )}
    </>
  );
};

export default UserGuard;

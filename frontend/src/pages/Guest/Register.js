import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../../utils/components/Loading";

const Register = () => {
  const navigate = useNavigate();
  const theme = createTheme();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const user = {
      name: data.get("firstName") + data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      address: data.get("address"),
      contact_number: data.get("contact_number"),
    };

    const message = await register(user);
    setIsLoading(false);
    if (message?.status) {
      navigate("/login", { replace: true });
    } else {
      setError(message?.data.errors);
    }
  };

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  useEffect(() => {
    if (error?.email) {
      setEmail({
        error: true,
        helperText: error.email,
      });
    }
    if (error?.password) {
      setPassword({
        error: true,
        helperText: error.password,
      });
    }
    return () => {
      setError(null);
    };
  }, [error]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoComplete="off"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...email}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...password}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password_confirmation"
                      label="Password Confirm"
                      type="password"
                      id="password_confirm"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      type="text"
                      id="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="contact_number"
                      label="Contact Number"
                      type="tel"
                      id="contact_number"
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link variant="body2" component="h2">
                      <RouterLink to="/login">
                        Already have an account? Sign in
                      </RouterLink>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Register;

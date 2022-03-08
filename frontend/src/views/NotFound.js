import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography component="h1" variant="h1">
        Page Not Found
      </Typography>
      <Link to="/">
        <Button variant="contained" sx={{ mt: 5 }}>
          Back to main
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;

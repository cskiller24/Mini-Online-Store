import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import AdminRestockCell from "./components/AdminRestockCell";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import Close from "@mui/icons-material/Close";

const AdminRestock = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { products, fetch_products, restock_product } = useStore();
  const [messageAlert, setMessageAlert] = useState({
    state: false,
    message: "",
    variant: "success",
  });

  const addStock = async (id, quantity) => {
    setIsLoading(true);
    if (quantity > 0) {
      await restock_product(id, quantity);
      setMessageAlert({
        state: true,
        message: "Successfully Restock a Product",
        variant: "success",
      });
    } else {
      setMessageAlert({
        state: true,
        message: "Quantity is 0",
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const index = async () => {
      if (products.length <= 0) {
        await fetch_products();
      }
      setIsLoading(false);
    };
    index();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Collapse in={messageAlert.state}>
        <Alert
          severity={messageAlert.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMessageAlert({
                  state: false,
                  message: "",
                  variant: "success",
                });
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
        >
          {messageAlert.message}
        </Alert>
      </Collapse>
      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Price ($)</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Restock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <AdminRestockCell row={row} key={row.id} addStock={addStock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminRestock;

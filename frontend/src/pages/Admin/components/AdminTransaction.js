import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import AdminTransactionCell from "./AdminTransactionCell";
import { Box } from "@mui/system";
import useStore from "../../../hooks/useStore";

const AdminTransaction = ({ transaction, setIsLoading, transactionAlert }) => {
  const { update_transaction } = useStore();
  const statusParse = (status) => {
    if (status === 0) {
      return "Pending";
    }
    if (status === 1) {
      return "Shipped";
    }
    if (status === 2) {
      return "Delivered";
    }
    if (status === 3) {
      return "Cancelled";
    }
  };
  const [status, setStatus] = useState(transaction.status);
  const [total, setTotal] = useState(0);

  const handleStatus = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (status !== transaction.status) {
      await update_transaction({
        status: status,
        reference_id: transaction.reference_id,
      });
      transactionAlert({
        state: true,
        message: "Successfully Modified Transaction",
        variant: "success",
      });
    } else {
      transactionAlert({
        state: true,
        message:
          "Error Updating Transaction (See if you change the status first)",
        variant: "error",
      });
    }
    setIsLoading(false);
  };
  const checkStatus = (from, current) => {
    //true = disabled | false = not disabled
    if (current === 0) {
      if (from === "Cancelled") {
        return false;
      }
      if (from === "Shipped") {
        return false;
      }
    }
    if (current === 1) {
      if (from === "Delivered") {
        return false;
      }
    }
    return true;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let tempTotal = 0;
    transaction.products.map(
      (product) => (tempTotal += product.price * product.quantity)
    );
    setTotal(tempTotal);
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {transaction.reference_id} ({statusParse(transaction.status)})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Name:</Typography>
          <Typography>{transaction.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Contact #:</Typography>
          <Typography>{transaction.contact_number}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Address:</Typography>
          <Typography>{transaction.address}</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="center">Price ($)</TableCell>
                <TableCell align="center">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.products.map((product) => (
                <AdminTransactionCell product={product} key={product.id} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Typography component="h1" variant="h6">
                    Total: {total}
                  </Typography>
                </TableCell>
                <TableCell colSpan={2} align="center">
                  <Box
                    component="form"
                    sx={{ display: "flex", justifyContent: "space-around" }}
                    onSubmit={handleStatus}
                  >
                    <Select
                      size="small"
                      sx={{ width: "150px" }}
                      value={status}
                      disabled={
                        transaction.status === 3 || transaction.status === 2
                      }
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem
                        value={0}
                        disabled={checkStatus("Pending", transaction.status)}
                      >
                        Pending
                      </MenuItem>
                      <MenuItem
                        value={1}
                        disabled={checkStatus("Shipped", transaction.status)}
                      >
                        Shipped
                      </MenuItem>
                      <MenuItem
                        value={2}
                        disabled={checkStatus("Delivered", transaction.status)}
                      >
                        Delivered
                      </MenuItem>
                      <MenuItem
                        value={3}
                        disabled={checkStatus("Cancelled", transaction.status)}
                      >
                        Cancelled
                      </MenuItem>
                    </Select>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={
                        transaction.status === 3 || transaction.status === 2
                      }
                    >
                      Update Status
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdminTransaction;

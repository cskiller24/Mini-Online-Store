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
import TransactionCell from "./TransactionCell";
import { Box } from "@mui/system";

const Transaction = ({ transaction, updateStatus }) => {
  const [status, setStatus] = useState(transaction.status);
  const [total, setTotal] = useState(0);

  const handleStatus = (e) => {
    e.preventDefault();
    updateStatus(transaction.id, status);
  };
  const checkStatus = (from, current) => {
    //true = disabled | false = not disabled
    if (current === "Pending") {
      if (from === "Cancelled") {
        return false;
      }
      if (from === "Shipped") {
        return false;
      }
    }
    if (current === "Shipped") {
      if (from === "Delivered") {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    let tempTotal = 0;
    transaction.products.map(
      (product) => (tempTotal += product.price * product.quantity)
    );
    setTotal(tempTotal);
  }, [transaction]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{transaction.id}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
                <TransactionCell product={product} key={product.id} />
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
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                    onSubmit={handleStatus}
                  >
                    <Select
                      labelId="status-id"
                      label="Status"
                      size="small"
                      autoWidth
                      displayEmpty
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem
                        value="Pending"
                        disabled={checkStatus("Pending", status)}
                      >
                        Pending
                      </MenuItem>
                      <MenuItem
                        value="Shipped"
                        disabled={checkStatus("Shipped", status)}
                      >
                        Shipped
                      </MenuItem>
                      <MenuItem
                        value="Delivered"
                        disabled={checkStatus("Delivered", status)}
                      >
                        Delivered
                      </MenuItem>
                      <MenuItem
                        value="Cancer"
                        disabled={checkStatus("Cancelled", status)}
                      >
                        Cancelled
                      </MenuItem>
                    </Select>
                    <Button type="submit" variant="contained">
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

export default Transaction;

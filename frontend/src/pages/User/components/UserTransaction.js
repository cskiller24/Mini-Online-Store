import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserTransactionCell from "./UserTransactionCell";
import { useEffect, useState } from "react";
import React from "react";

const UserTransaction = ({ transaction, cancelTransaction }) => {
  const checkStatus = () => {
    return transaction.status !== "Pending";
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    transaction.products.map(
      (product) => (tempTotal += product.price * product.quantity)
    );
    setTotal(tempTotal);
  }, [transaction]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="h1" variant="h6">
          Transaction: {transaction.id} ({transaction.status})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper} elevation={5}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography component="h1" fontWeight={500}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="h1" fontWeight={500}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="h1" fontWeight={500}>
                    Quantity
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.products.map((row) => (
                <UserTransactionCell row={row} key={row.id} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600}>Total</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{total}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    disabled={checkStatus()}
                    variant="contained"
                    onClick={() => cancelTransaction(transaction.id)}
                  >
                    Cancel Transaction
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserTransaction;

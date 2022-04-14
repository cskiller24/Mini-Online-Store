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
import useStore from "../../../hooks/useStore";

const UserTransaction = ({ transaction, setIsTransactionAlertOpen }) => {
  const { update_transaction } = useStore();

  const checkStatus = () => {
    return parseInt(transaction.status) !== 0;
  };

  const statusParse = (status) => {
    status = parseInt(status);
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

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    transaction.products.map(
      (product) => (tempTotal += product.price * product.quantity)
    );
    setTotal(tempTotal);
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      reference_id: transaction.reference_id,
      status: 3,
    };
    await update_transaction(data);
    setIsTransactionAlertOpen(true);
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="h1" variant="h6">
          Transaction: {transaction.reference_id} (
          {statusParse(transaction.status)})
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
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
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

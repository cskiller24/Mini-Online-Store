import { TableCell, TableRow } from "@mui/material";
import React from "react";

const AdminTransactionCell = ({ product }) => {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell align="center">{product.price}</TableCell>
      <TableCell align="center">{product.quantity}</TableCell>
    </TableRow>
  );
};

export default AdminTransactionCell;

import { TableCell, TableRow } from "@mui/material";
import React from "react";

const UserTransactionCell = ({ row }) => {
  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.quantity}</TableCell>
    </TableRow>
  );
};

export default UserTransactionCell;

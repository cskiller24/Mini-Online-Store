import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AdminRestockCell from "./components/AdminRestockCell";

const AdminRestock = ({ products, addStock }) => {
  return (
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
  );
};

export default AdminRestock;

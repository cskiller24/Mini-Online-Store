import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const RestockCell = ({ row, addStock }) => {
  const [quantity, setQuantity] = useState(0);
  const handleAddStockForm = (e) => {
    e.preventDefault();
    addStock(row.id, quantity);
    setQuantity(0);
  };
  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center">
        <Box component="form" onSubmit={handleAddStockForm}>
          <TextField
            type="number"
            label="Quantity"
            size="small"
            value={quantity === 0 ? "" : quantity}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ height: "0.5rem" }}
          />
          <Button variant="outlined" type="submit">
            Add Stock
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default RestockCell;

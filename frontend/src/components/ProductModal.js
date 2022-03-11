import { Button, Input, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const ProductModal = ({ open, toggleOpen, addProduct }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      price: data.get("price"),
      image: "https://picsum.photos/1000/200", // To change
      quantity: 1,
    });

    addProduct({
      name: data.get("name"),
      price: data.get("price"),
      image: "https://picsum.photos/1000/200", // To change
      quantity: 1,
    });

    toggleOpen();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add Product
          </Typography>
          <CloseIcon onClick={toggleOpen} sx={{ cursor: "pointer" }} />
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Product Name"
            name="name"
            sx={{ mt: 3 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Price"
            name="price"
            sx={{ mt: 3 }}
            type="tel"
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Description"
            name="description"
            sx={{ mt: 3 }}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              name="image"
              sx={{ display: "none" }}
            />
            <Button
              variant="outlined"
              component="span"
              sx={{ mt: 3 }}
              fullWidth
            >
              Image
            </Button>
          </label>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;

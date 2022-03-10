import { Button, Input, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const EditProductModal = ({ product, open, toggleOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
    // eslint-disable-next-line no-console
    console.log({
      name: data.get("name"),
      price: data.get("price"),
      image: data.get("image"),
    });
    toggleOpen();
  };

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  }, [product]);

  return (
    <Modal open={open}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 3 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mt: 3 }}
            type="tel"
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default EditProductModal;

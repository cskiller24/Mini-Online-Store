import {
  Button,
  CircularProgress,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React, { useState } from "react";
import useStore from "../../../hooks/useStore";
import Loading from "../../../utils/components/Loading";

const AdminEditProductModal = ({
  product,
  open,
  toggleOpen,
  setMessageAlert,
}) => {
  const { update_product } = useStore();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [isLoading, setIsLoading] = useState(false);

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

  const loadingStyle = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "8vw",
    width: "8vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const editReset = () => {
    setName(product.name);
    setPrice(product.price);
    toggleOpen();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    await update_product(data, product.id);
    setMessageAlert({ state: true, message: "Successfully Modified Product" });
    setIsLoading(false);
    toggleOpen();
  };

  if (isLoading) {
    return (
      <Modal open={true}>
        <Box sx={loadingStyle}>
          <CircularProgress color="secondary" />
        </Box>
      </Modal>
    );
  }

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
            Edit Product
          </Typography>
          <CloseIcon onClick={editReset} sx={{ cursor: "pointer" }} />
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
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminEditProductModal;

import Close from "@mui/icons-material/Close";
import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import useStore from "../../../hooks/useStore";

const AdminDeleteProductModal = ({ open, toggleOpen, id, setMessageAlert }) => {
  const { delete_product } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
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
  const productDelete = async () => {
    setIsLoading(true);
    await delete_product(id);
    setMessageAlert({ state: true, message: "Successfully Removed Product" });
    setIsLoading(false);
    toggleOpen(false);
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
            alignItems: "space",
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h6">
            Are you Sure ?
          </Typography>
          <Button variant="contained" color="error" onClick={productDelete}>
            Delete
          </Button>
          <Close
            onClick={() => {
              toggleOpen(false);
            }}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminDeleteProductModal;

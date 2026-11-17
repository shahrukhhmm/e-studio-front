import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotificationPopup = ({ open, handleClose, notification }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Notification
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Sender:</strong> {notification.sender.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Message:</strong> {notification.message}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default NotificationPopup;

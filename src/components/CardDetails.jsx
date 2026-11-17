// CardDetailsPopup.js
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';

export default function CardDetailsPopup({ open, handleClose }) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleProceed = () => {
    toast.success('Successfully bought premium');
    handleClose();
    setTimeout(() => {
      window.location.href = '/home';
    }, 2000);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Card Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="cardNumber"
          label="Card Number"
          type="text"
          fullWidth
          variant="outlined"
          value={cardDetails.cardNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="expiryDate"
          label="Expiry Date"
          type="text"
          fullWidth
          variant="outlined"
          value={cardDetails.expiryDate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cvv"
          label="CVV"
          type="text"
          fullWidth
          variant="outlined"
          value={cardDetails.cvv}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleProceed}>Proceed</Button>
      </DialogActions>
    </Dialog>
  );
}

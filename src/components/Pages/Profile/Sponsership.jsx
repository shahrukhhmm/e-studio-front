import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SponsorshipFormModal = ({ isOpen, onClose, onSend }) => {
  const [artistName, setArtistName] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourPosition, setYourPosition] = useState("");
  const [eventOrganization, setEventOrganization] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const handleSend = () => {
    const message = `Hi ${artistName},

I hope this message finds you well. We are thrilled to invite you to perform at ${eventName} on ${eventDate} at ${eventLocation}.

As a featured artist, you'll showcase your talent to an enthusiastic audience, network with industry professionals, and gain exposure through our marketing campaigns.

We believe your unique sound and energy would be a perfect addition to our lineup. Please let us know if you are available and interested, so we can discuss the details further.

Looking forward to your positive response.

Best regards,

${yourName}
${yourPosition}
${eventOrganization}
${contactNumber}`;

    onSend(message);
  };

  const areAllFieldsFilled = () => {
    return (
      artistName &&
      yourName &&
      yourPosition &&
      eventOrganization &&
      contactNumber &&
      eventName &&
      eventDate &&
      eventLocation
    );
  };

  useEffect(() => {
    areAllFieldsFilled();
  }, [artistName, yourName, yourPosition, eventOrganization, contactNumber, eventName, eventDate, eventLocation]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" component="h2" sx={{ gridColumn: "span 3" }}>
          Send Sponsorship
        </Typography>
        <TextField
          label="Artist Name"
          fullWidth
          required
          margin="normal"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Event Name"
          fullWidth
          required
          margin="normal"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          required
          margin="normal"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Location"
          fullWidth
          required
          margin="normal"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Your Name"
          fullWidth
          required
          margin="normal"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Your Position"
          fullWidth
          required
          margin="normal"
          value={yourPosition}
          onChange={(e) => setYourPosition(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Event Organization"
          fullWidth
          required
          margin="normal"
          value={eventOrganization}
          onChange={(e) => setEventOrganization(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          label="Your Contact Number"
          fullWidth
          required
          margin="normal"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          sx={{ gridColumn: "span 1" }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          sx={{ mt: 2, gridColumn: "span 3" }}
          disabled={!areAllFieldsFilled()}
        >
          Send
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default SponsorshipFormModal;

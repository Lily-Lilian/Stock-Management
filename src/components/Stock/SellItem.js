import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { sellItem } from "../../api";
import { useNavigate } from "react-router-dom";

const SellItem = () => {
  const [formData, setFormData] = useState({ item_name: "", quantity_to_sell: 0 });
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]); // State for notifications
  const navigate = useNavigate(); // To navigate back to the stock list or dashboard

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sellItem(formData.item_name, Number(formData.quantity_to_sell));

      // Set message and notifications
      setMessage(response.message || "Operation successful");
      setNotifications(response.notifications || []); // Handle notifications array

      // Clear form fields
      setFormData({ item_name: "", quantity_to_sell: 0 });
    } catch (error) {
      setMessage(error.message);
      setNotifications([]); // Clear notifications on error
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "50px auto" }}>
      <Typography variant="h5" align="center">
        Sell Item
      </Typography>

      {/* Display main message */}
      {message && <Typography color="primary" sx={{ mb: 2 }}>{message}</Typography>}

      {/* Display notifications if any */}
      {notifications.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="secondary">
            Notifications:
          </Typography>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <Typography color="textSecondary">{notification}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Item Name"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity to Sell"
          name="quantity_to_sell"
          type="number"
          value={formData.quantity_to_sell}
          onChange={handleChange}
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Sell Item
        </Button>
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleBack}
        sx={{ mt: 2 }}
      >
        Back
      </Button>
    </Paper>
  );
};

export default SellItem;

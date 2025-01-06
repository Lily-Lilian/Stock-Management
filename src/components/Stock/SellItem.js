import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { sellItem } from "../../api";
import { useNavigate } from "react-router-dom";


const SellItem = () => {
  const [formData, setFormData] = useState({ item_name: "", quantity_to_sell: 0 });
  const [message, setMessage] = useState("");
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
      setMessage(response.notification || response.message);
      setFormData({ item_name: "", quantity_to_sell: 0 });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "50px auto" }}>
      <Typography variant="h5" align="center">
        Sell Item
      </Typography>
      {message && <Typography color="primary">{message}</Typography>}
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

import React, { useEffect, useState } from "react";
import { Typography,Button, Paper, Table, TableBody, TableCell, TableHead, TableRow,Box, } from "@mui/material";
import { getAllItems } from "../../api";
import { useNavigate } from "react-router-dom";


const ViewStock = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // To navigate back to the stock list or dashboard

const handleBack = () => {
  navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };
    fetchItems();
  }, []);

  return (
    <Box sx={{ paddingTop: "32px" }}> {/* Add padding to create space */}
      <Paper sx={{ padding: 4, margin: "50px auto", maxWidth: 800 }}> {/* Add more margin */}
      <Typography variant="h5" gutterBottom>
        Stock Items
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
    </Paper>
    </Box>
  );
};

export default ViewStock;

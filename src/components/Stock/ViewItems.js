import React, { useEffect, useState } from "react";
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getAllItems } from "../../api";

const ViewStock = () => {
  const [items, setItems] = useState([]);

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
    <Paper sx={{ padding: 4, margin: "20px" }}>
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
    </Paper>
  );
};

export default ViewStock;

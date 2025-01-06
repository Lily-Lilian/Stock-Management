import React from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const Notifications = ({ notifications }) => {
  return (
    <Paper sx={{ padding: 4, margin: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      {notifications && notifications.length > 0 ? (
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={notification} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No notifications available.</Typography>
      )}
    </Paper>
  );
};

export default Notifications;

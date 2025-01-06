import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

const Navbar = ({ user, notifications, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#081A2E",
        boxShadow: "none",
        top: 0,
        zIndex: 1201,
        padding: "0 20px",
      }}
    >
      <Toolbar>
        {/* Left: Hey User */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hey {user?.username || "User"}
        </Typography>

        {/* Right: Notifications and User Avatar */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Notifications */}
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications?.length || 0} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <List sx={{ width: 300 }}>
              {notifications && notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <ListItem key={index} divider>
                    <ListItemText primary={notification} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No notifications" />
                </ListItem>
              )}
            </List>
          </Popover>

          {/* User Avatar */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Avatar
              src={user?.avatar || "https://via.placeholder.com/40"}
              sx={{ width: 32, height: 32 }}
            />
            <Typography sx={{ ml: 1, color: "#fff" }}>{user?.name || "User"}</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

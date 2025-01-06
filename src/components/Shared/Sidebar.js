import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button } from "@mui/material";
import { Dashboard, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ links, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#081A2E",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Sidebar Links Section */}
      <Box>
        <List>
          {links.map((link, index) => (
            <ListItem button key={index} onClick={() => navigate(link.path)}>
              <ListItemIcon sx={{ color: "#fff" }}>
                {index === 0 && <Dashboard />}
              </ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Section */}
      <Box sx={{ padding: "16px" }}>
        <Button
          startIcon={<Logout />}
          fullWidth
          variant="contained"
          color="error"
          onClick={onLogout}
          sx={{
            backgroundColor: "#D32F2F",
            color: "#fff",
            "&:hover": { backgroundColor: "#B71C1C" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

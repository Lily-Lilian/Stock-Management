import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Shared/Navbar";
import Sidebar from "./Shared/Sidebar";

const Layout = ({ children, links, user, setUser }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar user={user} setUser={setUser} />
      <Sidebar links={links} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

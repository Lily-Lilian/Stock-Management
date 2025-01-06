import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import MetricCard from "../Shared/Card";
import { getTotalItemsSold } from "../../api";

const OfficerDashboard = ({ user, notifications, onLogout }) => {
  const [totalSold, setTotalSold] = useState(0);

  const OfficerLinks = [
    { label: "Dashboard", path: "/OfficerDashboard" },
    { label: "Sell Item", path: "/Stock/sell-item" },
    { label: "View Stock", path: "/Stock/view-item" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sold = await getTotalItemsSold();
        setTotalSold(sold);
      } catch (error) {
        console.error("Error fetching total sold:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar links={OfficerLinks} onLogout={onLogout} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5" }}>
        {/* Navbar */}
        <Navbar user={user} notifications={notifications} />

        {/* Dashboard Content */}
        <Box
          sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Welcome Message */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
          >
            Hey {user?.name || "User"} - here's what's happening today
          </Typography>

          {/* Metric Cards */}
          <Grid container spacing={4} justifyContent="center">
            {/* Total Items Sold */}
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="Total Items Sold"
                value={totalSold}
                change="0%"
              />
            </Grid>

            {/* Low Stock Alerts */}
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="Low Stock Alerts"
                value={notifications.length}
                change="0%"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OfficerDashboard;

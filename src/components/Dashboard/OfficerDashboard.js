import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import MetricCard from "../Shared/Card";
import { getTotalItemsSold, getLowStockAlerts } from "../../api";

const OfficerDashboard = ({ user, onLogout }) => {
  const [totalSold, setTotalSold] = useState(0);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  const OfficerLinks = [
    { label: "Dashboard", path: "/officer" },
    { label: "Sell Item", path: "/officer/sell-item" },
    { label: "View Stock", path: "/officer/view-item" },
  ];

  const notifications = lowStockAlerts.map(
    (item) => `Low stock alert: ${item.name} has only ${item.quantity} left`
  );

  useEffect(() => {
    const fetchData = async () => {
      const sold = await getTotalItemsSold();
      const alerts = await getLowStockAlerts();
      setTotalSold(sold);
      setLowStockAlerts(alerts);
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
                value={lowStockAlerts.length}
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

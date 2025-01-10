import React, { useEffect, useState } from "react";
import { Grid, Box, Typography,Button } from "@mui/material";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import MetricCard from "../Shared/Card";
import { useNavigate } from "react-router-dom";
import { getTotalItemsSold, getLowStockAlerts } from "../../api";

const OfficerDashboard = ({ user, onLogout }) => {
  const [totalSold, setTotalSold] = useState(0);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const navigate = useNavigate();
  

  const officerLinks = [
    { label: "Dashboard", path: "/officer" },
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
      <Sidebar links={officerLinks} onLogout={onLogout} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5" }}>
        {/* Navbar */}
        <Navbar user={user} notifications={notifications} />

        {/* Dashboard Content */}
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Welcome Message */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
            }}
          >
            Hey {user?.username || "User"} - here's what's happening today
          </Typography>

          {/* Metric Cards */}
          <Grid container spacing={4} justifyContent="center" alignItems="center">
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

          {/* Action Buttons */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/officer/sell-item")}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              sell Item
            </Button>
             <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/officer/view-item")}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
              View Item
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OfficerDashboard;

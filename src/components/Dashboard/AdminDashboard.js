import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";
import MetricCard from "../Shared/Card";
import { getTotalItemsSold, getLowStockAlerts } from "../../api";

const AdminDashboard = ({ user, onLogout }) => {
  const [totalSold, setTotalSold] = useState(0);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  const adminLinks = [
    { label: "Dashboard", path: "/admin" },
    { label: "Add Item", path: "/admin/add-item" },
    { label: "View Stock", path: "/admin/view-item" },
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
    <Box sx={{ display: "flex" }}>
      <Sidebar links={adminLinks} onLogout={onLogout} />
      <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
        <Navbar user={user} notifications={notifications} />
        <Box sx={{ padding: "24px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Hey {user?.name || "User"} - here's what's happening today
              </Box>
            </Grid>
            <Grid item xs={6}>
              <MetricCard title="Total Items Sold" value={totalSold} change="0%" />
            </Grid>
            <Grid item xs={6}>
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

export default AdminDashboard;

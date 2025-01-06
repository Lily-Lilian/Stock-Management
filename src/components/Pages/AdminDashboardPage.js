import React from "react";
import InfoCard from "../Shared/Card";
import AdminDashboard from "../Dashboard/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        <InfoCard title="Total Items" value="200" description="Current stock items" />
        <InfoCard title="Users" value="5" description="Active users" />
      </div>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;

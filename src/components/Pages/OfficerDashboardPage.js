import React from "react";
import InfoCard from "../Shared/Card";
import OfficerDashboard from "../Dashboard/OfficerDashboard";

const OfficerDashboardPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        <InfoCard title="Total Items" value="200" description="Current stock items" />
        <InfoCard title="Users" value="5" description="Active users" />
      </div>
      <OfficerDashboard />
    </div>
  );
};

export default OfficerDashboardPage;

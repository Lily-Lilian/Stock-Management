import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const InfoCard = ({ title, value, change }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#081A2E",
        color: "#fff",
        minWidth: 200,
        textAlign: "center",
        padding: 2,
        borderRadius: "8px",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="#AAA">
          {title.toUpperCase()}
        </Typography>
        <Typography variant="h4" color="white">
          {value}
        </Typography>
        <Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

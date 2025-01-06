import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/joy";
import pb from "../services/pocketbase";

const GlobalStatsDisplay: React.FC = () => {
  const [stats, setStats] = useState({
    TotalPoints: 0,
    TotalSingle: 0,
    TotalDouble: 0,
    TotalTriple: 0,
    TotalMisses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch the single GlobalStats record
        const record = await pb.collection("GlobalStats").getOne("4ev74cw6a3mhq5j");

        setStats({
          TotalPoints: record.TotalPoints,
          TotalSingle: record.TotalSingle,
          TotalDouble: record.TotalDouble,
          TotalTriple: record.TotalTriple,
          TotalMisses: record.TotalMisses
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary" size="lg" />
      </Box>
    );
  }

  const statCards = [
    { label: "Total Points", value: stats.TotalPoints, color: "#4caf50" }, // Green
    { label: "Total Single", value: stats.TotalSingle, color: "#2196f3" }, // Blue
    { label: "Total Double", value: stats.TotalDouble, color: "#ff9800" }, // Orange
    { label: "Total Triple", value: stats.TotalTriple, color: "#e91e63" }, // Pink
    { label: "Total Misses", value: stats.TotalMisses, color: "#f44336" }  // Red
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start", // Align to the top
        gap: 2,
        padding: 4,
        background: "linear-gradient(to bottom, #ece9e6, #ffffff)",
        minHeight: "100vh"
      }}
    >
      {statCards.map((stat, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            width: 250,
            boxShadow: "lg",
            borderRadius: "lg",
            background: stat.color,
            color: "#fff",
            textAlign: "center"
          }}
        >
          <CardContent>
            <Typography
              level="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "inherit" }}
            >
              {stat.label}
            </Typography>
            <Typography level="h2" fontWeight="bold" sx={{ color: "inherit" }}>
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default GlobalStatsDisplay;

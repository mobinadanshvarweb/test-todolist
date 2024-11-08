import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // آیکن ساعت

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
      <AccessTimeIcon sx={{ fontSize: 30, color: "#6A1B9A" }} />{" "}
      <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
        {time}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "12px", color: "gray" }}>
        {date}
      </Typography>
    </Box>
  );
};

export default Clock;

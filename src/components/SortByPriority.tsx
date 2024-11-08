import React from "react";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { setSortOrder } from "../redux/slice/tasks-slice";

const SortByPriority: React.FC = () => {
  const dispatch = useDispatch();

  const handleSortChange = (value: string) => {
    dispatch(setSortOrder(value));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Button
        variant="text"
        onClick={() => handleSortChange("HIGH")}
        sx={{
          "&:hover": {
            backgroundColor: "#E0E0E0",
          },
        }}
      >
        Low
      </Button>
      <Button
        variant="text"
        onClick={() => handleSortChange("MEDIUM")}
        sx={{
          "&:hover": {
            backgroundColor: "#E0E0E0",
          },
        }}
      >
        Medium
      </Button>
      <Button
        variant="text"
        onClick={() => handleSortChange("LOW")}
        sx={{
          "&:hover": {
            backgroundColor: "#E0E0E0",
          },
        }}
      >
        High
      </Button>
    </Box>
  );
};

export default SortByPriority;

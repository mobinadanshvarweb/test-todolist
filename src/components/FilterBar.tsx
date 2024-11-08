import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { setFilter } from "../redux/slice/tasks-slice";
import { RootState } from "../redux/store";

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.tasks);

  const handleFilterChange = (key: keyof typeof filter, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Priority
        </Typography>
        <TextField
          select
          variant="outlined"
          fullWidth
          value={filter.priority}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </TextField>
      </Box>

      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Status
        </Typography>
        <TextField
          select
          variant="outlined"
          fullWidth
          value={filter.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="TODO">Todo</MenuItem>
          <MenuItem value="DOING">Doing</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
          <MenuItem value="FAILED">Failed</MenuItem>
        </TextField>
      </Box>

      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Estimate
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={filter.estimate}
          onChange={(e) => handleFilterChange("estimate", e.target.value)}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default FilterBar;

import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import StatusMenu from "./StatusMenu";
import { formatEstimate } from "../../utils/formatEstimate";
import { Task } from "../../types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleStatusMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 500,
          borderRadius: 3,
          backgroundColor: "#219B9D",
          color: "#EEEEEE",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: 1,
              pb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {task.title}
            </Typography>
            <Box>
              <IconButton
                onClick={handleEditClick}
                size="small"
                sx={{ color: "#4C1F7A" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleStatusMenuClick}
                size="small"
                sx={{ color: "#4C1F7A" }}
              >
                <MoreVertIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                size="small"
                sx={{ color: "#FF8000" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Row for Priority and Status */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2">
              Priority:{" "}
              <span
                style={{
                  color:
                    task.priority === "HIGH"
                      ? "#FF8000"
                      : task.priority === "MEDIUM"
                      ? "#EEDF7A"
                      : "#DBD3D3",
                  fontWeight: "bold",
                }}
              >
                {task.priority}
              </span>
            </Typography>
            <Typography variant="body2">Status: {task.status}</Typography>
          </Box>

          {/* Row for Estimate and Time */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="body2">
              Estimate: {formatEstimate(task.estimate)}
            </Typography>
            <Typography variant="body2">Time: {task.datetime}</Typography>
          </Box>
        </CardContent>

        <StatusMenu
          task={task}
          anchorEl={anchorEl}
          onClose={handleStatusMenuClose}
        />
        <DeleteTaskDialog
          open={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          task={task}
        />
        <EditTaskDialog
          open={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          task={task}
        />
      </Card>
    </Box>
  );
};

export default TaskItem;

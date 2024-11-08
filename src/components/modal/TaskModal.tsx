import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  onAddTask: (task: {
    title: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    estimate: number;
    datetime: string;
    status: "TODO" | "DOING" | "DONE" | "WARNING" | "PENDING" | "FAILED";
    hash: string;
  }) => void;
}

const generateHash = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "";
  for (let i = 0; i < 5; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return hash;
};

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
  const [estimate, setEstimate] = useState<number>(1);
  const [datetime, setDatetime] = useState<string>(
    new Date().toISOString().substring(0, 16)
  );
  const [status, setStatus] = useState<
    "TODO" | "DOING" | "DONE" | "WARNING" | "PENDING" | "FAILED"
  >("TODO");

  const [titleError, setTitleError] = useState(false);

  const handleAddTask = () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    setTitle("");

    const newTask = {
      title,
      priority,
      estimate,
      datetime,
      status,
      hash: generateHash(),
    };
    onAddTask(newTask);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" mb={2} fontWeight="bold">
          New Task
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
            size="small"
          />
          <TextField
            fullWidth
            select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
            }
            size="small"
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            type="datetime-local"
            label="Date & Time"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            size="small"
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "TODO"
                  | "DOING"
                  | "DONE"
                  | "WARNING"
                  | "PENDING"
                  | "FAILED"
              )
            }
            size="small"
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="DOING">DOING</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="WARNING">WARNING</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="FAILED">FAILED</MenuItem>
          </TextField>
        </Box>

        <TextField
          fullWidth
          label="Estimate (hours)"
          type="number"
          value={estimate}
          onChange={(e) => setEstimate(parseInt(e.target.value))}
          size="small"
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Task
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/slice/tasks-slice";
import { Task } from "../../types";

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onClose,
  task,
}) => {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [estimate, setEstimate] = useState(task.estimate);
  const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();

  const handleSave = () => {
    // Update task with new values
    dispatch(editTask({ ...task, title, priority, estimate, status }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
            }
            fullWidth
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
          <TextField
            label="Estimated Time (minutes)"
            type="number"
            value={estimate}
            onChange={(e) => setEstimate(parseInt(e.target.value))}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "TODO"
                  | "DOING"
                  | "DONE"
                  | "FAILED"
                  | "WARNING"
                  | "PENDING"
              )
            }
            fullWidth
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="DOING">DOING</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="FAILED">FAILED</MenuItem>
            <MenuItem value="WARNING">Warning</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#FF9800" }}>
          Cancel
        </Button>
        <Button onClick={handleSave} style={{ color: "#4CAF50" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;

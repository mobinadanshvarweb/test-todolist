import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteTask } from "../../redux/slice/tasks-slice";
import { Task } from "../../types";

interface DeleteTaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  open,
  onClose,
  task,
}) => {
  const [inputHash, setInputHash] = useState("");
  const dispatch = useDispatch();

  //     dispatch(deleteTask(task.id));
  //     toast.success("Task successfully deleted!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     onClose();
  //   } else {
  //     toast.error("Incorrect task key. Please try again.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  const handleDelete = () => {
    console.log("Delete button clicked");
    if (inputHash === task.hash) {
      dispatch(deleteTask(task.id));
      toast.success("Task successfully deleted!", {
        position: "top-right",
        autoClose: 3000,
      });
      onClose();
    } else {
      toast.error("Incorrect task key. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          To delete this task, please enter the task key:
        </Typography>
        <TextField
          label="Task Key (hash)"
          value={inputHash}
          onChange={(e) => setInputHash(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "orange" }}>
          Cancel
        </Button>
        <Button onClick={handleDelete} sx={{ color: "green" }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;

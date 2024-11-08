import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { Task } from "../../types";
import { updateTaskStatus } from "../../redux/slice/tasks-slice";

interface StatusMenuProps {
  task: Task;
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({ task, anchorEl, onClose }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (status: Task["status"]) => {
    dispatch(updateTaskStatus({ id: task.id, status }));
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {["TODO", "DOING", "DONE", "WARNING", "PENDING", "FAILED"].map(
        (status) => (
          <MenuItem
            key={status}
            onClick={() => handleStatusChange(status as Task["status"])}
          >
            {status}
          </MenuItem>
        )
      )}
    </Menu>
  );
};

export default StatusMenu;

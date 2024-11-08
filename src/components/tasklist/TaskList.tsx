import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks, searchTerm, sortOrder, filter } = useSelector(
    (state: RootState) => state.tasks
  );

  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTasks = searchedTasks.filter((task) => {
    const matchTitle = filter.title
      ? task.title.toLowerCase().includes(filter.title.toLowerCase())
      : true;
    const matchPriority = filter.priority
      ? task.priority === filter.priority
      : true;
    const matchStatus = filter.status ? task.status === filter.status : true;
    const matchEstimate = filter.estimate
      ? task.estimate.toString() === filter.estimate
      : true;

    return matchTitle && matchPriority && matchStatus && matchEstimate;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === "LOW") {
      return a.priority.localeCompare(b.priority);
    } else if (sortOrder === "HIGH") {
      return b.priority.localeCompare(a.priority);
    }
    return 0;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              flexDirection: "column",

              borderRadius: "8px",

              transition: "transform 0.2s",
            }}
          >
            <TaskItem task={task} />
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}> </p>
      )}
    </div>
  );
};

export default TaskList;

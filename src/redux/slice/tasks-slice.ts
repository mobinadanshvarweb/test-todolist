import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface TasksState {
  tasks: Task[];
  searchTerm: string;
  sortOrder: string;
  filter: Filter;
}

interface Filter {
  title: string;
  priority: string;
  status: string;
  estimate: string;
}

const loadTasksFromLocalStorage = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage(),
  searchTerm: "",
  sortOrder: "",
  filter: {
    title: "",
    priority: "",
    status: "",
    estimate: "",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortOrder(state, action: PayloadAction<string>) {
      state.sortOrder = action.payload;

      const priorityOrderMap: { [key: string]: string[] } = {
        HIGH: ["HIGH", "MEDIUM", "LOW"],
        MEDIUM: ["MEDIUM", "LOW", "HIGH"],
        LOW: ["LOW", "MEDIUM", "HIGH"],
      };

      const priorityOrder = priorityOrderMap[state.sortOrder];

      state.tasks = state.tasks.slice().sort((a, b) => {
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      });

      saveTasksToLocalStorage(state.tasks);
    },
    setFilter: (
      state,
      action: PayloadAction<{ key: keyof Filter; value: string }>
    ) => {
      state.filter[action.payload.key] = action.payload.value;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: number; status: Task["status"] }>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = action.payload.status;
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
});

const saveTasksToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

export const {
  addTask,
  editTask,
  deleteTask,
  setTasks,
  setSearchTerm,
  setSortOrder,
  setFilter,
  updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;

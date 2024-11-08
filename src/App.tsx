import React, { useState } from "react";
import { Box, Button, Container, IconButton, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import FilterBar from "./components/FilterBar";
import SortByPriority from "./components/SortByPriority";
import SearchBar from "./components/searchbar/SearchBar";
import TaskChart from "./components/chart/TaskChart";
import TaskList from "./components/tasklist/TaskList";
import TaskModal from "./components/modal/TaskModal";
import { useDispatch } from "react-redux";
import { addTask } from "./redux/slice/tasks-slice";
import Clock from "./components/common/Clock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => setFilterAnchorEl(null);
  const handleCloseSort = () => setSortAnchorEl(null);

  const isFilterOpen = Boolean(filterAnchorEl);
  const isSortOpen = Boolean(sortAnchorEl);

  const handleAddTask = (task: {
    title: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    estimate: number;
    datetime: string;
    status: "TODO" | "DOING" | "DONE" | "WARNING" | "PENDING" | "FAILED";
    hash: string;
  }) => {
    const newTask = {
      ...task,
      id: Date.now(),
    };
    dispatch(addTask(newTask));
    toast.success("Task successfully added!");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 1300 }}
        limit={3}
      />

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "black",
        }}
      >
        <Box mt={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
              maxWidth: "600px",
              width: "100%",
              p: 3,
              borderRadius: 2,
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
              bgcolor: "#EEEEEE",
              border: "1px solid #ddd",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mb={4}
            >
              <Clock />
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
              >
                <AddIcon />
              </Button>
            </Box>

            <Box mb={4}>
              <TaskChart />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="40px"
              mb={4}
              p={1}
              bgcolor="#4C1F7A"
              borderRadius={2}
            >
              <IconButton onClick={handleFilterClick}>
                <FilterListIcon sx={{ color: "#219B9D" }} />
              </IconButton>
              <Box flexGrow={1} mx={2}>
                <SearchBar />
              </Box>
              <IconButton onClick={handleSortClick} sx={{ color: "#219B9D" }}>
                <SortIcon />
              </IconButton>
            </Box>

            <Popover
              open={isFilterOpen}
              anchorEl={filterAnchorEl}
              onClose={handleCloseFilter}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Box p={2} width={200}>
                <FilterBar />
              </Box>
            </Popover>

            <Popover
              open={isSortOpen}
              anchorEl={sortAnchorEl}
              onClose={handleCloseSort}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Box p={2} width={150}>
                <SortByPriority />
              </Box>
            </Popover>

            <TaskList />
          </Box>

          <TaskModal
            onAddTask={handleAddTask}
            open={isModalOpen}
            handleClose={handleCloseModal}
          />
        </Box>
      </Container>
    </>
  );
};

export default App;

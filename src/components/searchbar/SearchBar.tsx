import React from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { setSearchTerm } from "../../redux/slice/tasks-slice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <TextField
      label="Search..."
      onChange={handleChange}
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#EEEEEE",
          "&:hover": {
            backgroundColor: "#EEEEEE",
          },
          "&.Mui-focused": {
            backgroundColor: "#EEEEEE",
            borderColor: "#219B9D",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.87rem",
        },
        "& .MuiInputBase-input": {
          fontSize: "0.875rem",
        },
      }}
    />
  );
};

export default SearchBar;

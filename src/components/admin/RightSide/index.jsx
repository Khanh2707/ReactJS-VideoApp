import React, { useState } from "react";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@emotion/react";

export default function RightSide() {
  const [searchValue, setSearchValue] = useState("");

  const theme = useTheme();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchValue) {
      console.log("Searching for:", searchValue);
      handleClearSearch();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Typography variant='h5' fontWeight='700'>
        Tìm kiếm
      </Typography>
      <Paper sx={{ display: "flex", width: "250px" }}>
        <IconButton type='button'>
          <SearchIcon />
        </IconButton>
        <InputBase
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          sx={{
            flexGrow: 1,
            borderBottom: `1px solid ${theme.palette.text.primary}`,
          }}
          placeholder='Tìm kiếm... '
        />
        <IconButton
          type='button'
          onClick={handleClearSearch}
          sx={{ visibility: searchValue ? "visible" : "hidden" }}
        >
          <ClearIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

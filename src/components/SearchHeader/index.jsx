import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";

export default function SearchHeader() {
  const theme = useTheme();

  const [valueSearch, setValueSearch] = useState("");
  const [showResultHistorySearch, setShowResultHistorySearch] = useState(false);
  const inputSearchRef = useRef(null);
  const listHistorySearchRef = useRef(null);

  const handleInputChange = (event) => {
    setValueSearch(event.target.value);
  };

  const clearInput = () => {
    setValueSearch("");
  };

  const handleClickOutside = (event) => {
    if (
      listHistorySearchRef.current &&
      !listHistorySearchRef.current.contains(event.target) &&
      !inputSearchRef.current.contains(event.target)
    ) {
      setShowResultHistorySearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Paper
      component='form'
      sx={{
        display: "flex",
        alignItems: "center",
        width: "400px",
        position: "relative",
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: "4px",
      }}
    >
      <InputBase
        sx={{ flex: 1, ml: "10px" }}
        placeholder='Tìm kiếm...'
        value={valueSearch}
        onChange={handleInputChange}
        onClick={() => setShowResultHistorySearch(true)}
        ref={inputSearchRef}
      />
      {valueSearch && (
        <IconButton type='button' onClick={clearInput}>
          <ClearIcon />
        </IconButton>
      )}
      <IconButton type='button' sx={{}}>
        <SearchIcon />
      </IconButton>
      {showResultHistorySearch && (
        <Paper
          ref={listHistorySearchRef}
          sx={{
            width: "100%",
            position: "absolute",
            top: "44px",
            borderRadius: "8px",
            boxShadow: theme.palette.customBoxShadowMenu.main,
            bgcolor: theme.palette.customBgcolorMenu.main,
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary='InPaper' />
                <ClearIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary='Inbox' />
                <ClearIcon />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      )}
    </Paper>
  );
}

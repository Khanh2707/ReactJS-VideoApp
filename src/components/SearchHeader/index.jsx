import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import historySearchAPI from "../../api/historySearchAPI";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function SearchHeader() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { myAccount } = useContext(AppContext);

  const [valueSearch, setValueSearch] = useState("");
  const [showResultHistorySearch, setShowResultHistorySearch] = useState(false);
  const [listHistorySearch, setListHistorySearch] = useState([]);

  const inputSearchRef = useRef(null);
  const listHistorySearchRef = useRef(null);

  const handleInputChange = (event) => {
    if (showResultHistorySearch) {
      setShowResultHistorySearch(false);
    }
    setValueSearch(event.target.value);
  };

  const clearInput = () => {
    setValueSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreateHistorySearch();
    }
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

  const handleCreateHistorySearch = () => {
    if (valueSearch !== "") {
      createHistorySearch();
      clearInput();
      navigate("/results");
    }
  };

  const getAllHistorySearchByChannel = () => {
    historySearchAPI
      .getAllHistorySearchByChannel(myAccount?.channel.idChannel, 0, 6)
      .then((response) => {
        setListHistorySearch(response.result.content);
      })
      .catch((error) => {});
  };

  const createHistorySearch = () => {
    historySearchAPI
      .createHistorySearch({
        content: valueSearch,
        idChannel: myAccount.channel.idChannel,
      })
      .then((response) => {
        getAllHistorySearchByChannel();
      })
      .catch((error) => {});
  };

  const deleteHistorySearch = (idHistorySearch) => {
    historySearchAPI
      .deleteHistorySearch(idHistorySearch)
      .then((response) => {
        getAllHistorySearchByChannel();
        setShowResultHistorySearch(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllHistorySearchByChannel();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Paper
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
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        onClick={() => setShowResultHistorySearch(true)}
        ref={inputSearchRef}
      />
      {valueSearch && (
        <IconButton type='button' onClick={clearInput}>
          <ClearIcon />
        </IconButton>
      )}
      <IconButton type='button' onClick={handleCreateHistorySearch}>
        <SearchIcon />
      </IconButton>
      {showResultHistorySearch && listHistorySearch.length > 0 && (
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
            {listHistorySearch.map((item) => (
              <ListItem
                disablePadding
                key={item.idHistorySearch}
                onClick={() => {
                  navigate("/results");
                  setShowResultHistorySearch(false);
                }}
              >
                <ListItemButton>
                  <ListItemText primary={item.content} />
                  <ClearIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHistorySearch(item.idHistorySearch);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Paper>
  );
}

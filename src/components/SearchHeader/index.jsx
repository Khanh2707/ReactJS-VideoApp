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
import { SearchContext } from "../../context/SearchContext";
import { ReponsiveContext } from "../../context/ReponsiveContext";
import { SnackbarContext } from "../../context/SnackbarContext";

export default function SearchHeader() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isXlDown, isLgDown, isMdDown, isSmDown, isXsDown } =
    useContext(ReponsiveContext);

  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const { myAccount } = useContext(AppContext);
  const { setValueSearchAllVideo } = useContext(SearchContext);

  const [showResultHistorySearch, setShowResultHistorySearch] = useState(false);
  const [listHistorySearch, setListHistorySearch] = useState([]);
  const [valueSearchTemp, setValueSearchTemp] = useState("");

  const inputSearchRef = useRef(null);
  const listHistorySearchRef = useRef(null);

  const handleInputChange = (event) => {
    if (showResultHistorySearch) {
      setShowResultHistorySearch(false);
    }
    setValueSearchTemp(event.target.value);
  };

  const clearInput = () => {
    setValueSearchTemp("");
    setValueSearchAllVideo("");
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

  const getAllHistorySearchByChannel = () => {
    historySearchAPI
      .getAllHistorySearchByChannel(myAccount?.channel.idChannel, 0, 6)
      .then((response) => {
        setListHistorySearch(response.result.content);
      })
      .catch((error) => {});
  };

  const handleCreateHistorySearch = () => {
    if (valueSearchTemp !== "") {
      historySearchAPI
        .createHistorySearch({
          content: valueSearchTemp,
          idChannel: myAccount?.channel?.idChannel,
        })
        .then((response) => {
          setValueSearchAllVideo(valueSearchTemp);
          getAllHistorySearchByChannel();
          navigate("/results");
        })
        .catch((error) => {
          handleOpenSnackbar(
            "error",
            "Đăng nhập để có thể thực hiện chức năng!",
            "bottom",
            "center"
          );
        });
    }
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
        width: { md: "100%", lg: "400px" },
        position: "relative",
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: "4px",
      }}
    >
      <InputBase
        sx={{ flex: 1, ml: "10px" }}
        placeholder='Tìm kiếm...'
        value={valueSearchTemp}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        onClick={() => setShowResultHistorySearch(true)}
        ref={inputSearchRef}
      />
      {valueSearchTemp && (
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
                  setValueSearchTemp(item.content);
                  setValueSearchAllVideo(item.content);
                  setShowResultHistorySearch(false);
                  getAllHistorySearchByChannel();
                  navigate("/results");
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

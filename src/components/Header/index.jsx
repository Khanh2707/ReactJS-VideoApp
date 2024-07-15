import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ClearIcon from "@mui/icons-material/Clear";

export default function Header() {
  const [valueSearch, setValueSearch] = useState("");
  const [showResultHistorySearch, setShowResultHistorySearch] = useState(false);
  const inputSearchRef = useRef(null);
  const listHistorySearchRef = useRef(null);
  const [showListNotification, setShowListNotification] = useState(false);
  const listNotificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

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

    if (
      listNotificationRef.current &&
      !listNotificationRef.current.contains(event.target) &&
      !notificationButtonRef.current.contains(event.target)
    ) {
      setShowListNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowListNotification((prev) => !prev);
  };

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        maxWidth: "1152px",
        p: "8px 0",
        pl: "16px",
        top: "0",
        bgcolor: "#23272f",
        zIndex: "10000",
      }}
    >
      <Grid item>
        <img src='../../public/vite.svg' alt='' />
      </Grid>
      <Grid item>
        <Paper
          component='form'
          sx={{
            display: "flex",
            alignItems: "center",
            width: "400px",
            bgcolor: "#23272f",
            outline: "1px solid #fff",
            boxShadow: "none",
            position: "relative",
          }}
        >
          <InputBase
            sx={{ flex: 1, ml: "10px", color: "#fff" }}
            placeholder='Tìm kiếm...'
            value={valueSearch}
            onChange={handleInputChange}
            onClick={() => setShowResultHistorySearch(true)}
            ref={inputSearchRef}
          />
          {valueSearch && (
            <IconButton
              type='button'
              sx={{ color: "#fff" }}
              onClick={clearInput}
            >
              <ClearIcon />
            </IconButton>
          )}
          <IconButton type='button' sx={{ color: "#fff" }}>
            <SearchIcon />
          </IconButton>
          {showResultHistorySearch && (
            <Box
              ref={listHistorySearchRef}
              sx={{
                width: "100%",
                bgcolor: "#393d44",
                position: "absolute",
                top: "48px",
                color: "#fff",
                borderRadius: "8px",
              }}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Inbox' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Inbox' />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid item>
        <Grid container alignItems='center' spacing={1}>
          <Grid item>
            <IconButton type='button' sx={{ color: "#fff" }}>
              <VideoCallIcon />
            </IconButton>
          </Grid>
          <Grid item sx={{ position: "relative" }}>
            <IconButton
              type='button'
              sx={{ color: "#fff" }}
              onClick={toggleNotifications}
              ref={notificationButtonRef}
            >
              <Badge badgeContent='4' color='success'>
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            {showListNotification && (
              <Box
                ref={listNotificationRef}
                sx={{
                  width: "480px",
                  bgcolor: "#393d44",
                  position: "absolute",
                  top: "50px",
                  left: "-430px",
                  color: "#fff",
                  borderRadius: "8px",
                }}
              >
                <Typography variant='h6' component='div' sx={{ p: "8px 16px" }}>
                  Thông báo
                </Typography>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary='Inbox' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary='Inbox' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            )}
          </Grid>
          <Grid item>
            <IconButton type='button' sx={{ color: "#fff" }}>
              <Avatar alt='' src='' sx={{ width: "32px", height: "32px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

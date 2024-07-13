import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ClearIcon from "@mui/icons-material/Clear";

export default function Header() {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        maxWidth: "1152px",
        p: "4px 0",
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
          }}
        >
          <InputBase
            sx={{ flex: 1, ml: "10px", color: "#fff" }}
            placeholder='Tìm kiếm... '
          />
          <IconButton type='button' sx={{ color: "#fff" }}>
            <ClearIcon />
          </IconButton>
          <IconButton type='button' sx={{ color: "#fff" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item>
        <IconButton type='button' sx={{ color: "#fff", m: "0 2px" }}>
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton type='button' sx={{ color: "#fff", m: "0 2px" }}>
          <Badge badgeContent='4' color='success'>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        <IconButton type='button' sx={{ color: "#fff", m: "0 2px" }}>
          <Avatar alt='' src='' sx={{ width: "32px", height: "32px" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

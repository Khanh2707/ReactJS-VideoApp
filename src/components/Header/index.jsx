import { Avatar, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ThemeSwitcher from "../ThemeSwitcher";
import SearchHeader from "../SearchHeader";
import Notification from "../Notification";

export default function Header() {
  return (
    <Paper
      sx={{
        position: "fixed",
        width: "1152px",
        p: "8px 0",
        pl: "16px",
        zIndex: "10000",
      }}
    >
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item>
          <img src='../../public/vite.svg' alt='' />
        </Grid>
        <Grid item>
          <SearchHeader />
        </Grid>
        <Grid item>
          <Grid container alignItems='center' spacing={1}>
            <Grid item>
              <ThemeSwitcher />
            </Grid>
            <Grid item>
              <IconButton type='button'>
                <VideoCallIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ position: "relative" }}>
              <Notification />
            </Grid>
            <Grid item>
              <IconButton type='button'>
                <Avatar alt='' src='' sx={{ width: "32px", height: "32px" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

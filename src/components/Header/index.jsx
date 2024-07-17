import { Avatar, Grid, IconButton } from "@mui/material";
import React from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ThemeSwitcher from "../ThemeSwitcher";
import SearchHeader from "../SearchHeader";
import Notification from "../Notification";

export default function Header() {
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
        zIndex: "10000",
      }}
    >
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
            <IconButton type='button' sx={{}}>
              <VideoCallIcon />
            </IconButton>
          </Grid>
          <Grid item sx={{ position: "relative" }}>
            <Notification />
          </Grid>
          <Grid item>
            <IconButton type='button' sx={{}}>
              <Avatar alt='' src='' sx={{ width: "32px", height: "32px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

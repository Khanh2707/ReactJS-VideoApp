import { Container, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ThemeSwitcher from "../ThemeSwitcher";
import SearchHeader from "../SearchHeader";
import Notification from "../Notification";
import MenuAvatarHeader from "../MenuAvatarHeader";
import { Link } from "react-router-dom";
import iconReact from "../../assets/react.svg";

export default function Header() {
  return (
    <Paper
      sx={{
        position: "fixed",
        width: "100%",
        p: "8px 0",
        zIndex: "1000",
      }}
    >
      <Container maxWidth='lg'>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Link
              to='/'
              style={{
                textDecoration: "none",
                display: "flex",
                textAlign: "center",
              }}
            >
              <img src={iconReact} alt='' />
            </Link>
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
              <Grid item>
                <Notification />
              </Grid>
              <Grid item>
                <MenuAvatarHeader />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

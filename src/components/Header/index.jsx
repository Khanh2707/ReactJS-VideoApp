import { Chip, Container, Grid, IconButton, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ThemeSwitcher from "../ThemeSwitcher";
import SearchHeader from "../SearchHeader";
import Notification from "../Notification";
import MenuAvatarHeader from "../MenuAvatarHeader";
import { Link, useNavigate } from "react-router-dom";
import vineoDark from "../../assets/vineo-dark.svg";
import vineoLight from "../../assets/vineo-light.svg";
import { AppContext } from "../../context/AppContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateVideo from "../dialog/CreateVideo";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header() {
  const navigate = useNavigate();

  const { themeMode } = useContext(ThemeContext);
  const { myAccount } = useContext(AppContext);

  const [openDialogCreateVideo, setOpenDialogCreateVideo] = useState(false);

  const handleClickOpenDialogCreateVideo = () => {
    navigate("/channel/editing/videos");
    setOpenDialogCreateVideo(true);
  };

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          width: "100%",
          p: "8px 0",
          zIndex: "1000",
        }}
      >
        <Container
          maxWidth='xl'
          sx={{ display: "flex", alignItems: "center", height: "48px" }}
        >
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item sx={{ pl: "16px" }}>
              <Link
                to='/'
                style={{
                  textDecoration: "none",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <img
                  src={themeMode === "light" ? vineoDark : vineoLight}
                  alt=''
                  style={{ width: "100%" }}
                />
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
                {myAccount ? (
                  <>
                    <Grid item>
                      <IconButton
                        type='button'
                        onClick={handleClickOpenDialogCreateVideo}
                      >
                        <VideoCallIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Notification />
                    </Grid>
                    <Grid item>
                      <MenuAvatarHeader />
                    </Grid>
                  </>
                ) : (
                  <Grid item>
                    <Chip
                      icon={<AccountCircleIcon />}
                      label='Đăng nhập'
                      variant='outlined'
                      component={Link}
                      to='/login'
                      sx={{
                        p: "4px",
                        mr: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        "& .MuiChip-icon": {
                          color: "rgb(62, 166, 255)",
                        },
                        "& .MuiChip-label": {
                          color: "rgb(62, 166, 255)",
                        },
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <CreateVideo
        openDialogCreateVideo={openDialogCreateVideo}
        setOpenDialogCreateVideo={setOpenDialogCreateVideo}
      />
    </>
  );
}

import {
  Chip,
  Container,
  Drawer,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
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
import videoAPI from "../../api/videoAPI";
import { SnackbarContext } from "../../context/SnackbarContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { ReponsiveContext } from "../../context/ReponsiveContext";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Sidebar from "../Sidebar";

export default function Header() {
  const navigate = useNavigate();

  const { isXlDown, isLgDown, isMdDown, isSmDown, isXsDown } =
    useContext(ReponsiveContext);

  const { themeMode } = useContext(ThemeContext);
  const { myAccount } = useContext(AppContext);
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const [openDialogCreateVideo, setOpenDialogCreateVideo] = useState(false);

  const handleClickOpenDialogCreateVideo = () => {
    navigate("/channel/editing/videos");
    setOpenDialogCreateVideo(true);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <Drawer anchor='right' open={open} onClose={() => toggleDrawer(false)}>
        <Sidebar />
      </Drawer>
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
            {!isSmDown && (
              <Grid item>
                <Grid container alignItems='center' spacing={1}>
                  {!isMdDown && (
                    <Grid item>
                      <ThemeSwitcher />
                    </Grid>
                  )}
                  {myAccount ? (
                    <>
                      <Grid item>
                        <IconButton
                          type='button'
                          onClick={async () => {
                            try {
                              const channelIsBanResponse =
                                await videoAPI.getChannelIsBan(
                                  myAccount.channel.idChannel
                                );

                              if (channelIsBanResponse?.result) {
                                let dateTimeBan = new Date(
                                  channelIsBanResponse.result.dateTimeBan
                                );
                                dateTimeBan.setMonth(
                                  dateTimeBan.getMonth() + 3
                                );
                                handleOpenSnackbar(
                                  "error",
                                  `Bạn đã bị khóa đăng video do vi phạm 3 lần trở lên!\n
                                Bạn sẽ được mở tài khoản sau ${formatDistanceToNow(
                                  parseISO(dateTimeBan.toISOString()),
                                  {
                                    addSuffix: true,
                                    locale: vi,
                                  }
                                )}`,
                                  "bottom",
                                  "center"
                                );
                              }
                            } catch (error) {
                              if (error.response.data.code === 1023) {
                                handleClickOpenDialogCreateVideo();
                              }
                            }
                          }}
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
            )}
            {isSmDown && (
              <Grid item>
                <IconButton onClick={() => toggleDrawer(true)}>
                  <DensityMediumIcon />
                </IconButton>
              </Grid>
            )}
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

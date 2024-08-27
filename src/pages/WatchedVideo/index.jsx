import {
  Paper,
  Chip,
  Grid,
  IconButton,
  InputBase,
  Typography,
  Backdrop,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import WatchedVideoCard from "../../components/WatchedVideoCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppContext } from "../../context/AppContext";
import videoAPI from "../../api/videoAPI";
import { Link } from "react-router-dom";
import { ThemeContext, useTheme } from "@emotion/react";
import ConfirmDeleteAllWatchedVideo from "../../components/dialog/ConfirmDeleteAllWatchedVideo";
import UpdateIcon from "@mui/icons-material/Update";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function WatchedVideo() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [openBackdropInfoVideo, setOpenBackdropInfoVideo] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [
    openDialogConfirmDeleteAllWatchedVideo,
    setOpenDialogConfirmDeleteAllWatchedVideo,
  ] = useState(false);

  const theme = useTheme();

  const { themeMode } = useContext(ThemeContext);

  const { myAccount } = useContext(AppContext);

  const handleOpenSnackbar = (state, message) => {
    setOpenSnackbar(false);

    setStateAlert(state);
    setContentAlert(message);

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 100);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchValue) {
      console.log("Searching for:", searchValue);
      handleClearSearch();
    }
  };

  // API
  const getAllVideoChannelWatched = () => {
    videoAPI
      .getAllVideoChannelWatched(myAccount?.channel?.idChannel)
      .then((response) => {
        setWatchedVideos(response.result);
        setOpenBackdropInfoVideo(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAllWatchedVideo = () => {
    setOpenBackdropInfoVideo(true);

    videoAPI
      .deleteAllVideoWatched(myAccount?.channel?.idChannel)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getAllVideoChannelWatched();
        handleOpenSnackbar("success", "Xóa nhật ký xem video thành công!");
      });
  };

  useEffect(() => {
    getAllVideoChannelWatched();
  }, []);

  return (
    <>
      <Typography sx={{ fontWeight: "700", fontSize: "36px", mb: "32px" }}>
        Nhật ký xem
      </Typography>
      <Grid container flexWrap='nowrap' gap='16px'>
        {myAccount ? (
          <>
            <Grid item position='relative' flexGrow='1'>
              <Backdrop
                sx={{
                  zIndex: 100,
                  position: "absolute",
                  backgroundColor:
                    themeMode === "light"
                      ? "rgb(255, 255, 255)"
                      : "rgb(15, 18, 20)",
                }}
                open={openBackdropInfoVideo}
              >
                <CircularProgress
                  color='inherit'
                  sx={{
                    position: "absolute",
                    top: "50px",
                  }}
                />
              </Backdrop>
              {!openBackdropInfoVideo && (
                <>
                  {watchedVideos.map((item, index) => {
                    return (
                      <Link
                        to={`/watch/${item.idVideo}`}
                        style={{ textDecoration: "none" }}
                        key={item.idVideo}
                      >
                        <WatchedVideoCard
                          imagePreview={item.imagePreview}
                          title={item.title}
                          nameChannel={item.channel.name}
                          nameUnique={item.channel.nameUnique}
                          viewVideo={item.view}
                          dateTimeCreateVideo={item.dateTimeCreate}
                        />
                      </Link>
                    );
                  })}
                  {watchedVideos.length === 0 && (
                    <Typography>Không có video đã xem</Typography>
                  )}
                </>
              )}
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Paper sx={{ display: "flex", width: "250px" }}>
                <IconButton type='button'>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  sx={{
                    flexGrow: 1,
                    borderBottom: `1px solid ${theme.palette.text.primary}`,
                  }}
                  placeholder='Tìm kiếm... '
                />
                <IconButton
                  type='button'
                  onClick={handleClearSearch}
                  sx={{ visibility: searchValue ? "visible" : "hidden" }}
                >
                  <ClearIcon />
                </IconButton>
              </Paper>
              <Chip
                label='Xóa tất cả nhật ký xem'
                icon={<DeleteIcon />}
                sx={{
                  mt: "24px",
                  ml: "8px",
                  p: "8px",
                }}
                onClick={() => setOpenDialogConfirmDeleteAllWatchedVideo(true)}
              />
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UpdateIcon sx={{ fontSize: "80px" }} />
            <Typography variant='h6' marginTop='24px'>
              Theo dõi nội dung mà bạn muốn xem
            </Typography>
            <Typography marginTop='16px'>
              Bạn không thể xem được nhật ký xem video khi đã đăng xuất.
            </Typography>
            <Chip
              icon={<AccountCircleIcon />}
              label='Đăng nhập'
              variant='outlined'
              component={Link}
              to='/login'
              sx={{
                p: "4px",
                mt: "16px",
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
          </Box>
        )}
      </Grid>
      <ConfirmDeleteAllWatchedVideo
        openDialogConfirmDeleteAllWatchedVideo={
          openDialogConfirmDeleteAllWatchedVideo
        }
        setOpenDialogConfirmDeleteAllWatchedVideo={
          setOpenDialogConfirmDeleteAllWatchedVideo
        }
        deleteAllWatchedVideo={deleteAllWatchedVideo}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={stateAlert}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {contentAlert}
        </Alert>
      </Snackbar>
    </>
  );
}

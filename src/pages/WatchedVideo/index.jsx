import {
  Paper,
  Chip,
  Grid,
  IconButton,
  InputBase,
  Typography,
  Backdrop,
  CircularProgress,
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

export default function WatchedVideo() {
  const [watchedVideos, setWatchedVideos] = useState(null);
  const [openBackdropInfoVideo, setOpenBackdropInfoVideo] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const theme = useTheme();

  const { themeMode } = useContext(ThemeContext);

  const { myAccount } = useContext(AppContext);

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
      .getAllVideoChannelWatched(myAccount.channel.idChannel)
      .then((response) => {
        setWatchedVideos(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAllWatchedVideo = () => {};

  useEffect(() => {
    getAllVideoChannelWatched();
    if (watchedVideos !== null) {
      setOpenBackdropInfoVideo(false);
    }
  }, [watchedVideos]);

  return (
    <>
      <Typography sx={{ fontWeight: "700", fontSize: "36px", mb: "32px" }}>
        Nhật ký xem
      </Typography>
      <Grid container flexWrap='nowrap' justifyContent='space-between'>
        <Grid item flexGrow='1' position='relative'>
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
                      viewVideo={item.view}
                      dateTimeCreateVideo={item.dateTimeCreate}
                    />
                  </Link>
                );
              })}
            </>
          )}
        </Grid>
        <Grid
          item
          sx={{ display: "flex", alignItems: "start", flexDirection: "column" }}
        >
          <Paper sx={{ display: "flex" }}>
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
            onClick={deleteAllWatchedVideo}
          />
        </Grid>
      </Grid>
    </>
  );
}

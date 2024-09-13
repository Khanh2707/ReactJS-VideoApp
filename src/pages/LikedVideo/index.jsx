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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import WatchedVideoCard from "../../components/WatchedVideoCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { AppContext } from "../../context/AppContext";
import videoAPI from "../../api/videoAPI";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext, useTheme } from "@emotion/react";
import UpdateIcon from "@mui/icons-material/Update";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function LikedVideo() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { themeMode } = useContext(ThemeContext);
  const { myAccount } = useContext(AppContext);

  const [likedVideos, setLikedVideos] = useState([]);
  const [openBackdropInfoVideo, setOpenBackdropInfoVideo] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") getAllVideoChannelLiked();
  };

  const handleClearSearch = () => {
    setSearchValue("");
    getAllVideoChannelLiked();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchVideos();
    }
  };

  const searchVideos = () => {
    setOpenBackdropInfoVideo(true);
    if (searchValue.trim() === "") {
      getAllVideoChannelLiked();
    } else {
      videoAPI
        .getAllSearchVideoChannelLikedByTitle(
          myAccount?.channel?.idChannel,
          searchValue,
          0,
          1000
        )
        .then((response) => {
          setLikedVideos(response.result.content);
          setOpenBackdropInfoVideo(false);
        })
        .catch((error) => {
          console.error(error);
          setOpenBackdropInfoVideo(false);
        });
    }
  };

  const getAllVideoChannelLiked = () => {
    setOpenBackdropInfoVideo(true);
    videoAPI
      .getAllVideoChannelLiked(myAccount?.channel?.idChannel, 0, 1000)
      .then((response) => {
        setLikedVideos(response.result.content);
        setOpenBackdropInfoVideo(false);
      })
      .catch((error) => {
        console.error(error);
        setOpenBackdropInfoVideo(false);
      });
  };

  useEffect(() => {
    getAllVideoChannelLiked();
  }, []);

  return (
    <>
      <Typography sx={{ fontWeight: "700", fontSize: "36px", mb: "32px" }}>
        Nhật ký thích
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
                      ? "rgba(255, 255, 255, 0)"
                      : "rgba(15, 18, 20, 0)",
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
                  {likedVideos.map((item, index) => {
                    return (
                      <Box
                        key={item.idVideo}
                        onClick={() => {
                          navigate(`/watch/${item.idVideo}`);
                        }}
                      >
                        <WatchedVideoCard
                          imagePreview={item.imagePreview}
                          title={item.title}
                          nameChannel={item.channel.name}
                          nameUnique={item.channel.nameUnique}
                          viewVideo={item.view}
                          dateTimeCreateVideo={item.dateTimeCreate}
                        />
                      </Box>
                    );
                  })}
                  {likedVideos.length === 0 && (
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
    </>
  );
}

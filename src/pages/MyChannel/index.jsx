import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Tab,
  Typography,
  Chip,
  Avatar,
  Snackbar,
  Alert,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyVideoCard from "../../components/MyVideoCard";
import { ThemeContext, useTheme } from "@emotion/react";
import { Link, useLoaderData } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import channelAPI from "../../api/channelAPI";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import videoAPI from "../../api/videoAPI";

const tab = [
  {
    value: "1",
    label: "Video",
  },
];

export default function MyChannel() {
  const theme = useTheme();
  const { themeMode } = useContext(ThemeContext);
  const { myAccount } = useContext(AppContext);
  const { account, amountSub: initialAmountSub } = useLoaderData();

  const [videos, setVideos] = useState([]);
  const [totalVideo, setTotalVideo] = useState(0);
  const [valueTab, setValueTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [amountSub, setAmountSub] = useState(initialAmountSub.result);
  const [isSub, setIsSub] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [stateAlert, setStateAlert] = useState("info");
  const [contentAlert, setContentAlert] = useState("");
  const [openBackdropInfoVideo, setOpenBackdropInfoVideo] = useState(true);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") getAllVideoChannel();
  };

  const handleClearSearch = () => {
    setSearchValue("");
    getAllVideoChannel();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchVideos();
    }
  };

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

  const searchVideos = () => {
    setOpenBackdropInfoVideo(true);
    if (searchValue.trim() === "") {
      getAllVideoChannel();
    } else {
      videoAPI
        .getAllSearchVideoChannelByTitle(
          myAccount?.channel?.nameUnique,
          searchValue,
          "dateTimeCreate",
          "desc",
          0,
          1000,
          0
        )
        .then((response) => {
          const filteredVideos = response.result.content.filter(
            (video) => !(video.ban || video.hide)
          );
          setVideos(filteredVideos);
          setOpenBackdropInfoVideo(false);
        })
        .catch((error) => {
          console.error(error);
          setOpenBackdropInfoVideo(false);
        });
    }
  };

  const getAllVideoChannel = () => {
    setOpenBackdropInfoVideo(true);
    videoAPI
      .getAllByChannelNameUnique(
        myAccount?.channel?.nameUnique,
        "dateTimeCreate",
        "desc",
        0,
        1000,
        0
      )
      .then((response) => {
        const filteredVideos = response.result.content.filter(
          (video) => !(video.ban || video.hide)
        );
        setVideos(filteredVideos);
        setTotalVideo(filteredVideos.length);
        setOpenBackdropInfoVideo(false);
      })
      .catch((error) => {
        console.error(error);
        setOpenBackdropInfoVideo(false);
      });
  };

  // API
  const getAmountSub = () => {
    channelAPI
      .countSubChannel(account.result?.channel.idChannel)
      .then((response) => {
        setAmountSub(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getIsSub = () => {
    if (myAccount) {
      channelAPI
        .checkChannelSubChannel(
          myAccount?.channel?.idChannel,
          account.result?.channel.idChannel
        )
        .then((response) => {
          setIsSub(response.result);
        })
        .catch((error) => {});
    } else {
      setIsSub(false);
    }
  };

  // API
  const handleSubscribe = () => {
    channelAPI
      .createChannelSubChannel({
        idChannel1: myAccount.channel.idChannel,
        idChannel2: account.result.channel.idChannel,
      })
      .then((response) => {
        console.log(response);
        getIsSub();
        getAmountSub();
        handleOpenSnackbar(
          "success",
          `Bạn vừa đăng ký kênh ${account.result.channel.idChannel}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const handleUnSubscribe = () => {
    channelAPI
      .deleteChannelSubChannel(
        myAccount.channel.idChannel,
        account.result.channel.idChannel
      )
      .then((response) => {
        console.log(response);
        getIsSub();
        getAmountSub();
        handleOpenSnackbar(
          "info",
          `Bạn vừa hủy đăng ký kênh ${account.result.channel.idChannel}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllVideoChannel();
    getIsSub();
  }, []);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "16px",
        }}
      >
        <Avatar
          src={account?.result?.channel?.avatar}
          sx={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            objectFit: "contain",
          }}
          alt=''
        />
        <CardContent
          sx={{
            pt: "0",
            pb: "0",
            "&: last-child": {
              pb: "0",
            },
          }}
        >
          <Typography variant='h4' sx={{ fontWeight: "700" }}>
            {account.result.channel.name}
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{ mt: "0", color: "customGreySubTitle.main" }}
          >
            <Grid item>
              <Typography variant='subtitle2'>
                {account.result.channel.nameUnique}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>•</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {amountSub} người đăng ký
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>•</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>{totalVideo} video</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: "0", cursor: "pointer" }}>
            <Grid item>
              <Typography
                variant='subtitle2'
                sx={{ color: "customGreySubTitle.main" }}
              >
                {account.result.channel.description}
              </Typography>
            </Grid>
          </Grid>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "12px",
              alignItems: "start",
              gap: "8px",
            }}
          >
            {myAccount?.channel.nameUnique !==
              account.result?.channel.nameUnique &&
              (!isSub ? (
                <Chip
                  label='Đăng ký'
                  sx={{
                    p: "4px",
                    bgcolor: "text.primary",
                    color: "secondary.main",
                    "&:hover": {
                      bgcolor: "text.primary",
                      opacity: "0.9",
                    },
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  onClick={() => {
                    if (myAccount) {
                      handleSubscribe();
                    } else {
                      handleOpenSnackbar(
                        "error",
                        "Đăng nhập để có thể thực hiện chức năng!"
                      );
                    }
                  }}
                />
              ) : (
                <Chip
                  icon={<NotificationsActiveIcon />}
                  label='Đã đăng ký'
                  sx={{
                    p: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    "& .MuiChip-icon": {
                      color: "text.primary",
                    },
                  }}
                  onClick={() => {
                    if (myAccount) {
                      handleUnSubscribe();
                    } else {
                      handleOpenSnackbar(
                        "error",
                        "Đăng nhập để có thể thực hiện chức năng!"
                      );
                    }
                  }}
                />
              ))}
            <Box>
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
            </Box>
          </Paper>
        </CardContent>
      </Card>
      <Paper sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={valueTab}>
          <TabList onChange={handleChangeTab} aria-label='lab API tabs example'>
            {tab.map((item) => (
              <Tab key={item.value} label={item.label} value={item.value} />
            ))}
          </TabList>
          <TabPanel value='1' sx={{ pl: "0", pr: "0" }}>
            <Grid container spacing={2} position='relative'>
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
                  {videos.map((item) => {
                    return (
                      <Grid item md={4} sm={6} xs={12} key={item.idVideo}>
                        <Link
                          to={`/watch/${item.idVideo}`}
                          style={{ textDecoration: "none" }}
                        >
                          <MyVideoCard
                            title={item.title}
                            imagePreview={item.imagePreview}
                            viewVideo={item.view}
                            dateTimeCreate={item.dateTimeCreate}
                          />
                        </Link>
                      </Grid>
                    );
                  })}
                  {videos.length === 0 && (
                    <Grid item>
                      <Typography sx={{ mt: "8px" }}>Không có video</Typography>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </TabPanel>
        </TabContext>
      </Paper>
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

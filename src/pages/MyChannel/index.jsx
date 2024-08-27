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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyVideoCard from "../../components/MyVideoCard";
import { useTheme } from "@emotion/react";
import { Link, useLoaderData } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import channelAPI from "../../api/channelAPI";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const tab = [
  {
    value: "1",
    label: "Video",
  },
];

export default function MyChannel() {
  const { account, videos, amountSub: initialAmountSub } = useLoaderData();

  const [valueTab, setValueTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [amountSub, setAmountSub] = useState(initialAmountSub.result);
  const [isSub, setIsSub] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [stateAlert, setStateAlert] = useState("info");
  const [contentAlert, setContentAlert] = useState("");

  const theme = useTheme();

  const { myAccount } = useContext(AppContext);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
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
        <CardContent sx={{ pt: "0", pb: "0" }}>
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
              <Typography variant='subtitle2'>
                {videos.result.length} video
              </Typography>
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
          <Paper sx={{ display: "flex", mt: "12px" }}>
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
            <Grid container spacing={2}>
              {videos.result.map((item) => {
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

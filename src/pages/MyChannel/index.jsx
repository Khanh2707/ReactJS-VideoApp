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
} from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyVideoCard from "../../components/MyVideoCard";
import iconReact from "../../assets/react.svg";
import { useTheme } from "@emotion/react";
import { useLoaderData } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const tab = [
  {
    value: "1",
    label: "Video",
  },
];

export default function MyChannel() {
  const [valueTab, setValueTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");

  const theme = useTheme();

  const { myAccount } = useContext(AppContext);

  const { account, videos, amountVideo } = useLoaderData();

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
              <Typography variant='subtitle2'>6 người đăng ký</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>•</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>{amountVideo.result} video</Typography>
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
          {myAccount.channel.nameUnique !==
            account.result.channel.nameUnique && (
            <Chip
              label='Đăng ký'
              sx={{
                p: "4px",
                mt: "12px",
                bgcolor: "text.primary",
                color: "secondary.main",
                "&:hover": {
                  bgcolor: "text.primary",
                  opacity: "0.9",
                },
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            />
          )}
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
                    <MyVideoCard
                      title={item.title}
                      imagePreview={item.imagePreview}
                      viewVideo='Lượt xem'
                      dateTimeCreate={item.dateTimeCreate}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
}

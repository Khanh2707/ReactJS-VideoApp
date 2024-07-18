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
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyVideoCard from "../../components/MyVideoCard";

export default function MyChannel() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tab = [
    {
      value: "1",
      label: "Video",
    },
  ];

  return (
    <>
      <Card
        sx={{
          display: "flex",
        }}
      >
        <CardMedia
          component='img'
          image='../../public/vite.svg'
          sx={{
            width: "160px",
            height: "160px",
            objectFit: "contain",
          }}
          alt=''
        />
        <CardContent sx={{ pt: "0", pb: "0" }}>
          <Typography variant='h4' sx={{ fontWeight: "700" }}>
            Khánh Trần Phúc
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{ mt: "0", color: "customGreySubTitle.main" }}
          >
            <Grid item>
              <Typography variant='subtitle2'>@khanhtranphuc5193</Typography>
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
              <Typography variant='subtitle2'>2 video</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: "0", cursor: "pointer" }}>
            <Grid item>
              <Typography
                variant='subtitle2'
                sx={{ color: "customGreySubTitle.main" }}
              >
                Đây là kênh của Trần Phúc Khánh
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>...xem thêm</Typography>
            </Grid>
          </Grid>
          <Paper sx={{ display: "flex", mt: "8px" }}>
            <IconButton type='button'>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                flexGrow: 1, // Cho phép InputBase chiếm hết không gian còn lại
              }}
              placeholder='Tìm kiếm... '
            />
            <IconButton type='button'>
              <ClearIcon />
            </IconButton>
          </Paper>
        </CardContent>
      </Card>
      <Paper sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            {tab.map((item) => (
              <Tab key={item.value} label={item.label} value={item.value} />
            ))}
          </TabList>
          <TabPanel value='1' sx={{ pl: "0", pr: "0" }}>
            <Grid container spacing={2}>
              <Grid item md={4} sm={6} xs={12}>
                <MyVideoCard
                  title='Title 1'
                  viewVideo='Lượt xem'
                  dateTimeCreate='Thời gian đăng'
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <MyVideoCard
                  title='Title 2'
                  viewVideo='Lượt xem'
                  dateTimeCreate='Thời gian đăng'
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <MyVideoCard
                  title='Title 3'
                  viewVideo='Lượt xem'
                  dateTimeCreate='Thời gian đăng'
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <MyVideoCard
                  title='Title 4'
                  viewVideo='Lượt xem'
                  dateTimeCreate='Thời gian đăng'
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
}

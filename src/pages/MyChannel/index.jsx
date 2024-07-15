import {
  Avatar,
  Box,
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

  const data = [
    {
      value: "1",
      label: "Trang chủ",
    },
    {
      value: "2",
      label: "Video",
    }
  ];

  return (
    <>
      <Card
        sx={{
          bgcolor: "#23272f",
          boxShadow: "none",
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
          <Typography variant='h4' sx={{ fontWeight: "700", color: "#fff" }}>
            Khánh Trần Phúc
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{ color: "rgb(170, 170, 170)", mt: "0" }}
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
          <Grid
            container
            spacing={1}
            sx={{ color: "rgb(170, 170, 170)", mt: "0", cursor: "pointer" }}
          >
            <Grid item>
              <Typography variant='subtitle2'>
                Đây là kênh của Trần Phúc Khánh
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2' color='#fff'>
                ...xem thêm
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", borderBottom: "1px solid #fff", mt: "8px" }}
          >
            <IconButton type='button' sx={{ color: "#fff" }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                color: "#fff",
                flexGrow: 1, // Cho phép InputBase chiếm hết không gian còn lại
              }}
              placeholder='Tìm kiếm... '
            />
            <IconButton type='button' sx={{ color: "#fff" }}>
              <ClearIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              {data.map((item) => (
                <Tab
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  sx={{
                    color: "rgb(170, 170, 170)",
                  }}
                />
              ))}
            </TabList>
          </Box>
          {data.map((item) => (
            <TabPanel key={item.value} value={item.value} sx={{ pl: "0" }}>
              <Grid container spacing={2}>
                <Grid item>
                  <MyVideoCard
                    title='Title 1'
                    viewVideo='Lượt xem'
                    dateTimeCreate='Thời gian đăng'
                  />
                </Grid>
                <Grid item>
                  <MyVideoCard
                    title='Title 2'
                    viewVideo='Lượt xem'
                    dateTimeCreate='Thời gian đăng'
                  />
                </Grid>
              </Grid>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
}

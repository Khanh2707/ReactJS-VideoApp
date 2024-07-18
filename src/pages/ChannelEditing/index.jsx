import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function ChannelEditing() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tab = [
    {
      value: "1",
      label: "Xây dựng thương hiệu",
    },
    {
      value: "2",
      label: "Thông tin cơ bản",
    },
  ];

  const handleChangeAvatar = () => {};

  return (
    <>
      <Typography variant='h5' sx={{ m: "0 16px" }}>
        Tùy chỉnh kênh
      </Typography>
      <Paper sx={{ width: "100%", typography: "body1", mt: "24px" }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            {tab.map((item) => (
              <Tab key={item.value} label={item.label} value={item.value} />
            ))}
          </TabList>
          <TabPanel value='1' sx={{ pl: "0", pr: "0" }}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                width: "628px",
                cursor: "pointer",
              }}
            >
              <Paper sx={{ width: "290px" }}>
                <CardMedia
                  component='img'
                  image='../../public/vite.svg'
                  sx={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                  alt=''
                />
              </Paper>
              <CardContent sx={{ width: "382px" }}>
                <Typography variant='subtitle1'>Ảnh</Typography>
                <Typography
                  variant='subtitle2'
                  component='div'
                  sx={{ color: "customGreySubTitle.main" }}
                >
                  Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouTube tại
                  những vị trí như bên cạnh bình luận và video của bạn
                </Typography>
                <Paper sx={{ mt: "8px" }}>
                  <Chip
                    label='Thay đổi'
                    sx={{
                      p: "4px",
                      mr: "8px",
                    }}
                    onClick={handleChangeAvatar}
                  />
                  <Chip
                    label='Xóa'
                    sx={{
                      p: "4px",
                    }}
                    onClick={handleChangeAvatar}
                  />
                </Paper>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value='2' sx={{ pl: "0", pr: "0" }}>
            <Paper sx={{ ml: "16px" }}>
              <Typography variant='subtitle1'>Tên</Typography>
              <Typography variant='subtitle2'>
                Chọn tên kênh thể hiện cá tính và nội dung của bạn
              </Typography>
            </Paper>
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
}

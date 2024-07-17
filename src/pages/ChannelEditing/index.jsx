import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
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
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              {tab.map((item) => (
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
          <TabPanel value='1' sx={{ pl: "0", pr: "0" }}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                bgcolor: "#23272f",
                width: "628px",
                cursor: "pointer",
              }}
            >
              <Box sx={{ width: "290px" }}>
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
              </Box>
              <CardContent sx={{ width: "382px" }}>
                <Typography
                  variant='h6'
                  sx={{
                    color: "#fff",
                  }}
                >
                  Ảnh
                </Typography>
                <Typography
                  variant='subtitle2'
                  color='rgb(170, 170, 170)'
                  component='div'
                >
                  Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouTube tại
                  những vị trí như bên cạnh bình luận và video của bạn
                </Typography>
                <Box sx={{ mt: "8px" }}>
                  <Chip
                    label='Thay đổi'
                    sx={{
                      p: "4px",
                      color: "#fff",
                      bgcolor: "#3e3e3e",
                      mr: "8px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    onClick={handleChangeAvatar}
                  />
                  <Chip
                    label='Xóa'
                    sx={{
                      p: "4px",
                      color: "#fff",
                      bgcolor: "#3e3e3e",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    onClick={handleChangeAvatar}
                  />
                </Box>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value='2' sx={{ pl: "0", pr: "0" }}>
            <Box sx={{ ml: "16px" }}>
              <Typography variant='subtitle1'>Tên</Typography>
              <Typography
                variant='subtitle2'
                style={{ color: "rgb(170, 170, 170)" }}
              >
                Chọn tên kênh thể hiện cá tính và nội dung của bạn
              </Typography>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
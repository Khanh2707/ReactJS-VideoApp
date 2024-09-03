import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Chip, Paper, Tab, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppContext } from "../../context/AppContext";

const tab = [
  {
    value: "images",
    label: "Xây dựng thương hiệu",
    to: "/channel/editing/images",
  },
  {
    value: "details",
    label: "Thông tin cơ bản",
    to: "/channel/editing/details",
  },
  {
    value: "videos",
    label: "Video của kênh",
    to: "/channel/editing/videos",
  },
];

export default function ChannelEditing() {
  const [value, setValue] = useState("images");

  const location = useLocation();

  const { myAccount } = useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const currentTab = tab.find((item) => location.pathname.includes(item.to));
    if (currentTab) {
      setValue(currentTab.value);
    }
  }, [location.pathname]);

  return (
    <>
      <Typography sx={{ fontWeight: "700", fontSize: "36px", mb: "32px" }}>
        Tùy chỉnh kênh
      </Typography>
      {myAccount ? (
        <Paper sx={{ width: "100%", typography: "body1", mt: "24px" }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              {tab.map((item) => (
                <Tab
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  component={Link}
                  to={item.to}
                />
              ))}
            </TabList>
            <TabPanel value={value} sx={{ pl: "16px", pr: "0" }}>
              <Outlet />
            </TabPanel>
          </TabContext>
        </Paper>
      ) : (
        <Box
          sx={{
            width: "100%",
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
    </>
  );
}

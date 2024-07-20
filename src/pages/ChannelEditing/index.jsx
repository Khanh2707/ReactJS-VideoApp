import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Paper, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ChannelEditing() {
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

  const location = useLocation();

  const [value, setValue] = useState("images");

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
      <Typography variant='h5' sx={{ m: "0 16px" }}>
        Tùy chỉnh kênh
      </Typography>
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
          <TabPanel value={value} sx={{ pl: "0", pr: "0" }}>
            <Outlet />
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
}

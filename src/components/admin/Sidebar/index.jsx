import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import LoginIcon from "@mui/icons-material/Login";
import { ThemeContext } from "../../../context/ThemeContext";
import vineoDark from "../../../assets/vineo-dark.svg";
import vineoLight from "../../../assets/vineo-light.svg";

const menuItemSidebar = [
  {
    icon: <OndemandVideoIcon />,
    name: "Thống kê video",
    route: "/dashboard/videos",
  },
  {
    icon: <AccountBoxIcon />,
    name: "Thống kê tài khoản",
    route: "/dashboard/accounts",
  },
  {
    icon: <ReportGmailerrorredIcon />,
    name: "Thống kê báo cáo vi phạm",
    route: "/dashboard/reports",
  },
  {
    icon: <LoginIcon />,
    name: "Về trang chủ",
    route: "/",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const { themeMode } = useContext(ThemeContext);

  return (
    <>
      <Box sx={{ cursor: "pointer", pl: "10px" }} onClick={() => navigate(`/`)}>
        <img src={themeMode === "light" ? vineoDark : vineoLight} alt='' />
      </Box>
      <List sx={{ p: "0", position: "sticky", top: "40px", pt: "16px" }}>
        {menuItemSidebar.map((item, index) => {
          const isSelected = item.dynamic
            ? location.pathname.startsWith(item.route)
            : location.pathname === item.route;

          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.route}
                selected={isSelected}
                sx={{
                  borderRadius: "12px",
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

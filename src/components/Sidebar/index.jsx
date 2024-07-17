import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

export default function Sidebar() {
  const location = useLocation();

  const listContent = [
    {
      name: "Trang chủ",
      route: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Kênh của bạn",
      route: "/abc",
      icon: <SwitchAccountIcon />,
    },
    {
      name: "Video đã xem",
      route: "/feed/history",
      icon: <RestoreIcon />,
    },
    {
      name: "Tùy chỉnh kênh",
      route: "/channel/editing",
      icon: <EditIcon />,
    },
    {
      name: "Nội dung của kênh",
      route: "",
      icon: <VideoLibraryIcon />,
    },
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
        "& .MuiDrawer-paper": {
          position: "initial",
        },
      }}
    >
      <List sx={{ p: "0", position: "fixed", width: "275px" }}>
        {listContent.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.route}
              selected={location.pathname === item.route}
              sx={{
                borderRadius: "12px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

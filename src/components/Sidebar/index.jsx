import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const listContent = [
    {
      name: "Trang chủ",
      route: "/",
    },
    {
      name: "Kênh của bạn",
      route: "/abc",
    },
    {
      name: "Video đã xem",
      route: "/feed/history",
    },
    {
      name: "Tùy chỉnh kênh",
      route: "",
    },
    {
      name: "Nội dung của kênh",
      route: "",
    },
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          bgcolor: "#23272f",
          borderRight: "none",
          position: "initial",
          color: "#fff",
        },
      }}
    >
      <List sx={{ p: "0", position: "fixed", width: "275px" }}>
        {listContent.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.route}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  },
                },
                borderRadius: "12px",
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

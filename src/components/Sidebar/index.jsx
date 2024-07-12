import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";

export default function Sidebar() {
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
        {["Trang chủ", "Kênh của bạn", "Video đã xem"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
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
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

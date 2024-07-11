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
  const drawer = (
    <div>
      <List sx={{ p: '0', position: 'fixed' }}>
        {["Trang chủ", "Kênh của bạn", "Video đã xem"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Màu nền khi hover
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Màu nền khi được chọn
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // Màu nền khi được chọn và hover
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
    </div>
  );

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
      {drawer}
    </Drawer>
  );
}

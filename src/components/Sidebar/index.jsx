import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import { AppContext } from "../../context/AppContext";

const listContent = [
  {
    name: "Trang chủ",
    route: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Kênh của bạn",
    route: null,
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
    dynamic: true,
  },
];

export default function Sidebar() {
  const location = useLocation();

  const { myAccount } = useContext(AppContext);

  return (
    <List sx={{ p: "0", position: "fixed", width: "275px" }}>
      {listContent.map((item, index) => {
        const isSelected = item.dynamic
          ? location.pathname.startsWith(item.route)
          : location.pathname === item.route;

        return (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.route ?? `/${myAccount.channel.nameUnique}`}
              selected={isSelected}
              sx={{
                borderRadius: "12px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

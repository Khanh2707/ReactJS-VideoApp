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
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import RecommendIcon from "@mui/icons-material/Recommend";
import { AppContext } from "../../context/AppContext";

const listContent = [
  {
    name: "Trang chủ",
    route: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Tùy chỉnh kênh",
    route: "/channel/editing",
    icon: <EditIcon />,
    dynamic: true,
  },
  {
    name: "Video đã xem",
    route: "/history/watch",
    icon: <RestoreIcon />,
  },
  {
    name: "Video đã thích",
    route: "/history/like",
    icon: <RecommendIcon />,
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
              to={item.route}
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

import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import authAPI from "../../api/authAPI";
import { AppContext } from "../../context/AppContext";

export default function MenuAvatarHeader() {
  const theme = useTheme();

  const { myAccount, setMyAccount } = useContext(AppContext);

  const [showListMenuAvatar, setShowListMenuAvatar] = useState(false);
  const buttonRef = useRef(null);
  const listMenuAvatarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      listMenuAvatarRef.current &&
      !listMenuAvatarRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowListMenuAvatar(false);
    }
  };

  const toggleMenuAvatar = () => {
    setShowListMenuAvatar((prev) => !prev);
  };

  // API
  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null) {
      authAPI
        .logout({ token: accessToken })
        .then((response) => {
          localStorage.removeItem("accessToken");
          setMyAccount(null);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton type='button' onClick={toggleMenuAvatar} ref={buttonRef}>
        <Avatar
          alt=''
          src={myAccount.channel.avatar}
          sx={{ width: "32px", height: "32px" }}
        />
      </IconButton>
      {showListMenuAvatar && (
        <Paper
          ref={listMenuAvatarRef}
          sx={{
            position: "absolute",
            mt: "4px",
            bgcolor: theme.palette.customBgcolorMenu.main,
            boxShadow: theme.palette.customBoxShadowMenu.main,
            right: "0",
            minWidth: "300px",
            borderRadius: "12px",
            zIndex: "1",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", p: "16px" }}>
            <Box sx={{ mr: "16px" }}>
              <Avatar alt='' src={myAccount.channel.avatar} />
            </Box>
            <Box>
              <Typography>{myAccount.channel.name}</Typography>
              <Typography>@{myAccount.channel.nameUnique}</Typography>
              <Link to='/abc' style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "#3ea6ff", mt: "4px" }}>
                  Xem kênh của bạn
                </Typography>
              </Link>
            </Box>
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <LogoutIcon />
                <Typography sx={{ ml: "8px" }} onClick={handleLogout}>
                  Đăng xuất
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to='/watch/1'>
                <Typography sx={{ ml: "8px" }}>Video</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to='/dashboard'>
                <DashboardIcon />
                <Typography sx={{ ml: "8px" }}>Trang quản trị</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
}

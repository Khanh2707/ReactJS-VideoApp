import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export default function MenuAvatarHeader() {
  const theme = useTheme();

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <IconButton type='button' onClick={toggleMenuAvatar} ref={buttonRef}>
        <Avatar
          alt=''
          src=''
          sx={{ width: "32px", height: "32px", position: "relative" }}
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
            right: "10px",
            width: "300px",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", p: "16px" }}>
            <Box sx={{ mr: "16px" }}>
              <Avatar alt='' src='' />
            </Box>
            <Box>
              <Typography>Khánh Trần Phúc</Typography>
              <Typography>@khanhtranphuc5193</Typography>
              <Link to='/abc' style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "primary.main", mt: "4px" }}>
                  Xem kênh của bạn
                </Typography>
              </Link>
            </Box>
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to='/login'>
                <LoginIcon />
                <Typography sx={{ ml: "8px" }}>Đăng nhập</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <LogoutIcon />
                <Typography sx={{ ml: "8px" }}>Đăng xuất</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      )}
    </>
  );
}

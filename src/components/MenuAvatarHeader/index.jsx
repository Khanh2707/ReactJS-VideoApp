import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

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
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography sx={{ ml: "8px" }}>Sáng</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography sx={{ ml: "8px" }}>Tối</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography sx={{ ml: "8px" }}>Hệ thống</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      )}
    </>
  );
}

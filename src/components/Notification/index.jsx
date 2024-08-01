import {
  Avatar,
  Badge,
  Paper,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import iconReact from "../../assets/react.svg";

export default function Notification() {
  const [showListNotification, setShowListNotification] = useState(false);
  const listNotificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      listNotificationRef.current &&
      !listNotificationRef.current.contains(event.target) &&
      !notificationButtonRef.current.contains(event.target)
    ) {
      setShowListNotification(false);
    }
  };

  const toggleNotifications = () => {
    setShowListNotification((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        type='button'
        onClick={toggleNotifications}
        ref={notificationButtonRef}
      >
        <Badge badgeContent='4' color='success'>
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      {showListNotification && (
        <Box
          ref={listNotificationRef}
          sx={{
            width: "480px",
            maxHeight: "642px",
            position: "absolute",
            top: "50px",
            right: "0",
            borderRadius: "8px",
            overflow: "hidden",
            bgcolor: "customBgcolorNotification.main",
          }}
        >
          <Typography variant='h6' component='div' sx={{ p: "8px 16px" }}>
            Thông báo
          </Typography>
          <Divider />
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  p: "16px",
                  "&:hover": {
                    bgcolor:
                      "customHoverBgcolorListItemButtonNotification.main",
                  },
                }}
              >
                <Grid container spacing={1} flexWrap='nowrap'>
                  <Grid item>
                    <Avatar alt='' src='' />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      Nước Mía MOBA đang phát hành video ra mắt lần đầu tiên:
                      Đại Chiến Lục Đạo - Kết Quả 7 Ngày, Review Event Tuần 2
                      Ninja Mới PAIN THIÊN ĐẠO + NARUTO SP Chơi Gì
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      sx={{ mt: "8px", color: "customGreySubTitle.main" }}
                    >
                      Thời gian đăng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box sx={{ width: "86px" }}>
                      <img style={{ width: "100%" }} alt='' src={iconReact} />
                    </Box>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  p: "16px",
                  "&:hover": {
                    bgcolor:
                      "customHoverBgcolorListItemButtonNotification.main",
                  },
                }}
              >
                <Grid container spacing={1} flexWrap='nowrap'>
                  <Grid item>
                    <Avatar alt='' src='' />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      Nước Mía MOBA đang phát hành video ra mắt lần đầu tiên:
                      Đại Chiến Lục Đạo - Kết Quả 7 Ngày, Review Event Tuần 2
                      Ninja Mới PAIN THIÊN ĐẠO + NARUTO SP Chơi Gì
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      sx={{ mt: "8px", color: "customGreySubTitle.main" }}
                    >
                      Thời gian đăng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box sx={{ width: "86px" }}>
                      <img style={{ width: "100%" }} alt='' src={iconReact} />
                    </Box>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}

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
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

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
    <>
      <IconButton
        type='button'
        sx={{}}
        onClick={toggleNotifications}
        ref={notificationButtonRef}
      >
        <Badge badgeContent='4' color='success'>
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      {showListNotification && (
        <Paper
          ref={listNotificationRef}
          sx={{
            width: "480px",
            position: "absolute",
            top: "50px",
            left: "-430px",
            borderRadius: "8px",
          }}
        >
          <Typography variant='h6' component='div' sx={{ p: "8px 16px" }}>
            Thông báo
          </Typography>
          <Divider />
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ p: "16px" }}>
                <Grid container spacing={1} flexWrap='nowrap'>
                  <Grid item>
                    <Avatar alt='' src='../../public/vite.svg' />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      Nước Mía MOBA đang phát hành video ra mắt lần đầu tiên:
                      Đại Chiến Lục Đạo - Kết Quả 7 Ngày, Review Event Tuần 2
                      Ninja Mới PAIN THIÊN ĐẠO + NARUTO SP Chơi Gì
                    </Typography>
                    <Typography variant='subtitle2' sx={{ mt: "8px" }}>
                      Thời gian đăng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Paper sx={{ width: "86px" }}>
                      <img
                        style={{ width: "100%" }}
                        alt=''
                        src='../../public/vite.svg'
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ p: "16px" }}>
                <Grid container spacing={1} flexWrap='nowrap'>
                  <Grid item>
                    <Avatar alt='' src='../../public/vite.svg' />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      Nước Mía MOBA đang phát hành video ra mắt lần đầu tiên:
                      Đại Chiến Lục Đạo - Kết Quả 7 Ngày, Review Event Tuần 2
                      Ninja Mới PAIN THIÊN ĐẠO + NARUTO SP Chơi Gì
                    </Typography>
                    <Typography variant='subtitle2' sx={{ mt: "8px" }}>
                      Thời gian đăng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Paper sx={{ width: "86px" }}>
                      <img
                        style={{ width: "100%" }}
                        alt=''
                        src='../../public/vite.svg'
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      )}
    </>
  );
}

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
import React, { useContext, useEffect, useRef, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import videoAPI from "../../api/videoAPI";
import { AppContext } from "../../context/AppContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { useTheme } from "@emotion/react";

export default function Notification() {
  const [showListNotification, setShowListNotification] = useState(false);
  const [notificationVideos, setNotificationVideos] = useState([]);

  const { myAccount } = useContext(AppContext);

  const theme = useTheme();

  const listNotificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const getAllNotificationVideo = () => {
    videoAPI
      .getAllNotificationVideo(myAccount.channel.idChannel)
      .then((response) => {
        setNotificationVideos(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    getAllNotificationVideo();

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
        <Badge badgeContent='9' color='success'>
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
            boxShadow: theme.palette.customBoxShadowMenu.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "8px 16px",
            }}
          >
            <Typography variant='h6'>Thông báo</Typography>
            <SettingsIcon sx={{ cursor: "pointer" }} />
          </Box>
          <Divider />
          <List
            disablePadding
            sx={{
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}
          >
            {notificationVideos.map((item) => (
              <ListItem disablePadding key={item.idVideo}>
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
                      <Avatar alt='' src={item.channel.avatar} />
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle2'>
                        {`${item.channel.name} đang phát hành video: '${item.title}'`}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        sx={{ mt: "8px", color: "customGreySubTitle.main" }}
                      >
                        {formatDistanceToNow(parseISO(item.dateTimeCreate), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box sx={{ width: "86px" }}>
                        <img
                          style={{ width: "100%", borderRadius: "4px" }}
                          alt=''
                          src={item.imagePreview}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

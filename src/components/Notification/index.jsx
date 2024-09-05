import {
  Avatar,
  Badge,
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
import { AppContext } from "../../context/AppContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import videoAPI from "../../api/videoAPI";

export default function Notification() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showListNotification, setShowListNotification] = useState(false);

  const {
    myAccount,
    notificationVideos,
    getAllNotificationVideo,
    amountHistoryNotificationVideoFromTimeToTime,
    countHistoryNotificationVideoFromTimeToTime,
  } = useContext(AppContext);

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
    updateCheckHistoryNotificationVideo(myAccount.channel.idChannel);
    setShowListNotification((prev) => !prev);
  };

  const updateCheckHistoryNotificationVideo = (idChannel) => {
    videoAPI
      .updateCheckHistoryNotificationVideo(idChannel)
      .then(() => {
        countHistoryNotificationVideoFromTimeToTime(idChannel);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllNotificationVideo(myAccount.channel.idChannel, 0, 6);
    countHistoryNotificationVideoFromTimeToTime(myAccount.channel.idChannel);

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
        <Badge
          badgeContent={amountHistoryNotificationVideoFromTimeToTime}
          color='success'
        >
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
              <ListItem
                disablePadding
                key={item.video.idVideo}
                onClick={() => {
                  navigate(`/watch/${item.video.idVideo}`);
                  videoAPI
                    .updateIsCheckHistoryNotificationVideo(
                      myAccount.channel.idChannel,
                      item.idNotificationVideo,
                      {
                        isCheck: true,
                      }
                    )
                    .then((response) => {
                      getAllNotificationVideo(
                        myAccount.channel.idChannel,
                        0,
                        6
                      );
                    })
                    .catch((error) => {})
                    .finally(() => {
                      setShowListNotification(false);
                    });
                }}
              >
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
                    <Grid
                      item
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/${item.video.channel.nameUnique}`);
                        setShowListNotification(false);
                      }}
                    >
                      {!item.isCheck && (
                        <Box
                          sx={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            bgcolor: "#065fd4",
                          }}
                        ></Box>
                      )}
                      <Avatar alt='' src={item.video.channel.avatar} />
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle2'>
                        {`${item.video.channel.name} đang phát hành video: '${item.video.title}'`}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        sx={{ mt: "8px", color: "customGreySubTitle.main" }}
                      >
                        {formatDistanceToNow(
                          parseISO(item.video.dateTimeCreate),
                          {
                            addSuffix: true,
                            locale: vi,
                          }
                        )}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box sx={{ width: "86px" }}>
                        <img
                          style={{ width: "100%", borderRadius: "4px" }}
                          alt=''
                          src={item.video.imagePreview}
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

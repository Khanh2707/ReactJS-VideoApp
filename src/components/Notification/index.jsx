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
import { AppContext } from "../../context/AppContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import videoAPI from "../../api/videoAPI";

export default function Notification() {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    myAccount,
    mergedNotifications,
    fetchNotifications,
    amountMergedNotification,
    fetchAmountNotification,
  } = useContext(AppContext);

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
    updateCheckHistoryNotification(myAccount.channel.idChannel);
    setShowListNotification((prev) => !prev);
  };

  const updateCheckHistoryNotification = (idChannel) => {
    Promise.all([
      videoAPI.updateCheckHistoryNotificationVideo(idChannel),
      videoAPI.updateCheckHistoryNotificationCommentVideo(idChannel),
      videoAPI.updateCheckHistoryNotificationCommentComment(idChannel),
    ])
      .then(() => {
        fetchAmountNotification(idChannel);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchNotifications(myAccount.channel.idChannel, 0, 6);
    fetchAmountNotification(myAccount.channel.idChannel);

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
        <Badge badgeContent={amountMergedNotification} color='success'>
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
              p: "8px 16px",
            }}
          >
            <Typography variant='h6'>Thông báo</Typography>
          </Box>
          <Divider />
          <List
            disablePadding
            sx={{
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}
          >
            {mergedNotifications.map((item, index) => {
              switch (item.type) {
                case "video":
                  return (
                    <ListItem
                      disablePadding
                      key={index}
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
                            fetchNotifications(
                              myAccount.channel.idChannel,
                              0,
                              1000
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
                        <Grid
                          container
                          spacing={1}
                          flexWrap='nowrap'
                          alignItems='start'
                        >
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
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
                              sx={{
                                mt: "8px",
                                color: "customGreySubTitle.main",
                              }}
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
                  );
                case "commentVideo":
                  return (
                    <ListItem
                      disablePadding
                      key={index}
                      onClick={() => {
                        navigate(`/watch/${item.commentVideo.video.idVideo}`);
                        videoAPI
                          .updateIsCheckHistoryNotificationCommentVideo(
                            myAccount.channel.idChannel,
                            item.commentVideo.idCommentVideo,
                            {
                              isCheck: true,
                            }
                          )
                          .then((response) => {
                            fetchNotifications(
                              myAccount.channel.idChannel,
                              0,
                              1000
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
                        <Grid
                          container
                          spacing={1}
                          flexWrap='nowrap'
                          alignItems='start'
                        >
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/${item.commentVideo.channel.nameUnique}`
                              );
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
                            <Avatar
                              alt=''
                              src={item.commentVideo.channel.avatar}
                            />
                          </Grid>
                          <Grid item flexGrow='1'>
                            <Typography variant='subtitle2'>
                              {`${item.commentVideo.channel.name} vừa bình luận ở video: '${item.commentVideo.video.title}' với nội dung: '${item.commentVideo.content}'`}
                            </Typography>
                            <Typography
                              variant='subtitle2'
                              sx={{
                                mt: "8px",
                                color: "customGreySubTitle.main",
                              }}
                            >
                              {formatDistanceToNow(
                                parseISO(item.commentVideo.dateTimeComment),
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
                                src={item.commentVideo.video.imagePreview}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </ListItem>
                  );
                case "commentComment":
                  return (
                    <ListItem
                      disablePadding
                      key={index}
                      onClick={() => {
                        navigate(
                          `/watch/${item.commentInComment.commentVideo.video.idVideo}`
                        );
                        videoAPI
                          .updateIsCheckHistoryNotificationCommentComment(
                            myAccount.channel.idChannel,
                            item.commentInComment.idCommentInComment,
                            {
                              isCheck: true,
                            }
                          )
                          .then((response) => {
                            fetchNotifications(
                              myAccount.channel.idChannel,
                              0,
                              1000
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
                        <Grid
                          container
                          spacing={1}
                          flexWrap='nowrap'
                          alignItems='start'
                        >
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/${item.commentInComment.channel.nameUnique}`
                              );
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
                            <Avatar
                              alt=''
                              src={item.commentInComment.channel.avatar}
                            />
                          </Grid>
                          <Grid item flexGrow='1'>
                            <Typography variant='subtitle2'>
                              {`${item.commentInComment.channel.name} vừa trả lời bình luận '${item.commentInComment.commentVideo.content}' của bạn ở video: '${item.commentInComment.commentVideo.video.title}' với nội dung: '${item.commentInComment.content}'`}
                            </Typography>
                            <Typography
                              variant='subtitle2'
                              sx={{
                                mt: "8px",
                                color: "customGreySubTitle.main",
                              }}
                            >
                              {formatDistanceToNow(
                                parseISO(item.commentInComment.dateTimeComment),
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
                                src={
                                  item.commentInComment.commentVideo.video
                                    .imagePreview
                                }
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </ListItem>
                  );
                default:
                  return <Typography>Chưa có thông báo nào</Typography>;
              }
            })}
          </List>
        </Box>
      )}
    </Box>
  );
}

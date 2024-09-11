import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Video from "../../components/Video";
import RecommendVideoCard from "../../components/RecommendVideoCard";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SortIcon from "@mui/icons-material/Sort";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import { ThemeContext } from "../../context/ThemeContext";
import ShowMoreText from "react-show-more-text";
import { useTheme } from "@emotion/react";
import CommentVideo from "../../components/CommentVideo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import ListRadioReportVideo from "../../components/dialog/ListRadioReportVideo";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AppContext } from "../../context/AppContext";
import channelAPI from "../../api/channelAPI";
import videoAPI from "../../api/videoAPI";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDeleteVideo from "../../components/dialog/ConfirmDeleteVideo";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const textFieldStyles = {
  "& .MuiInput-underline:before": {
    borderBottomColor: "customBorderBottomColorTextFieldStandard.main",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "customBorderBottomColorTextFieldStandard.main",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "text.primary",
  },
};

export default function DetailVideo() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { themeMode } = useContext(ThemeContext);
  const { myAccount, sendNotification } = useContext(AppContext);

  const { idVideo } = useParams();

  const { videos } = useLoaderData();

  const [video, setVideo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showListActionVideo, setShowListActionVideo] = useState(false);
  const [showListSortComment, setShowListSortComment] = useState(false);
  const [showActionComment, setShowActionComment] = useState(false);
  const [valueComment, setValueComment] = useState("");
  const [openDialogListRadioReportVideo, setOpenDialogListRadioReportVideo] =
    useState(false);
  const [openBackdropInfoVideo, setOpenBackdropInfoVideo] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [stateAlert, setStateAlert] = useState("info");
  const [contentAlert, setContentAlert] = useState("");
  const [isSub, setIsSub] = useState(null);
  const [amountSub, setAmountSub] = useState(0);
  const [isLike, setIsLike] = useState(null);
  const [amountLike, setAmountLike] = useState(0);
  const [openBackdropCommentVideo, setOpenBackdropCommentVideo] =
    useState(true);
  const [amountCommentVideo, setAmountCommentVideo] = useState(0);
  const [listCommentVideo, setListCommentVideo] = useState([]);
  const [stateSortComment, setStateSortComment] = useState("desc");
  const [openBackdropDeleteVideo, setOpenBackdropDeleteVideo] = useState(false);
  const [openDialogConfirmDeleteVideo, setOpenDialogConfirmDeleteVideo] =
    useState(false);

  const actionVideoButtonRef = useRef(null);
  const listActionVideoRef = useRef(null);
  const sortCommentButtonRef = useRef(null);
  const listSorCommentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      (listSorCommentRef.current &&
        !listSorCommentRef.current.contains(event.target) &&
        !sortCommentButtonRef.current.contains(event.target)) ||
      (listActionVideoRef.current &&
        !listActionVideoRef.current.contains(event.target) &&
        !actionVideoButtonRef.current.contains(event.target))
    ) {
      setShowListSortComment(false);
      setShowListActionVideo(false);
    }
  };

  const toggleListSortComment = () => {
    setShowListSortComment((prev) => !prev);
  };

  const handleSelectStateSortComment = (state) => {
    setStateSortComment(state);
    setShowListSortComment(false);
  };

  const togglelistActionVideo = () => {
    setShowListActionVideo((prev) => !prev);
  };

  const handleClickOpenDialogListRadioReportVideo = () => {
    setOpenDialogListRadioReportVideo(true);
    setShowListActionVideo(false);
  };

  const handleComment = (e) => {
    setValueComment(e.target.value);
  };

  const handleCancelComment = () => {
    setValueComment("");
    setShowActionComment(false);
    setShowEmojiPicker(false);
  };

  const handlePostComment = () => {
    videoAPI
      .createCommentVideo({
        content: valueComment,
        idChannel: myAccount.channel.idChannel,
        idVideo: idVideo,
      })
      .then((response) => {
        getAllCommentVideo();
        countCommentVideosByVideo();
        handleCancelComment();
        handleOpenSnackbar("success", "Bình luận thành công!");
        sendNotification();
      })
      .catch((error) => {});
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (e) => {
    setValueComment((prev) => prev + e.emoji);
  };

  const handleOpenSnackbar = (state, message) => {
    setOpenSnackbar(false);

    setStateAlert(state);
    setContentAlert(message);

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 100);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const getVideo = () => {
    videoAPI
      .getById(idVideo)
      .then((response) => {
        setVideo(response.result);
        getIsSub(response.result.channel.idChannel);
        getAmountSub(response.result.channel.idChannel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getAmountSub = (idChannelByVideo) => {
    channelAPI
      .countSubChannel(idChannelByVideo)
      .then((response) => {
        setAmountSub(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getIsSub = (idChannelByVideo) => {
    if (myAccount) {
      channelAPI
        .checkChannelSubChannel(myAccount?.channel?.idChannel, idChannelByVideo)
        .then((response) => {
          setIsSub(response.result);
        })
        .catch((error) => {});
    } else {
      setIsSub(false);
    }
  };

  // API
  const handleSubscribe = () => {
    channelAPI
      .createChannelSubChannel({
        idChannel1: myAccount.channel.idChannel,
        idChannel2: video?.channel.idChannel,
      })
      .then((response) => {
        console.log(response);
        getVideo();
        handleOpenSnackbar(
          "success",
          `Bạn vừa đăng ký kênh ${video?.channel.name}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const handleUnSubscribe = () => {
    channelAPI
      .deleteChannelSubChannel(
        myAccount.channel.idChannel,
        video?.channel.idChannel
      )
      .then((response) => {
        console.log(response);
        getVideo();
        handleOpenSnackbar(
          "info",
          `Bạn vừa hủy đăng ký kênh ${video?.channel.name}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getAmountLike = () => {
    videoAPI
      .countLikeVideo(idVideo)
      .then((response) => {
        setAmountLike(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getIsLike = () => {
    if (myAccount) {
      videoAPI
        .checkChannelLikeVideo(myAccount?.channel?.idChannel, idVideo)
        .then((response) => {
          setIsLike(response.result);
        })
        .catch((error) => {});
    } else {
      setIsLike(false);
    }
  };

  // API
  const handleLikeVideo = () => {
    videoAPI
      .createChannelLikeVideo({
        idChannel: myAccount.channel.idChannel,
        idVideo: idVideo,
      })
      .then((response) => {
        console.log(response);
        getIsLike();
        getAmountLike();
        handleOpenSnackbar("success", `Bạn vừa like video ${video?.title}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const handleUnLikeVideo = () => {
    videoAPI
      .deleteHistoryLikeVideo(myAccount.channel.idChannel, idVideo)
      .then((response) => {
        console.log(response);
        getIsLike();
        getAmountLike();
        handleOpenSnackbar("info", `Bạn vừa hủy like video ${video?.title}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const handleDownloadVideo = () => {
    handleOpenSnackbar("info", "Video sắp được tải");
    videoAPI
      .downloadVideo(idVideo, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${video?.title}.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Failed to download video:", error);
      });
  };

  // API
  const handleWatchVideo = () => {
    if (myAccount) {
      videoAPI
        .createHistoryWatchVideo({
          idChannel: myAccount?.channel?.idChannel,
          idVideo: idVideo,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // API
  const getAllCommentVideo = () => {
    setOpenBackdropCommentVideo(true);
    videoAPI
      .getAllCommentVideo(idVideo, "dateTimeComment", stateSortComment, 0, 10)
      .then((response) => {
        setListCommentVideo(response.result.content);
        setOpenBackdropCommentVideo(false);
      })
      .catch((error) => {});
  };

  // API
  const countCommentVideosByVideo = () => {
    videoAPI
      .countCommentVideosByVideo(idVideo)
      .then((response) => {
        setAmountCommentVideo(response.result);
      })
      .catch((error) => {});
  };

  const handleDeleteVideo = () => {
    setOpenBackdropDeleteVideo(true);
    handleOpenSnackbar(
      "info",
      "Video đang đạng được xóa, vui lòng đừng rời khỏi trang!"
    );

    videoAPI
      .deleteVideo(idVideo)
      .then((response) => {
        sendNotification();
        setOpenBackdropDeleteVideo(false);
        handleOpenSnackbar("info", "Video đã xóa thành công!");
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    getVideo();
    handleWatchVideo();
  }, [idVideo]);

  useEffect(() => {
    countCommentVideosByVideo();
    getAllCommentVideo();
  }, [idVideo, stateSortComment]);

  useEffect(() => {
    getIsLike();
    getAmountLike();

    if (isLike !== null) setOpenBackdropInfoVideo(false);
  }, [idVideo, isLike, amountLike]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", pb: "450px" }}>
        <Box sx={{ width: "100%" }}>
          <Video
            idVideo={idVideo}
            titleVideo={video?.title}
            linkVideo={video?.linkVideo}
            imagePreview={video?.imagePreview}
          />
          <Typography
            variant='h6'
            fontWeight='700'
            sx={{ mt: "12px", lineHeight: "1.4" }}
          >
            {video?.title}
          </Typography>
          <Box sx={{ position: "relative" }}>
            <Backdrop
              sx={{
                zIndex: 100,
                position: "absolute",
                backgroundColor:
                  themeMode === "light"
                    ? "rgb(255, 255, 255)"
                    : "rgb(15, 18, 20)",
              }}
              open={openBackdropInfoVideo}
            >
              <CircularProgress
                color='inherit'
                sx={{
                  position: "absolute",
                }}
              />
            </Backdrop>
            <Box
              sx={{
                visibility: !openBackdropInfoVideo ? "visible" : "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  mt: "12px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    onClick={() => {
                      navigate(`/${video?.channel.nameUnique}`);
                    }}
                  >
                    <Avatar alt='' src={video?.channel.avatar} />
                  </Box>
                  <Box sx={{ ml: "12px", lineHeight: "1" }}>
                    <Box
                      onClick={() => {
                        navigate(`/${video?.channel.nameUnique}`);
                      }}
                    >
                      <Typography
                        variant='subtitle1'
                        sx={{ lineHeight: "1.3" }}
                        fontWeight='600'
                      >
                        {video?.channel.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant='caption'
                      sx={{ color: "customGreySubTitle.main" }}
                    >
                      {amountSub} người đăng ký
                    </Typography>
                  </Box>
                  {!isSub && (
                    <Chip
                      label='Đăng ký'
                      sx={{
                        p: "4px",
                        ml: "24px",
                        bgcolor: "text.primary",
                        color: "secondary.main",
                        "&:hover": {
                          bgcolor: "text.primary",
                          opacity: "0.9",
                        },
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        if (myAccount) {
                          handleSubscribe();
                        } else {
                          handleOpenSnackbar(
                            "error",
                            "Đăng nhập để có thể thực hiện chức năng!"
                          );
                        }
                      }}
                    />
                  )}
                  {isSub && (
                    <Chip
                      icon={<NotificationsActiveIcon />}
                      label='Đã đăng ký'
                      sx={{
                        p: "4px",
                        ml: "24px",
                        fontSize: "14px",
                        fontWeight: "600",
                        "& .MuiChip-icon": {
                          color: "text.primary",
                        },
                      }}
                      onClick={() => {
                        if (myAccount) {
                          handleUnSubscribe();
                        } else {
                          handleOpenSnackbar(
                            "error",
                            "Đăng nhập để có thể thực hiện chức năng!"
                          );
                        }
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    icon={isLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    label={amountLike}
                    sx={{
                      p: "4px",
                      mr: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      "& .MuiChip-icon": {
                        color: "text.primary",
                      },
                    }}
                    onClick={() => {
                      if (myAccount) {
                        isLike ? handleUnLikeVideo() : handleLikeVideo();
                      } else {
                        handleOpenSnackbar(
                          "error",
                          "Đăng nhập để có thể thực hiện chức năng!"
                        );
                      }
                    }}
                  />
                  <Chip
                    icon={<VerticalAlignBottomIcon />}
                    label='Tải xuống'
                    sx={{
                      p: "4px",
                      mr: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      "& .MuiChip-icon": {
                        color: "text.primary",
                      },
                    }}
                    onClick={() => {
                      if (myAccount) {
                        handleDownloadVideo();
                      } else {
                        handleOpenSnackbar(
                          "error",
                          "Đăng nhập để có thể thực hiện chức năng!"
                        );
                      }
                    }}
                  />
                  <Box sx={{ position: "relative" }}>
                    <Chip
                      ref={actionVideoButtonRef}
                      icon={<MoreHorizIcon />}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        padding: 0,
                        "& .MuiChip-label": {
                          display: "none",
                        },
                        "& .MuiChip-icon": {
                          color: "text.primary",
                          m: "0",
                        },
                      }}
                      onClick={togglelistActionVideo}
                    />
                    {showListActionVideo && (
                      <Paper
                        ref={listActionVideoRef}
                        sx={{
                          position: "absolute",
                          zIndex: "10",
                          minWidth: "160px",
                          borderRadius: "8px",
                          top: "0",
                          left: "34px",
                          bgcolor: theme.palette.customBgcolorMenu.main,
                          boxShadow: theme.palette.customBoxShadowMenu.main,
                        }}
                      >
                        <List>
                          <ListItem
                            disablePadding
                            onClick={() => {
                              if (myAccount) {
                                handleClickOpenDialogListRadioReportVideo();
                              } else {
                                handleOpenSnackbar(
                                  "error",
                                  "Đăng nhập để có thể thực hiện chức năng!"
                                );
                                setShowListActionVideo(false);
                              }
                            }}
                          >
                            <ListItemButton>
                              <EmojiFlagsIcon />
                              <Typography sx={{ ml: "12px" }}>
                                Báo vi phạm
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          {video?.channel.idChannel ===
                            myAccount?.channel.idChannel && (
                            <ListItem
                              disablePadding
                              onClick={() =>
                                setOpenDialogConfirmDeleteVideo(true)
                              }
                            >
                              <ListItemButton>
                                <DeleteOutlineIcon />
                                <Typography sx={{ ml: "12px" }}>
                                  Xóa video
                                </Typography>
                              </ListItemButton>
                            </ListItem>
                          )}
                          {(myAccount?.roles[0].name === "ADMIN" ||
                            myAccount?.roles[0].name === "CENSOR") && (
                            <ListItem disablePadding onClick={() => {}}>
                              <ListItemButton>
                                <LockOutlinedIcon />
                                <Typography sx={{ ml: "12px" }}>
                                  Khóa video
                                </Typography>
                              </ListItemButton>
                            </ListItem>
                          )}
                        </List>
                      </Paper>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: "customBgcolorSecondary.main",
                  borderRadius: "12px",
                  p: "12px",
                  mt: "16px",
                  cursor: "pointer",
                }}
              >
                <ShowMoreText
                  more={
                    <Typography variant='span' sx={{ fontWeight: "600" }}>
                      thêm
                    </Typography>
                  }
                  less={
                    <Typography sx={{ fontWeight: "600", mt: "16px" }}>
                      Ẩn bớt
                    </Typography>
                  }
                  keepNewLines={true}
                  lines={4}
                >
                  {`${
                    video?.view
                  } lượt xem \u00A0\u00A0\u00A0 ${formatDistanceToNow(
                    parseISO(video?.dateTimeCreate ?? new Date().toISOString()),
                    { addSuffix: true, locale: vi }
                  )}
                  ${video?.description}`}
                </ShowMoreText>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: "24px" }}>
            <Typography variant='h6' fontWeight='600'>
              {amountCommentVideo} bình luận
            </Typography>
            <Box sx={{ position: "relative", ml: "32px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={toggleListSortComment}
              >
                <SortIcon />
                <Typography
                  ref={sortCommentButtonRef}
                  sx={{ ml: "8px", userSelect: "none" }}
                  variant='subtitle2'
                  fontWeight='600'
                >
                  Sắp xếp theo
                </Typography>
              </Box>
              {showListSortComment && (
                <Paper
                  ref={listSorCommentRef}
                  sx={{
                    position: "absolute",
                    zIndex: "10",
                    minWidth: "173px",
                    borderRadius: "8px",
                    mt: "12px",
                    bgcolor: theme.palette.customBgcolorMenu.main,
                    boxShadow: theme.palette.customBoxShadowMenu.main,
                  }}
                >
                  <List>
                    <ListItem
                      disablePadding
                      onClick={() => handleSelectStateSortComment("desc")}
                    >
                      <ListItemButton selected={stateSortComment === "desc"}>
                        <Typography>Mới nhất xếp trước</Typography>
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      onClick={() => handleSelectStateSortComment("asc")}
                    >
                      <ListItemButton selected={stateSortComment === "asc"}>
                        <Typography>Mới nhất xếp sau</Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", mt: "24px", width: "100%" }}>
            <Avatar alt='' src={myAccount?.channel.avatar} />
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                variant='standard'
                placeholder='Viết bình luận...'
                sx={{ ml: "12px", mb: "12px", ...textFieldStyles }}
                onClick={() => {
                  if (myAccount) {
                    setShowActionComment(true);
                  } else {
                    handleOpenSnackbar(
                      "error",
                      "Đăng nhập để có thể thực hiện chức năng!"
                    );
                  }
                }}
                value={valueComment}
                onChange={handleComment}
              />
              {showActionComment && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ position: "relative", ml: "12px" }}>
                    <InsertEmoticonIcon
                      sx={{ cursor: "pointer" }}
                      onClick={toggleEmojiPicker}
                    />
                    {showEmojiPicker && (
                      <EmojiPicker
                        theme={themeMode}
                        emojiStyle='native'
                        lazyLoadEmojis={true}
                        onEmojiClick={handleEmojiClick}
                        style={{ position: "absolute", zIndex: "1000" }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Chip
                      label='Hủy'
                      sx={{
                        p: "4px",
                        fontSize: "14px",
                        fontWeight: "600",
                        userSelect: "none",
                        bgcolor: "primary.main",
                        cursor: "pointer",
                        mr: "8px",
                      }}
                      onClick={handleCancelComment}
                    />
                    <Chip
                      label='Bình luận'
                      sx={{
                        p: "4px",
                        fontSize: "14px",
                        fontWeight: "600",
                        userSelect: "none",
                        cursor: "pointer",
                        bgcolor: valueComment ? "#3da2f9" : "",
                        color: valueComment ? "secondary.main" : "",
                        "&:hover": {
                          bgcolor: "#3da2f9",
                          opacity: "0.9",
                        },
                      }}
                      disabled={valueComment === ""}
                      onClick={handlePostComment}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ mt: "24px", position: "relative" }}>
            {listCommentVideo.map((item) => {
              return (
                <CommentVideo
                  key={item.idCommentVideo}
                  idCommentVideo={item.idCommentVideo}
                  avatar={item.channel.avatar}
                  nameUnique={item.channel.nameUnique}
                  nameUniqueByVideo={item.video.channel.nameUnique}
                  dateTimeComment={formatDistanceToNow(
                    parseISO(item.dateTimeComment),
                    { addSuffix: true, locale: vi }
                  )}
                  comment={item.content}
                  type='comment-video'
                  getAllCommentVideo={getAllCommentVideo}
                  countCommentVideosByVideo={countCommentVideosByVideo}
                  handleOpenSnackbar={handleOpenSnackbar}
                  stateSortComment={stateSortComment}
                  setOpenBackdropCommentVideo={setOpenBackdropCommentVideo}
                />
              );
            })}
            <Backdrop
              sx={{
                zIndex: 100,
                position: "absolute",
                backgroundColor:
                  themeMode === "light"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(15, 18, 20, 0.4)",
              }}
              open={openBackdropCommentVideo}
            >
              <CircularProgress
                color='inherit'
                sx={{
                  position: "absolute",
                  top: "70px",
                }}
              />
            </Backdrop>
          </Box>
        </Box>
        <Box sx={{ ml: "24px" }}>
          {videos.result.content.map((item) => {
            return (
              <Box
                key={item.idVideo}
                onClick={() => {
                  navigate(`/watch/${item.idVideo}`);
                }}
              >
                <RecommendVideoCard
                  title={item.title}
                  nameChannel={item.channel.name}
                  nameUnique={item.channel.nameUnique}
                  viewVideo={item.view}
                  dateTimeCreateVideo={item.dateTimeCreate}
                  imagePreview={item.imagePreview}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Backdrop
        sx={{
          zIndex: 100,
          position: "absolute",
          backgroundColor:
            themeMode === "light"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(15, 18, 20, 0.4)",
        }}
        open={openBackdropDeleteVideo}
      >
        <CircularProgress
          color='inherit'
          sx={{
            position: "absolute",
            top: "200px",
          }}
        />
      </Backdrop>
      <ConfirmDeleteVideo
        openDialogConfirmDeleteVideo={openDialogConfirmDeleteVideo}
        setOpenDialogConfirmDeleteVideo={setOpenDialogConfirmDeleteVideo}
        handleDeleteVideo={handleDeleteVideo}
      />
      <ListRadioReportVideo
        openDialogListRadioReportVideo={openDialogListRadioReportVideo}
        setOpenDialogListRadioReportVideo={setOpenDialogListRadioReportVideo}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={stateAlert}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {contentAlert}
        </Alert>
      </Snackbar>
    </Box>
  );
}

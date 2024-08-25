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
import ListCommentComment from "../../components/ListCommentComment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useLoaderData, useParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AppContext } from "../../context/AppContext";
import channelAPI from "../../api/channelAPI";
import videoAPI from "../../api/videoAPI";

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
  const {
    video,
    amountSub: initialAmountSub,
    amountLike: initialAmountLike,
  } = useLoaderData();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showListActionVideo, setShowListActionVideo] = useState(false);
  const actionVideoButtonRef = useRef(null);
  const listActionVideoRef = useRef(null);
  const [showListSortComment, setShowListSortComment] = useState(false);
  const sortCommentButtonRef = useRef(null);
  const listSorCommentRef = useRef(null);
  const [showActionComment, setShowActionComment] = useState(false);
  const [valueComment, setValueComment] = useState("");
  const [openDialogListRadioReportVideo, setOpenDialogListRadioReportVideo] =
    useState(false);
  const [openBackdropInfoVideo, setOpenBackdropInfoVideo] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [stateAlert, setStateAlert] = useState("info");
  const [contentAlert, setContentAlert] = useState("");
  const [isSub, setIsSub] = useState(null);
  const [amountSub, setAmountSub] = useState(initialAmountSub.result);
  const [isLike, setIsLike] = useState(null);
  const [amountLike, setAmountLike] = useState(initialAmountLike.result);
  const [openBackdropCommentVideo, setOpenBackdropCommentVideo] =
    useState(true);

  const theme = useTheme();

  const { themeMode } = useContext(ThemeContext);

  const { myAccount } = useContext(AppContext);

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
    console.log("Bình luận đã gửi:", valueComment);
    handleCancelComment();
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

  // API
  const getAmountSub = () => {
    channelAPI
      .countSubChannel(video.result.channel.idChannel)
      .then((response) => {
        setAmountSub(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getIsSub = () => {
    channelAPI
      .checkChannelSubChannel(
        myAccount.channel.idChannel,
        video.result.channel.idChannel
      )
      .then((response) => {
        setIsSub(response.result);
      })
      .catch((error) => {});
  };

  // API
  const handleSubscribe = () => {
    channelAPI
      .createChannelSubChannel({
        idChannel1: myAccount.channel.idChannel,
        idChannel2: video.result.channel.idChannel,
      })
      .then((response) => {
        console.log(response);
        getIsSub();
        getAmountSub();
        handleOpenSnackbar(
          "success",
          `Bạn vừa đăng ký kênh ${video.result.channel.name}`
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
        video.result.channel.idChannel
      )
      .then((response) => {
        console.log(response);
        getIsSub();
        getAmountSub();
        handleOpenSnackbar(
          "info",
          `Bạn vừa hủy đăng ký kênh ${video.result.channel.name}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getAmountLike = () => {
    videoAPI
      .countLikeVideo(video.result.idVideo)
      .then((response) => {
        setAmountLike(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const getIsLike = () => {
    videoAPI
      .checkChannelLikeVideo(myAccount.channel.idChannel, video.result.idVideo)
      .then((response) => {
        setIsLike(response.result);
      })
      .catch((error) => {});
  };

  // API
  const handleLikeVideo = () => {
    videoAPI
      .createChannelLikeVideo({
        idChannel: myAccount.channel.idChannel,
        idVideo: video.result.idVideo,
      })
      .then((response) => {
        console.log(response);
        getIsLike();
        getAmountLike();
        handleOpenSnackbar(
          "success",
          `Bạn vừa like video ${video.result.title}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const handleUnLikeVideo = () => {
    videoAPI
      .deleteHistoryLikeVideo(myAccount.channel.idChannel, video.result.idVideo)
      .then((response) => {
        console.log(response);
        getIsLike();
        getAmountLike();
        handleOpenSnackbar(
          "info",
          `Bạn vừa hủy like video ${video.result.title}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API
  const handleDownloadVideo = () => {
    handleOpenSnackbar("info", "Video sắp được tải")
    videoAPI
      .downloadVideo(video.result.idVideo, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${video.result.title}.mp4`; // Tên file khi tải xuống
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Failed to download video:", error);
      });
  };

  useEffect(() => {
    getIsSub();
    getIsLike();
    if (isSub !== null && isLike !== null) {
      setOpenBackdropInfoVideo(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSub, isLike]);

  return (
    <>
      <Box sx={{ display: "flex", pb: "450px" }}>
        <Box sx={{ width: "100%" }}>
          <Video
            titleVideo={video.result.title}
            linkVideo={video.result.linkVideo}
          />
          <Typography
            variant='h6'
            fontWeight='700'
            sx={{ mt: "12px", lineHeight: "1.4" }}
          >
            {video.result.title}
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
                  <Avatar alt='' src={video.result.channel.avatar} />
                  <Box sx={{ ml: "12px", lineHeight: "1" }}>
                    <Typography
                      variant='subtitle1'
                      sx={{ lineHeight: "1.3" }}
                      fontWeight='600'
                    >
                      {video.result.channel.name}
                    </Typography>
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
                      onClick={handleSubscribe}
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
                      onClick={handleUnSubscribe}
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
                    onClick={isLike ? handleUnLikeVideo : handleLikeVideo}
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
                    onClick={handleDownloadVideo}
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
                            onClick={handleClickOpenDialogListRadioReportVideo}
                          >
                            <ListItemButton>
                              <EmojiFlagsIcon />
                              <Typography sx={{ ml: "12px" }}>
                                Báo vi phạm
                              </Typography>
                            </ListItemButton>
                          </ListItem>
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
                  {`11.327.025 lượt xem \u00A0\u00A0\u00A0\u00A0\u00A0 ${formatDistanceToNow(
                    parseISO(video.result.dateTimeCreate),
                    { addSuffix: true, locale: vi }
                  )}
                  ${video.result.description}`}
                </ShowMoreText>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: "24px" }}>
            <Typography variant='h6' fontWeight='600'>
              85 bình luận
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
                    <ListItem disablePadding>
                      <ListItemButton selected={true}>
                        <Typography>Bình luận hàng đầu</Typography>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <Typography>Mới nhất xếp trước</Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", mt: "24px", width: "100%" }}>
            <Avatar alt='' src='' />
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                variant='standard'
                placeholder='Viết bình luận...'
                sx={{ ml: "12px", mb: "12px", ...textFieldStyles }}
                onClick={() => setShowActionComment(true)}
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
            <CommentVideo
              avatar=''
              nameUser='@khanhtranphuc5193'
              dateTimeComment='1 giờ trước'
              comment='hay quá 😃'
              type='comment-video'
            />
            <ListCommentComment />
            <CommentVideo
              avatar=''
              nameUser='@khanhtranphuc5193'
              dateTimeComment='1 giờ trước'
              comment='hay quá 😃'
              type='comment-video'
            />
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
          <RecommendVideoCard
            title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
            nameChannel='Name Channel'
            viewVideo='View Video'
            dateTimeCreateVideo='Date time create'
          />
          <RecommendVideoCard
            title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
            nameChannel='Name Channel'
            viewVideo='View Video'
            dateTimeCreateVideo='Date time create'
          />
        </Box>
      </Box>
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
    </>
  );
}

import {
  Avatar,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import ConfirmDeleteCommentVideo from "../dialog/ConfirmDeleteCommentVideo";
import InputCommentComment from "../InputCommentComment";
import { ThemeContext } from "../../context/ThemeContext";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import { AppContext } from "../../context/AppContext";
import videoAPI from "../../api/videoAPI";
import ListCommentComment from "../ListCommentComment";

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

const initialState = { refresh: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_REFRESH_COMMENT_COMMENT":
      return { ...state, refresh: !state.refresh };
    default:
      return state;
  }
};

export default function CommentVideo({
  idCommentVideo,
  idCommentInComment,
  avatar,
  nameUnique,
  nameUniqueByVideo,
  dateTimeComment,
  comment,
  type,
  getAllCommentVideo,
  countCommentVideosByVideo,
  getAllCommentComment,
  countCommentByCommentVideo,
  handleOpenSnackbar,
  stateSortComment,
  setOpenBackdropCommentVideo,
}) {
  const theme = useTheme();

  const { myAccount, sendNotification } = useContext(AppContext);

  const [stateRefreshCommentComment, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleRefreshCommentComment = () => {
    dispatch({ type: "TOGGLE_REFRESH_COMMENT_COMMENT" });
  };

  const [showActionEditCommented, setShowActionEditCommented] = useState(false);
  const [openDialogConfirmDeleteComment, setOpenDialogConfirmDeleteComment] =
    useState(false);
  const [openInputCommentComment, setOpenInputCommentComment] = useState(false);
  const [showListCommentComment, setShowListCommentComment] = useState(false);

  const editCommentedButtonRef = useRef(null);
  const listEditCommentedRef = useRef(null);

  const { themeMode } = useContext(ThemeContext);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [openInputComment, setOpenInputComment] = useState(false);
  const [valueComment, setValueComment] = useState(comment);
  const [valueEditComment, setValueEditComment] = useState(comment);

  const handleCancelComment = () => {
    setValueEditComment(valueComment);
    setShowEmojiPicker(false);
    setOpenInputComment(false);
  };

  const handlePostComment = () => {
    if (type === "comment-video")
      updateCommentVideoContent(idCommentVideo, valueEditComment);
    else if (type === "comment-comment")
      updateCommentCommentContent(idCommentInComment, valueEditComment);
    handleCancelComment();
  };

  const handleComment = (e) => {
    setValueEditComment(e.target.value);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (e) => {
    setValueEditComment((prev) => prev + e.emoji);
  };

  const toggleEditCommented = () => {
    if (!showActionEditCommented) setOpenInputComment(false);
    setShowActionEditCommented((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      listEditCommentedRef.current &&
      !listEditCommentedRef.current.contains(event.target) &&
      !editCommentedButtonRef.current.contains(event.target)
    ) {
      setShowActionEditCommented(false);
    }
  };

  const handleClickOpenDialogConfirmDeleteComment = () => {
    setOpenDialogConfirmDeleteComment(true);
    setShowActionEditCommented(false);
  };

  // API
  const updateCommentVideoContent = (idCommentVideo, content) => {
    videoAPI
      .updateCommentVideoContent(idCommentVideo, {
        content: content,
      })
      .then((response) => {
        if (valueComment !== valueEditComment) {
          setValueComment(response.result.content);
          setValueEditComment(response.result.content);
          handleOpenSnackbar(
            "success",
            "Thay đổi nội dung bình luận thành công!"
          );
        }
      })
      .catch((error) => {});
  };

  // API
  const updateCommentCommentContent = (idCommentInComment, content) => {
    videoAPI
      .updateCommentCommentContent(idCommentInComment, {
        content: content,
      })
      .then((response) => {
        if (valueComment !== valueEditComment) {
          setValueComment(response.result.content);
          setValueEditComment(response.result.content);
          handleOpenSnackbar(
            "success",
            "Thay đổi nội dung bình luận thành công!"
          );
        }
      })
      .catch((error) => {});
  };

  // API
  const deleteCommentVideo = () => {
    videoAPI
      .deleteCommentVideo(idCommentVideo)
      .then((response) => {
        getAllCommentVideo();
        countCommentVideosByVideo();
        sendNotification();
      })
      .catch((error) => {});
  };

  // API
  const deleteCommentComment = () => {
    videoAPI
      .deleteCommentComment(idCommentInComment)
      .then((response) => {
        getAllCommentComment();
        countCommentByCommentVideo();
        countCommentVideosByVideo();
        sendNotification();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: "12px",
        }}
      >
        <Avatar
          alt=''
          src={avatar}
          sx={{
            cursor: "pointer",
            width: type === "comment-comment" ? "24px" : "40px",
            height: type === "comment-comment" ? "24px" : "40px",
          }}
        />
        <Box sx={{ ml: "12px", flexGrow: "1" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{ mr: "4px", fontSize: "13px" }}
              fontWeight={600}
            >
              {nameUnique}
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "customGreySubTitle.main" }}
            >
              {dateTimeComment}
            </Typography>
          </Box>
          {openInputComment ? (
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                variant='standard'
                placeholder='Viết bình luận...'
                sx={{ mb: "12px", ...textFieldStyles }}
                value={valueEditComment}
                onChange={handleComment}
              />
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
                    label='Chỉnh sửa'
                    sx={{
                      p: "4px",
                      fontSize: "14px",
                      fontWeight: "600",
                      userSelect: "none",
                      cursor: "pointer",
                      bgcolor: valueEditComment ? "#3da2f9" : "",
                      color: valueEditComment ? "secondary.main" : "",
                      "&:hover": {
                        bgcolor: "#3da2f9",
                        opacity: "0.9",
                      },
                    }}
                    disabled={valueEditComment === ""}
                    onClick={handlePostComment}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography variant='subtitle2'>{valueComment}</Typography>
          )}
          {type !== "comment-comment" &&
            (openInputCommentComment ? (
              <InputCommentComment
                idCommentVideo={idCommentVideo}
                setOpenInputCommentComment={setOpenInputCommentComment}
                setShowListCommentComment={setShowListCommentComment}
                handleOpenSnackbar={handleOpenSnackbar}
                handleRefreshCommentComment={handleRefreshCommentComment}
              />
            ) : (
              <Typography
                sx={{ fontSize: "13px", mt: "8px", cursor: "pointer" }}
                fontWeight={600}
                onClick={() => setOpenInputCommentComment(true)}
              >
                Phản hồi
              </Typography>
            ))}
        </Box>
        {(myAccount?.channel.nameUnique === nameUnique ||
          myAccount?.channel.nameUnique === nameUniqueByVideo) && (
          <Box sx={{ position: "relative" }}>
            <IconButton
              ref={editCommentedButtonRef}
              onClick={toggleEditCommented}
            >
              <MoreVertIcon sx={{ cursor: "pointer" }} />
            </IconButton>
            {showActionEditCommented && (
              <Paper
                ref={listEditCommentedRef}
                sx={{
                  position: "absolute",
                  zIndex: "10",
                  minWidth: "150px",
                  borderRadius: "8px",
                  bgcolor: theme.palette.customBgcolorMenu.main,
                  boxShadow: theme.palette.customBoxShadowMenu.main,
                }}
              >
                <List>
                  <ListItem
                    disablePadding
                    onClick={() => {
                      setOpenInputComment(true);
                      setShowActionEditCommented(false);
                    }}
                  >
                    <ListItemButton>
                      <EditIcon />
                      <Typography sx={{ ml: "12px" }}>Chỉnh sửa</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    onClick={handleClickOpenDialogConfirmDeleteComment}
                  >
                    <ListItemButton>
                      <DeleteIcon />
                      <Typography sx={{ ml: "12px" }}>Xóa</Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            )}
          </Box>
        )}
      </Box>
      {(idCommentVideo || idCommentInComment) &&
        !(idCommentVideo && idCommentInComment) && (
          <ListCommentComment
            idCommentVideo={idCommentVideo}
            showListCommentComment={showListCommentComment}
            setShowListCommentComment={setShowListCommentComment}
            countCommentVideosByVideo={countCommentVideosByVideo}
            handleOpenSnackbar={handleOpenSnackbar}
            refresh={stateRefreshCommentComment.refresh}
            nameUniqueByVideo={nameUniqueByVideo}
            stateSortComment={stateSortComment}
            setOpenBackdropCommentVideo={setOpenBackdropCommentVideo}
          />
        )}
      <ConfirmDeleteCommentVideo
        type={type}
        openDialogConfirmDeleteComment={openDialogConfirmDeleteComment}
        setOpenDialogConfirmDeleteComment={setOpenDialogConfirmDeleteComment}
        deleteCommentVideo={deleteCommentVideo}
        deleteCommentComment={deleteCommentComment}
        handleOpenSnackbar={handleOpenSnackbar}
      />
    </>
  );
}

import { Avatar, Box, Chip, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import { ThemeContext } from "../../context/ThemeContext";
import videoAPI from "../../api/videoAPI";
import { AppContext } from "../../context/AppContext";
import { SnackbarContext } from "../../context/SnackbarContext";

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

export default function InputCommentComment({
  idCommentVideo,
  setOpenInputCommentComment,
  setShowListCommentComment,
  handleRefreshCommentComment,
}) {
  const { themeMode } = useContext(ThemeContext);
  const { myAccount, sendNotification } = useContext(AppContext);
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [valueComment, setValueComment] = useState("");

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleCancelComment = () => {
    setValueComment("");
    setShowEmojiPicker(false);
    setOpenInputCommentComment(false);
  };

  const handlePostComment = () => {
    videoAPI
      .createCommentComment({
        content: valueComment,
        idChannel: myAccount.channel.idChannel,
        idCommentVideo: idCommentVideo,
      })
      .then((response) => {
        sendNotification();
        setShowListCommentComment(true);
        handleOpenSnackbar(
          "success",
          "Bình luận thành công!",
          "bottom",
          "center"
        );
        handleRefreshCommentComment();
        handleCancelComment();
      })
      .catch((error) => {});
  };

  const handleComment = (e) => {
    setValueComment(e.target.value);
  };

  const handleEmojiClick = (e) => {
    setValueComment((prev) => prev + e.emoji);
  };

  return (
    <Box sx={{ display: "flex", mt: "24px", width: "100%" }}>
      <Avatar
        alt=''
        src={myAccount.channel.avatar}
        sx={{ width: "24px", height: "24px" }}
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TextField
          variant='standard'
          placeholder='Viết bình luận...'
          sx={{ ml: "12px", mb: "12px", ...textFieldStyles }}
          value={valueComment}
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
      </Box>
    </Box>
  );
}

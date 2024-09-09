import React, { useContext, useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Chip } from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import CommentVideo from "../CommentVideo";
import { ThemeContext } from "../../context/ThemeContext";
import videoAPI from "../../api/videoAPI";

export default function ListCommentComment({
  idCommentVideo,
  showListCommentComment,
  setShowListCommentComment,
  countCommentVideosByVideo,
  handleOpenSnackbar,
  refresh,
  nameUniqueByVideo,
}) {
  const { themeMode } = useContext(ThemeContext);

  const [listCommentComment, setListCommentComment] = useState([]);
  const [amountCommentComment, setAmountCommentComment] = useState(0);

  // API
  const getAllCommentComment = () => {
    videoAPI
      .getAllCommentComment(idCommentVideo)
      .then((response) => {
        setListCommentComment(response.result);
      })
      .catch((error) => {});
  };

  // API
  const countCommentByCommentVideo = () => {
    videoAPI
      .countCommentByCommentVideo(idCommentVideo)
      .then((response) => {
        setAmountCommentComment(response.result);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllCommentComment();
    countCommentByCommentVideo();
  }, [refresh]);

  return (
    <>
      {amountCommentComment !== 0 && (
        <Chip
          icon={
            showListCommentComment ? <ExpandLessIcon /> : <ExpandMoreIcon />
          }
          label={`${amountCommentComment} phản hồi`}
          sx={{
            p: "4px",
            bgcolor: "primary.main",
            color: "#3ea6ff",
            "&:hover": {
              backgroundColor: themeMode === "light" ? "#def1ff" : "#263850",
            },
            fontSize: "14px",
            cursor: "pointer",
            "& .MuiChip-icon": {
              color: "#3ea6ff",
            },
            ml: "52px",
          }}
          onClick={() => setShowListCommentComment((prev) => !prev)}
        />
      )}
      {showListCommentComment && (
        <Box sx={{ ml: "62px" }}>
          {listCommentComment.map((item) => (
            <CommentVideo
              key={item.idCommentInComment}
              idCommentVideo={idCommentVideo}
              idCommentInComment={item.idCommentInComment}
              avatar={item.channel.avatar}
              nameUnique={item.channel.nameUnique}
              nameUniqueByVideo={nameUniqueByVideo}
              dateTimeComment={formatDistanceToNow(
                parseISO(item.dateTimeComment),
                { addSuffix: true, locale: vi }
              )}
              comment={item.content}
              type='comment-comment'
              countCommentVideosByVideo={countCommentVideosByVideo}
              handleOpenSnackbar={handleOpenSnackbar}
              getAllCommentComment={getAllCommentComment}
              countCommentByCommentVideo={countCommentByCommentVideo}
            />
          ))}
        </Box>
      )}
    </>
  );
}

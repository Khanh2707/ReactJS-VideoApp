import React, { useContext, useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Chip } from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import CommentVideo from "../CommentVideo";
import { ThemeContext } from "../../context/ThemeContext";

export default function ListCommentComment({
  idCommentVideo,
  showListCommentComment,
  setShowListCommentComment,
  listCommentComment,
  getAllCommentComment,
  amountCommentComment,
  countCommentByCommentVideo,
  getAllCommentVideo,
  countCommentVideosByVideo,
  handleOpenSnackbar,
}) {
  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    getAllCommentComment(idCommentVideo);
    countCommentByCommentVideo(idCommentVideo);
  }, []);

  return (
    <>
      {amountCommentComment != 0 && (
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
          {listCommentComment.map((item) => {
            return (
              <CommentVideo
                key={item.idCommentInComment}
                idCommentInComment={item.idCommentInComment}
                avatar={item.channel.avatar}
                nameUnique={item.channel.nameUnique}
                dateTimeComment={formatDistanceToNow(
                  parseISO(item.dateTimeComment),
                  { addSuffix: true, locale: vi }
                )}
                comment={item.content}
                type='comment-comment'
                getAllCommentVideo={getAllCommentVideo}
                countCommentVideosByVideo={countCommentVideosByVideo}
                handleOpenSnackbar={handleOpenSnackbar}
              />
            );
          })}
        </Box>
      )}
    </>
  );
}

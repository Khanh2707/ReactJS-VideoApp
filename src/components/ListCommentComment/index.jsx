import React, { useContext, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Chip } from "@mui/material";
import CommentVideo from "../CommentVideo";
import { ThemeContext } from "../../context/ThemeContext";

export default function ListCommentComment() {
  const { themeMode } = useContext(ThemeContext);

  const [showListCommentComment, setShowListCommentComment] = useState(false);

  return (
    <>
      <Chip
        icon={showListCommentComment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        label='1 phản hồi'
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
      {showListCommentComment && (
        <Box sx={{ ml: "62px" }}>
          <CommentVideo
            avatar=''
            nameUser='@khanhtranphuc5193'
            dateTimeComment='1 giờ trước'
            comment='hay quá 😃'
            type='comment-comment'
          />
          <CommentVideo
            avatar=''
            nameUser='@khanhtranphuc5193'
            dateTimeComment='1 giờ trước'
            comment='hay quá 😃'
            type='comment-comment'
          />
        </Box>
      )}
    </>
  );
}

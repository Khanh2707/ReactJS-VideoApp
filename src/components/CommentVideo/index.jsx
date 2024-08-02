import {
  Avatar,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import ConfirmDeleteCommentVideo from "../dialog/ConfirmDeleteCommentVideo";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CommentVideo({
  avatar,
  nameUser,
  dateTimeComment,
  comment,
  type,
}) {
  const [showActionEditCommented, setShowActionEditCommented] = useState(false);
  const editCommentedButtonRef = useRef(null);
  const listEditCommentedRef = useRef(null);
  const [openDialogConfirmDeleteComment, setOpenDialogConfirmDeleteComment] =
    useState(false);
  const [showListCommentComment, setShowListCommentComment] = useState(true);

  const theme = useTheme();

  const toggleEditCommented = () => {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {type === "comment-comment" && (
        <Chip
          icon={
            showListCommentComment ? <ExpandMoreIcon /> : <ExpandLessIcon />
          }
          label='1 phản hồi'
          sx={{
            p: "4px",
            bgcolor: "primary.main",
            color: "#3ea6ff",
            "&:hover": {
              bgcolor: "#263850",
            },
            fontSize: "14px",
            cursor: "pointer",
            "& .MuiChip-icon": {
              color: "#3ea6ff",
            },
            ml: type === "comment-comment" ? "52px" : "",
          }}
          onClick={() => setShowListCommentComment((prev) => !prev)}
        />
      )}
      {(type === "comment-video" ||
        (showListCommentComment && type === "comment-comment")) && (
        <Box
          sx={{
            display: "flex",
            mt: "12px",
            pl: type === "comment-comment" ? "62px" : "",
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
                {nameUser}
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "customGreySubTitle.main" }}
              >
                {dateTimeComment}
              </Typography>
            </Box>
            <Typography variant='subtitle2'>{comment}</Typography>
            <Typography
              sx={{ fontSize: "13px", mt: "8px", cursor: "pointer" }}
              fontWeight={600}
            >
              Phản hồi
            </Typography>
          </Box>
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
                  <ListItem disablePadding>
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
        </Box>
      )}
      <ConfirmDeleteCommentVideo
        openDialogConfirmDeleteComment={openDialogConfirmDeleteComment}
        setOpenDialogConfirmDeleteComment={setOpenDialogConfirmDeleteComment}
      />
    </>
  );
}

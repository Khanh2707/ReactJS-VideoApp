import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmDeleteCommentVideo({
  type,
  openDialogConfirmDeleteComment,
  setOpenDialogConfirmDeleteComment,
  deleteCommentVideo,
  deleteCommentComment,
  getAllCommentVideo,
  countCommentVideosByVideo,
  handleOpenSnackbar,
}) {
  const handleCloseDialogConfirmDeleteComment = () => {
    if (type === "comment-video") deleteCommentVideo();
    if (type === "comment-comment") deleteCommentComment();
    getAllCommentVideo();
    countCommentVideosByVideo();
    handleOpenSnackbar("info", "Xóa bình luận thành công!");
    setOpenDialogConfirmDeleteComment(false);
  };

  return (
    <Dialog open={openDialogConfirmDeleteComment} disableScrollLock>
      <DialogTitle>Xóa bình luận</DialogTitle>
      <DialogContent>
        <DialogContentText>Xóa bình luận của bạn vĩnh viễn?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={() => setOpenDialogConfirmDeleteComment(false)}
        >
          Hủy
        </Button>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={handleCloseDialogConfirmDeleteComment}
          autoFocus
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

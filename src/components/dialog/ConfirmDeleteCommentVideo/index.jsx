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
  openDialogConfirmDeleteComment,
  setOpenDialogConfirmDeleteComment,
}) {
  const handleCloseDialogConfirmDeleteComment = () => {
    setOpenDialogConfirmDeleteComment(false);
  };

  return (
    <Dialog
      open={openDialogConfirmDeleteComment}
      onClose={handleCloseDialogConfirmDeleteComment}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableScrollLock
    >
      <DialogTitle id='alert-dialog-title'>Xóa bình luận</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Xóa bình luận của bạn vĩnh viễn?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={handleCloseDialogConfirmDeleteComment}
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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmDeleteAllWatchedVideo({
  openDialogConfirmDeleteAllWatchedVideo,
  setOpenDialogConfirmDeleteAllWatchedVideo,
  deleteAllWatchedVideo,
}) {
  const handleCloseDialogConfirmDeleteComment = () => {
    setOpenDialogConfirmDeleteAllWatchedVideo(false);
  };

  return (
    <Dialog
      open={openDialogConfirmDeleteAllWatchedVideo}
      onClose={handleCloseDialogConfirmDeleteComment}
      disableScrollLock
    >
      <DialogTitle>Xóa video đã xem</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Xóa tất cả video đã xem vĩnh viễn?
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
          onClick={() => {
            deleteAllWatchedVideo();
            handleCloseDialogConfirmDeleteComment();
          }}
          autoFocus
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmDeleteVideo({
  openDialogConfirmDeleteVideo,
  setOpenDialogConfirmDeleteVideo,
  handleDeleteVideo,
}) {
  const handleCloseDialogConfirmDeleteVideo = () => {
    handleDeleteVideo();
    setOpenDialogConfirmDeleteVideo(false);
  };

  return (
    <Dialog open={openDialogConfirmDeleteVideo} disableScrollLock>
      <DialogTitle>Xóa video</DialogTitle>
      <DialogContent>
        <DialogContentText>Xóa video của bạn vĩnh viễn?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={() => setOpenDialogConfirmDeleteVideo(false)}
        >
          Hủy
        </Button>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={handleCloseDialogConfirmDeleteVideo}
          autoFocus
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

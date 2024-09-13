import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function LockVideo({
  openDialogLockVideo,
  setOpenDialogLockVideo,
  handleUpdateLockVideo,
}) {
  return (
    <Dialog
      open={openDialogLockVideo}
      disableScrollLock
      sx={{ "& .MuiDialog-paper": { maxWidth: "300px" } }}
    >
      <DialogTitle>Khóa video</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn rằng video này vi phạm chính sách ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={() => setOpenDialogLockVideo(false)}
        >
          Hủy
        </Button>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          autoFocus
          onClick={handleUpdateLockVideo}
        >
          Khóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

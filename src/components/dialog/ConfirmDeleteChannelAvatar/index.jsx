import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmDeleteChannelAvatar({
  openDialogConfirmDeleteChannelAvatar,
  setOpenDialogConfirmDeleteChannelAvatar,
  handleDeleteAvatar,
}) {
  const handleCloseDialogConfirmDeleteChannelAvatar = () => {
    setOpenDialogConfirmDeleteChannelAvatar(false);
  };

  return (
    <Dialog
      open={openDialogConfirmDeleteChannelAvatar}
      onClose={handleCloseDialogConfirmDeleteChannelAvatar}
      disableScrollLock
    >
      <DialogTitle>Xóa ảnh hồ sơ</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn chắc chắn muốn xóa ảnh hồ sơ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={handleCloseDialogConfirmDeleteChannelAvatar}
        >
          Hủy
        </Button>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={() => {
            handleDeleteAvatar();
            handleCloseDialogConfirmDeleteChannelAvatar();
          }}
          autoFocus
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

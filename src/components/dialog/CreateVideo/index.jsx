import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ThemeContext } from "../../../context/ThemeContext";

export default function CreateVideo({
  openDialogCreateVideo,
  setOpenDialogCreateVideo,
}) {
  const [fileVideo, setFileVideo] = useState();
  const [error, setError] = useState("");

  const { themeMode } = useContext(ThemeContext);
  const buttonSelectFileVideoRef = useRef(null);

  const handleCloseDialogCreateVideo = () => {
    setOpenDialogCreateVideo(false);
    setError("");
  };

  const handleSelectFileVideo = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "video/mp4") {
      file.preview = URL.createObjectURL(file);
      setFileVideo(file);
      setError("");
    } else {
      setError("Định dạng không hợp lệ");
      setFileVideo(null);
    }
  };

  useEffect(() => {
    if (fileVideo) {
      console.log("Video đã được chọn:", fileVideo);
    }

    return () => {
      fileVideo && URL.revokeObjectURL(fileVideo.preview);
    };
  }, [fileVideo]);

  const handleClickIcon = () => {
    buttonSelectFileVideoRef.current.click();
  };

  return (
    <Dialog
      open={openDialogCreateVideo}
      onClose={handleCloseDialogCreateVideo}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='xs'
      fullWidth
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle id='alert-dialog-title' sx={{ fontWeight: "700" }}>
        {"Tải video lên"}
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
        }}
      >
        <Box
          onClick={handleClickIcon}
          sx={{
            width: "136px",
            height: "136px",
            borderRadius: "50%",
            bgcolor: themeMode === "light" ? "#ddd" : "rgb(22, 22, 22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: "0.6",
          }}
        >
          <FileUploadIcon sx={{ fontSize: "60px" }} />
        </Box>
        <input
          type='file'
          ref={buttonSelectFileVideoRef}
          onChange={handleSelectFileVideo}
          style={{ display: "none" }}
          // accept="video/mp4"
        />
        <Typography>Chọn video để tải lên</Typography>
        {error && (
          <Typography color='error' variant='subtitle2'>
            {error}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

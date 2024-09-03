import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Chip,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import channelAPI from "../../api/channelAPI";
import ConfirmDeleteChannelAvatar from "../dialog/ConfirmDeleteChannelAvatar";

export default function ChannelEditingImages() {
  const { myAccount } = useContext(AppContext);

  const [avatar, setAvatar] = useState(myAccount?.channel.avatar);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");
  const [
    openDialogConfirmDeleteChannelAvatar,
    setOpenDialogConfirmDeleteChannelAvatar,
  ] = useState(false);

  const fileInputRef = useRef(null);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (state, message) => {
    setOpenSnackbar(false);

    setStateAlert(state);
    setContentAlert(message);

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 100);
  };

  const handleChangeAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    handleOpenSnackbar("info", "Ảnh hồ sơ đang được thay đổi!");
    const file = event.target.files[0];
    if (file) {
      const formDataUpdateAvatar = new FormData();
      formDataUpdateAvatar.append("fileAvatar", file);
      formDataUpdateAvatar.append("delete", false);

      channelAPI
        .updateChannelAvatar(
          myAccount.channel.idChannel,
          formDataUpdateAvatar,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setAvatar(response.result.avatar);
          handleOpenSnackbar("success", "Thay đổi ảnh hồ sơ thành công!");
        })
        .catch((error) => {
          console.error("Error updating avatar", error);
        });
    }
  };

  const handleDeleteAvatar = () => {
    handleOpenSnackbar("info", "Ảnh hồ sơ đang được xóa!");

    const formDataUpdateAvatar = new FormData();
    formDataUpdateAvatar.append(
      "fileAvatar",
      new Blob([], { type: "application/octet-stream" }),
      "empty-file"
    );
    formDataUpdateAvatar.append("delete", true);

    channelAPI
      .updateChannelAvatar(myAccount.channel.idChannel, formDataUpdateAvatar, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAvatar(null);
        handleOpenSnackbar("success", "Ảnh hồ sơ đã xóa thành công!");
      })
      .catch((error) => {
        console.error("Error updating avatar", error);
      });
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          width: "628px",
          cursor: "pointer",
        }}
      >
        <Paper sx={{ width: "290px" }}>
          <Avatar
            alt=''
            src={avatar}
            sx={{
              width: "140px",
              height: "140px",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </Paper>
        <CardContent sx={{ width: "382px" }}>
          <Typography variant='subtitle1'>Ảnh</Typography>
          <Typography
            variant='subtitle2'
            component='div'
            sx={{ color: "customGreySubTitle.main" }}
          >
            Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên Vineo tại những vị
            trí như bên cạnh bình luận và video của bạn
          </Typography>
          <Paper sx={{ mt: "8px" }}>
            <Chip
              label='Thay đổi'
              sx={{
                p: "4px",
                mr: "8px",
              }}
              onClick={handleChangeAvatar}
            />
            <Chip
              label='Xóa'
              sx={{
                p: "4px",
              }}
              onClick={() => {
                console.log(avatar);
                if (avatar === null)
                  handleOpenSnackbar("warning", "Bạn chưa có ảnh hồ sơ!");
                else setOpenDialogConfirmDeleteChannelAvatar(true);
              }}
            />
          </Paper>
        </CardContent>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={stateAlert}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {contentAlert}
        </Alert>
      </Snackbar>
      <ConfirmDeleteChannelAvatar
        openDialogConfirmDeleteChannelAvatar={
          openDialogConfirmDeleteChannelAvatar
        }
        setOpenDialogConfirmDeleteChannelAvatar={
          setOpenDialogConfirmDeleteChannelAvatar
        }
        handleDeleteAvatar={handleDeleteAvatar}
      />
    </>
  );
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import typeReportVideoAPI from "../../../api/typeReportVideoAPI";
import reportVideoAPI from "../../../api/reportVideoAPI";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { SnackbarContext } from "../../../context/SnackbarContext";

export default function ListRadioReportVideo({
  openDialogListRadioReportVideo,
  setOpenDialogListRadioReportVideo,
}) {
  const { myAccount } = useContext(AppContext);
  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const { idVideo } = useParams();

  const [listTypeReportVideo, setListTypeReportVideo] = useState([]);
  const [valueReportVideo, setValueReportVideo] = useState("");

  const handleCloseDialogListRadioReportVideo = () => {
    setOpenDialogListRadioReportVideo(false);
    setValueReportVideo("");
  };

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setValueReportVideo(event.target.value);
  };

  const handleSubmit = () => {
    createReportVideo();

    handleCloseDialogListRadioReportVideo();
  };

  const getAllTypeReportVideo = () => {
    typeReportVideoAPI
      .getAllTypeReportVideos(0, 100)
      .then((response) => {
        setListTypeReportVideo(response.result.content);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllTypeReportVideo();
  }, []);

  const createReportVideo = () => {
    reportVideoAPI
      .createReportVideo({
        idTypeReportVideo: valueReportVideo,
        idChannel: myAccount.channel.idChannel,
        idVideo: idVideo,
      })
      .then((response) => {
        handleOpenSnackbar(
          "success",
          "Chúng tôi đã ghi nhận báo cáo của bạn!",
          "bottom",
          "center"
        );
      })
      .catch((error) => {});
  };

  return (
    <Dialog
      open={openDialogListRadioReportVideo}
      onClose={handleCloseDialogListRadioReportVideo}
      disableScrollLock
    >
      <DialogTitle>
        <FormControl>
          <Typography variant='h6' sx={{ mb: "24px" }}>
            Báo video vi phạm
          </Typography>
          <RadioGroup value={valueReportVideo} onChange={handleRadioChange}>
            {listTypeReportVideo.map((item, index) => {
              return (
                <FormControlLabel
                  key={item.idTypeReportVideo}
                  value={item.idTypeReportVideo}
                  label={item.description}
                  control={<Radio />}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </DialogTitle>
      <DialogActions>
        <Button
          sx={{ color: "text.primary", fontWeight: "600" }}
          onClick={handleCloseDialogListRadioReportVideo}
        >
          Hủy
        </Button>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={handleSubmit}
          autoFocus
          disabled={valueReportVideo === ""}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
}

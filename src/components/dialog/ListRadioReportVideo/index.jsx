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
import React, { useState } from "react";

export default function ListRadioReportVideo({
  openDialogListRadioReportVideo,
  setOpenDialogListRadioReportVideo,
}) {
  const [valueReportVideo, setValueReportVideo] = useState("");

  const handleCloseDialogListRadioReportVideo = () => {
    setOpenDialogListRadioReportVideo(false);
    setValueReportVideo("");
  };

  const handleRadioChange = (event) => {
    setValueReportVideo(event.target.value);
  };

  const handleSubmit = () => {
    handleCloseDialogListRadioReportVideo();
  };

  return (
    <Dialog
      open={openDialogListRadioReportVideo}
      onClose={handleCloseDialogListRadioReportVideo}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <FormControl>
          <Typography variant='h6' sx={{ mb: "24px" }}>
            Báo video vi phạm
          </Typography>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            value={valueReportVideo}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value='1'
              control={<Radio />}
              label='Nội dung khiêu dâm'
            />
            <FormControlLabel
              value='2'
              control={<Radio />}
              label='Nội dung bạo lực hoặc phản cảm'
            />
            <FormControlLabel
              value='3'
              control={<Radio />}
              label='Nội dung lăng mạ hoặc kích động thù hận'
            />
            <FormControlLabel
              value='4'
              control={<Radio />}
              label='Nội dung quấy rối hoặc bắt nạt'
            />
            <FormControlLabel
              value='5'
              control={<Radio />}
              label='Hành động gây hại hoặc nguy hiểm'
            />
            <FormControlLabel
              value='6'
              control={<Radio />}
              label='Thông tin sai lệch'
            />
            <FormControlLabel
              value='7'
              control={<Radio />}
              label='Nội dung liên quan đến việc ngược đãi trẻ em'
            />
            <FormControlLabel
              value='8'
              control={<Radio />}
              label='Nội dung quảng bá chủ nghĩa khủng bố'
            />
            <FormControlLabel
              value='9'
              control={<Radio />}
              label='Nội dung gian lận/vi phạm hoặc gây hiểu lầm'
            />
            <FormControlLabel
              value='10'
              control={<Radio />}
              label='Vấn đề pháp lý'
            />
            <FormControlLabel
              value='11'
              control={<Radio />}
              label='Phụ đề có vấn đề'
            />
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

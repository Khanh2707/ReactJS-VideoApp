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

const listRadioReport = [
  {
    value: "1",
    label: "Nội dung khiêu dâm",
  },
  {
    value: "2",
    label: "Nội dung bạo lực hoặc phản cảm",
  },
  {
    value: "3",
    label: "Nội dung lăng mạ hoặc kích động thù hận",
  },
  {
    value: "4",
    label: "Nội dung quấy rối hoặc bắt nạt",
  },
  {
    value: "5",
    label: "Hành động gây hại hoặc nguy hiểm",
  },
  {
    value: "6",
    label: "Thông tin sai lệch",
  },
  {
    value: "7",
    label: "Nội dung liên quan đến việc ngược đãi trẻ em",
  },
  {
    value: "8",
    label: "Nội dung quảng bá chủ nghĩa khủng bố",
  },
  {
    value: "9",
    label: "Nội dung gian lận/vi phạm hoặc gây hiểu lầm",
  },
  {
    value: "10",
    label: "Vấn đề pháp lý",
  },
  {
    value: "11",
    label: "Phụ đề có vấn đề",
  },
];

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
      disableScrollLock
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
            {listRadioReport.map((item, index) => {
              return (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  label={item.label}
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

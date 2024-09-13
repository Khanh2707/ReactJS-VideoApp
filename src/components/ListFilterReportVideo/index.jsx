import {
  Box,
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
import React, { useState, useEffect } from "react";
import typeReportVideoAPI from "../../api/typeReportVideoAPI";

const listOptionSort = [
  {
    value: "desc",
    label: "Giảm dần",
  },
  {
    value: "asc",
    label: "Tăng dần",
  },
];

const listPropertySort = [
  {
    value: "dateTimeReport",
    label: "Thời gian báo cáo",
  },
];

export default function ListFilterReportVideo({
  openDialogListFilterReportVideo,
  setOpenDialogListFilterReportVideo,
  optionSort,
  setOptionSort,
  propertySearch,
  setPropertySearch,
  idTypeReportVideo,
  setIdTypeReportVideo,
}) {
  const [listTypeReportVideo, setListTypeReportVideo] = useState([]);

  const [tempOptionSort, setTempOptionSort] = useState(optionSort);
  const [tempPropertySearch, setTempPropertySearch] = useState(propertySearch);
  const [tempIdTypeReportVideo, setTempIdTypeReportVideo] =
    useState(idTypeReportVideo);

  const handleCloseDialogListFilterReportVideo = () => {
    setOpenDialogListFilterReportVideo(false);
  };

  const handleOptionSortChange = (event) => {
    setTempOptionSort(event.target.value);
  };

  const handlePropertySortChange = (event) => {
    setTempPropertySearch(event.target.value);
  };

  const handleTypeReportVideoChange = (event) => {
    setTempIdTypeReportVideo(event.target.value);
  };

  const handleSubmit = () => {
    setOptionSort(tempOptionSort);
    setPropertySearch(tempPropertySearch);
    setIdTypeReportVideo(tempIdTypeReportVideo);
    handleCloseDialogListFilterReportVideo();
  };

  const getAllTypeReportVideos = () => {
    typeReportVideoAPI
      .getAllTypeReportVideos(0, 100)
      .then((response) => {
        setListTypeReportVideo(response.result.content);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllTypeReportVideos();
  }, []);

  useEffect(() => {
    if (openDialogListFilterReportVideo) {
      setTempOptionSort(optionSort);
      setTempPropertySearch(propertySearch);
      setTempIdTypeReportVideo(idTypeReportVideo);
    }
  }, [
    openDialogListFilterReportVideo,
    optionSort,
    propertySearch,
    idTypeReportVideo,
  ]);

  return (
    <Dialog
      open={openDialogListFilterReportVideo}
      onClose={handleCloseDialogListFilterReportVideo}
      disableScrollLock
    >
      <DialogTitle>
        <FormControl>
          <Typography variant='h6' sx={{ mb: "24px" }}>
            Lọc tài khoản theo
          </Typography>
          <Box sx={{ display: "flex", gap: "40px", alignItems: "start" }}>
            <RadioGroup
              value={tempOptionSort}
              onChange={handleOptionSortChange}
            >
              {listOptionSort.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
            <RadioGroup
              value={tempPropertySearch}
              onChange={handlePropertySortChange}
            >
              {listPropertySort.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
            <RadioGroup
              value={tempIdTypeReportVideo}
              onChange={handleTypeReportVideoChange}
            >
              <FormControlLabel
                key={0}
                value={0}
                label={"Tất cả"}
                control={<Radio />}
              />
              {listTypeReportVideo.map((item) => (
                <FormControlLabel
                  key={item.idTypeReportVideo}
                  value={item.idTypeReportVideo}
                  label={item.description}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </Box>
        </FormControl>
      </DialogTitle>
      <DialogActions>
        <Button
          sx={{ color: "text.primary", fontWeight: "600" }}
          onClick={handleCloseDialogListFilterReportVideo}
        >
          Hủy
        </Button>
        <Button
          sx={{ color: "#3ea6ff", fontWeight: "600" }}
          onClick={handleSubmit}
          autoFocus
          disabled={tempOptionSort === "" || tempPropertySearch === ""}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
}

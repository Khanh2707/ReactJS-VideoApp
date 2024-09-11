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
    value: "dateTimeCreate",
    label: "Thời gian tạo",
  },
  {
    value: "view",
    label: "Lượt xem",
  },
  {
    value: "amountLike",
    label: "Lượt thích",
  },
  {
    value: "amountComment",
    label: "Lượt bình luận",
  },
];

export default function ListFilterMyVideo({
  openDialogListFilterMyVideo,
  setOpenDialogListFilterMyVideo,
  optionSort,
  setOptionSort,
  propertySearch,
  setPropertySearch,
}) {
  const [tempOptionSort, setTempOptionSort] = useState(optionSort);
  const [tempPropertySearch, setTempPropertySearch] = useState(propertySearch);

  useEffect(() => {
    if (openDialogListFilterMyVideo) {
      setTempOptionSort(optionSort);
      setTempPropertySearch(propertySearch);
    }
  }, [openDialogListFilterMyVideo, optionSort, propertySearch]);

  const handleCloseDialogListFilterMyVideo = () => {
    setOpenDialogListFilterMyVideo(false);
  };

  const handleOptionSortChange = (event) => {
    setTempOptionSort(event.target.value);
  };

  const handlePropertySortChange = (event) => {
    setTempPropertySearch(event.target.value);
  };

  const handleSubmit = () => {
    setOptionSort(tempOptionSort);
    setPropertySearch(tempPropertySearch);
    handleCloseDialogListFilterMyVideo();
  };

  return (
    <Dialog
      open={openDialogListFilterMyVideo}
      onClose={handleCloseDialogListFilterMyVideo}
      disableScrollLock
    >
      <DialogTitle>
        <FormControl>
          <Typography variant='h6' sx={{ mb: "24px" }}>
            Sắp xếp video
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
          </Box>
        </FormControl>
      </DialogTitle>
      <DialogActions>
        <Button
          sx={{ color: "text.primary", fontWeight: "600" }}
          onClick={handleCloseDialogListFilterMyVideo}
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

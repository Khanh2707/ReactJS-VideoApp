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
import categoryVideoAPI from "../../../api/categoryVideoAPI";

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
  idCategory,
  setIdCategory,
}) {
  const [listCategory, setListCategory] = useState([]);

  const [tempOptionSort, setTempOptionSort] = useState(optionSort);
  const [tempPropertySearch, setTempPropertySearch] = useState(propertySearch);
  const [tempIdCategory, setTempIdCategory] = useState(idCategory);

  const handleCloseDialogListFilterMyVideo = () => {
    setOpenDialogListFilterMyVideo(false);
  };

  const handleOptionSortChange = (event) => {
    setTempOptionSort(event.target.value);
  };

  const handlePropertySortChange = (event) => {
    setTempPropertySearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setTempIdCategory(event.target.value);
  };

  const handleSubmit = () => {
    setOptionSort(tempOptionSort);
    setPropertySearch(tempPropertySearch);
    setIdCategory(tempIdCategory);
    handleCloseDialogListFilterMyVideo();
  };

  const getAllCategory = () => {
    categoryVideoAPI
      .getAllCategory()
      .then((response) => {
        setListCategory(response.result);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (openDialogListFilterMyVideo) {
      setTempOptionSort(optionSort);
      setTempPropertySearch(propertySearch);
      setTempIdCategory(idCategory);
    }
  }, [openDialogListFilterMyVideo, optionSort, propertySearch, idCategory]);

  return (
    <Dialog
      open={openDialogListFilterMyVideo}
      onClose={handleCloseDialogListFilterMyVideo}
      disableScrollLock
    >
      <DialogTitle>
        <FormControl>
          <Typography variant='h6' sx={{ mb: "24px" }}>
            Lọc video theo
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
            <RadioGroup value={tempIdCategory} onChange={handleCategoryChange}>
              <FormControlLabel
                key={0}
                value={0}
                label={"Tất cả"}
                control={<Radio />}
              />
              {listCategory.map((item) => (
                <FormControlLabel
                  key={item.idCategory}
                  value={item.idCategory}
                  label={item.nameCategory}
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

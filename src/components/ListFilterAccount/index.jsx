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
import roleAPI from "../../api/roleAPI";

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
    value: "amountVideo",
    label: "Số lượng video",
  },
];

export default function ListFilterAccount({
  openDialogListFilterAccount,
  setOpenDialogListFilterAccount,
  optionSort,
  setOptionSort,
  propertySearch,
  setPropertySearch,
  idRole,
  setIdRole,
}) {
  const [listRole, setListRole] = useState([]);

  const [tempOptionSort, setTempOptionSort] = useState(optionSort);
  const [tempPropertySearch, setTempPropertySearch] = useState(propertySearch);
  const [tempIdRole, setTempIdRole] = useState(idRole);

  const handleCloseDialogListFilterAccount = () => {
    setOpenDialogListFilterAccount(false);
  };

  const handleOptionSortChange = (event) => {
    setTempOptionSort(event.target.value);
  };

  const handlePropertySortChange = (event) => {
    setTempPropertySearch(event.target.value);
  };

  const handleRoleChange = (event) => {
    setTempIdRole(event.target.value);
  };

  const handleSubmit = () => {
    setOptionSort(tempOptionSort);
    setPropertySearch(tempPropertySearch);
    setIdRole(tempIdRole);
    handleCloseDialogListFilterAccount();
  };

  const getAllRole = () => {
    roleAPI
      .getAllRole()
      .then((response) => {
        setListRole(response.result);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllRole();
  }, []);

  useEffect(() => {
    if (openDialogListFilterAccount) {
      setTempOptionSort(optionSort);
      setTempPropertySearch(propertySearch);
      setTempIdRole(idRole);
    }
  }, [openDialogListFilterAccount, optionSort, propertySearch, idRole]);

  return (
    <Dialog
      open={openDialogListFilterAccount}
      onClose={handleCloseDialogListFilterAccount}
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
            <RadioGroup value={tempIdRole} onChange={handleRoleChange}>
              <FormControlLabel
                key={0}
                value={0}
                label={"Tất cả"}
                control={<Radio />}
              />
              {listRole.map((item) => (
                <FormControlLabel
                  key={item.idRole}
                  value={item.idRole}
                  label={
                    item.name === "ADMIN"
                      ? "Quản trị viên"
                      : item.name === "CENSOR"
                      ? "Người kiểm duyệt"
                      : item.name === "USER"
                      ? "Người dùng"
                      : "Không xác định"
                  }
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
          onClick={handleCloseDialogListFilterAccount}
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

import {
  Alert,
  Avatar,
  Box,
  Chip,
  IconButton,
  InputBase,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import videoAPI from "../../../api/videoAPI";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AppContext } from "../../../context/AppContext";
import MuiPagination from "@mui/material/Pagination";
import { GridPagination } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import accountAPI from "../../../api/accountAPI";
import { Link } from "react-router-dom";
import ListFilterAccount from "../../ListFilterAccount";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color='primary'
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function QuickSearchToolbar({
  searchValue,
  setSearchValue,
  fetchData,
  setOpenDialogListFilterAccount,
}) {
  const theme = useTheme();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") fetchData();
  };

  const handleClearSearch = () => {
    setSearchValue("");
    fetchData();
  };

  return (
    <Box
      sx={{
        pl: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant='h6' fontWeight='600'>
        Tất cả video
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <IconButton type='button'>
            <SearchIcon />
          </IconButton>
          <InputBase
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              borderBottom: `1px solid ${theme.palette.text.primary}`,
            }}
            placeholder='Tìm kiếm... '
          />
          <IconButton
            type='button'
            onClick={handleClearSearch}
            sx={{ visibility: searchValue ? "visible" : "hidden" }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <Chip
          icon={<TuneIcon />}
          label='Bộ lọc'
          sx={{
            p: "4px",
            fontSize: "14px",
            fontWeight: "600",
            bgcolor: "rgba(0, 0, 0, 0)",
            "& .MuiChip-icon": {
              color: "text.primary",
            },
          }}
          onClick={() => setOpenDialogListFilterAccount(true)}
        />
      </Box>
    </Box>
  );
}

const columns = [
  {
    field: "avatarChannel",
    headerName: "Ảnh đại diện",
    renderCell: (params) => (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to={`/${params.row.channel?.nameUnique}`}>
          <Avatar alt='' src={params.row.channel?.avatar} />
        </Link>
      </Box>
    ),
  },
  {
    field: "username",
    headerName: "Tên tài khoản",
    width: 150,
  },
  {
    field: "dateTimeCreate",
    headerName: "Thời gian tạo",
    width: 150,
    valueGetter: (value) => {
      return formatDistanceToNow(parseISO(value), {
        addSuffix: true,
        locale: vi,
      });
    },
  },
  {
    field: "nameUniqueChannel",
    headerName: "Id kênh",
    width: 150,
    valueGetter: (params, row) => {
      return row.channel?.nameUnique;
    },
  },
  {
    field: "nameChannel",
    headerName: "Tên kênh",
    width: 150,
    valueGetter: (params, row) => {
      return row.channel?.name;
    },
  },
  {
    field: "roles",
    headerName: "Vai trò",
    width: 150,
    valueGetter: (value) => {
      if (value[0].name === "ADMIN") return "Người quản trị";
      else if (value[0].name === "CENSOR") return "Người kiểm duyệt";
      else if (value[0].name === "USER") return "Người dùng";
    },
  },
  {
    field: "amountVideo",
    headerName: "Số lượng video",
    width: 120,
    type: "number",
  },
];

export default function DataGridAllAccount() {
  const { myAccount } = useContext(AppContext);

  const [allAccounts, setAllAccounts] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 4,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [optionSort, setOptionSort] = useState("desc");
  const [propertySearch, setPropertySearch] = useState("dateTimeCreate");
  const [idRole, setIdRole] = useState(0);
  const [openDialogListFilterAccount, setOpenDialogListFilterAccount] =
    useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");

  const { page, pageSize } = paginationModel;

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

  const handleProcessRowUpdate = (newRow) => {
    videoAPI
      .updateRoleAccount(newRow.roles.idRole, newRow)
      .then((response) => {
        handleOpenSnackbar("success", "Cập nhật thành công!");
      })
      .catch((error) => {});

    return newRow;
  };

  const fetchData = async (searchValue) => {
    setIsLoading(true);

    try {
      let accountResponse;

      if (!searchValue) {
        accountResponse = await accountAPI.getAllAccount(
          propertySearch,
          optionSort,
          page,
          pageSize,
          idRole
        );
      } else {
        accountResponse = await accountAPI.getAllSearchAccountByChannelName(
          searchValue,
          propertySearch,
          optionSort,
          page,
          pageSize,
          idRole
        );
      }

      if (!accountResponse || !accountResponse.result) {
        throw new Error("Invalid response from API");
      }

      const updatedAccounts = await Promise.all(
        accountResponse.result.content.map(async (account) => {
          try {
            const amountVideoResponse =
              await videoAPI.countAllByChannelNameUnique(
                account?.channel?.nameUnique
              );
            const amountVideo = amountVideoResponse.result;

            return {
              ...account,
              amountVideo,
            };
          } catch (error) {
            console.log(
              "Error fetching amountLike or amountComment for video:",
              video.idVideo,
              error
            );
            return { ...video, amountVideo: 0 };
          }
        })
      );

      setAllAccounts(updatedAccounts);
      setRowCount(accountResponse.result.totalElements);
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [
    page,
    pageSize,
    searchValue,
    propertySearch,
    optionSort,
    idRole,
  ]);

  return (
    <>
      <Typography variant='h4' fontWeight='700' sx={{ pb: "20px" }}>
        Thống kê tài khoản
      </Typography>
      <DataGrid
        editMode='row'
        rows={allAccounts}
        columns={columns}
        getRowId={(row) => row.idAccount}
        autoHeight={true}
        rowHeight={110}
        processRowUpdate={handleProcessRowUpdate}
        paginationMode='server'
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} trên tổng số ${
                count !== -1 ? count : `nhiều hơn ${to}`
              }`,
          },
          noRowsLabel: "Không có tài khoản",
        }}
        loading={isLoading}
        disableRowSelectionOnClick
        slots={{
          pagination: CustomPagination,
          toolbar: QuickSearchToolbar,
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "linear-progress",
          },
          toolbar: {
            searchValue: searchValue,
            setSearchValue: setSearchValue,
            fetchData: fetchData,
            setOpenDialogListFilterAccount: setOpenDialogListFilterAccount,
          },
        }}
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
      />
      <ListFilterAccount
        openDialogListFilterAccount={openDialogListFilterAccount}
        setOpenDialogListFilterAccount={setOpenDialogListFilterAccount}
        optionSort={optionSort}
        setOptionSort={setOptionSort}
        propertySearch={propertySearch}
        setPropertySearch={setPropertySearch}
        idRole={idRole}
        setIdRole={setIdRole}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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
    </>
  );
}

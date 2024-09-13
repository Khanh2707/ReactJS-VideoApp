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
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AppContext } from "../../../context/AppContext";
import MuiPagination from "@mui/material/Pagination";
import { GridPagination } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import reportVideoAPI from "../../../api/reportVideoAPI";
import { Link } from "react-router-dom";
import ListFilterReportVideo from "../../ListFilterReportVideo";

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
  setOpenDialogListFilterReportVideo,
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
        Tất cả báo cáo vi phạm
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* <Box>
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
        </Box> */}
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
          onClick={() => setOpenDialogListFilterReportVideo(true)}
        />
      </Box>
    </Box>
  );
}

const columns = [
  {
    field: "nameUniqueChannel",
    headerName: "Id kênh báo cáo",
    width: 150,
    valueGetter: (params, row) => {
      return row.channel?.nameUnique;
    },
  },
  {
    field: "nameChannel",
    headerName: "Tên kênh báo cáo",
    width: 150,
    valueGetter: (params, row) => {
      return row.channel?.name;
    },
  },
  {
    field: "imagePreviewVideo",
    headerName: "Video",
    width: 120,
    renderCell: (params) => (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to={`/watch/${params.row.video?.idVideo}`}>
          <img
            src={params.row.video?.imagePreview}
            alt=''
            style={{ width: "100px", height: "56.25px", display: "block" }}
          />
        </Link>
      </Box>
    ),
  },
  {
    field: "titleVideo",
    headerName: "Tiêu đề video",
    width: 150,
    valueGetter: (params, row) => {
      return row.video?.title;
    },
  },
  {
    field: "nameUniqueVideoChannel",
    headerName: "Id kênh chủ video",
    width: 150,
    valueGetter: (params, row) => {
      return row.video.channel?.nameUnique;
    },
  },
  {
    field: "nameVideoChannel",
    headerName: "Tên kênh chủ video",
    width: 150,
    valueGetter: (params, row) => {
      return row.video.channel?.name;
    },
  },
  {
    field: "descriptionTypeReportVideo",
    headerName: "Loại vi phạm",
    width: 150,
    valueGetter: (params, row) => {
      return row.typeReportVideo?.description;
    },
  },
  {
    field: "dateTimeReport",
    headerName: "Thời gian báo cáo",
    width: 150,
    valueGetter: (value) => {
      return formatDistanceToNow(parseISO(value), {
        addSuffix: true,
        locale: vi,
      });
    },
  },
];

export default function DataReport() {
  const [allReportVideos, setAllReportVideos] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 4,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [optionSort, setOptionSort] = useState("desc");
  const [propertySearch, setPropertySearch] = useState("dateTimeReport");
  const [idTypeReportVideo, setIdTypeReportVideo] = useState(0);
  const [openDialogListFilterReportVideo, setOpenDialogListFilterReportVideo] =
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

  const fetchData = async (searchValue) => {
    setIsLoading(true);

    try {
      let reportVideoResponse;

      if (!searchValue) {
        reportVideoResponse = await reportVideoAPI.getAllreportVideos(
          propertySearch,
          optionSort,
          page,
          pageSize,
          idTypeReportVideo
        );
      }

      if (!reportVideoResponse || !reportVideoResponse.result) {
        throw new Error("Invalid response from API");
      }

      setAllReportVideos(reportVideoResponse.result.content);
      setRowCount(reportVideoResponse.result.totalElements);
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
    idTypeReportVideo,
  ]);

  return (
    <>
      <Typography variant='h4' fontWeight='700' sx={{ pb: "20px" }}>
        Thống kê báo cáo vi phạm
      </Typography>
      <DataGrid
        editMode='row'
        rows={allReportVideos}
        columns={columns}
        getRowId={(row) => row.idReportVideo}
        autoHeight={true}
        rowHeight={110}
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
          noRowsLabel: "Không có báo cáo vi phạm",
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
            setOpenDialogListFilterReportVideo:
              setOpenDialogListFilterReportVideo,
          },
        }}
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
      />
      <ListFilterReportVideo
        openDialogListFilterReportVideo={openDialogListFilterReportVideo}
        setOpenDialogListFilterReportVideo={setOpenDialogListFilterReportVideo}
        optionSort={optionSort}
        setOptionSort={setOptionSort}
        propertySearch={propertySearch}
        setPropertySearch={setPropertySearch}
        idTypeReportVideo={idTypeReportVideo}
        setIdTypeReportVideo={setIdTypeReportVideo}
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

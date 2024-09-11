import {
  Alert,
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
import { Link } from "react-router-dom";
import videoAPI from "../../api/videoAPI";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AppContext } from "../../context/AppContext";
import MuiPagination from "@mui/material/Pagination";
import { GridPagination } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ListFilterMyVideo from "../dialog/ListFilterMyVideo";

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
  setOpenDialogListFilterMyVideo,
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
          icon={<SortOutlinedIcon />}
          label='Sắp xếp'
          sx={{
            p: "4px",
            fontSize: "14px",
            fontWeight: "600",
            bgcolor: "rgba(0, 0, 0, 0)",
            "& .MuiChip-icon": {
              color: "text.primary",
            },
          }}
          onClick={() => setOpenDialogListFilterMyVideo(true)}
        />
      </Box>
    </Box>
  );
}

const columns = [
  {
    field: "imagePreview",
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
        <Link to={`/watch/${params.row.idVideo}`}>
          <img
            src={params.value}
            alt='profile'
            style={{ width: "100px", height: "56.25px", display: "block" }}
          />
        </Link>
      </Box>
    ),
  },
  {
    field: "title",
    headerName: "Tiêu đề",
  },
  {
    field: "hide",
    headerName: "Hiển thị",
    editable: true,
    type: "singleSelect",
    valueOptions: [
      { value: false, label: "Công khai" },
      { value: true, label: "Riêng tư" },
    ],
  },
  {
    field: "ban",
    headerName: "Hạn chế",
    valueGetter: (value) => {
      return value ? "Bị gỡ" : "Không";
    },
  },
  {
    field: "dateTimeCreate",
    headerName: "Thời gian tạo",
    valueGetter: (value) => {
      return formatDistanceToNow(parseISO(value), {
        addSuffix: true,
        locale: vi,
      });
    },
  },
  {
    field: "view",
    headerName: "Lượt xem",
    type: "number",
  },
  {
    field: "amountLike",
    headerName: "Lượt thích",
    type: "number",
  },
  {
    field: "amountComment",
    headerName: "Lượt bình luận",
    type: "number",
  },
];

export default function ChannelEditingVideos() {
  const { myAccount } = useContext(AppContext);

  const [allVideos, setAllVideos] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 4,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [optionSort, setOptionSort] = useState("desc");
  const [propertySearch, setPropertySearch] = useState("dateTimeCreate");
  const [openDialogListFilterMyVideo, setOpenDialogListFilterMyVideo] =
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
      .updateVideo(newRow.idVideo, newRow)
      .then((response) => {
        handleOpenSnackbar("success", "Cập nhật thành công!");
      })
      .catch((error) => {});

    return newRow;
  };

  const fetchData = async (keyword = searchValue) => {
    setIsLoading(true);

    try {
      let videoResponse;

      if (!keyword) {
        videoResponse = await videoAPI.getAllByChannelNameUnique(
          myAccount.channel.nameUnique,
          propertySearch,
          optionSort,
          page,
          pageSize
        );
      } else {
        videoResponse = await videoAPI.getAllSearchVideoChannelByTitle(
          myAccount?.channel?.nameUnique,
          keyword,
          propertySearch,
          optionSort,
          page,
          pageSize
        );
      }

      if (!videoResponse || !videoResponse.result) {
        throw new Error("Invalid response from API");
      }

      const updatedVideos = await Promise.all(
        videoResponse.result.content.map(async (video) => {
          try {
            const amountLikeResponse = await videoAPI.countLikeVideo(
              video.idVideo
            );
            const amountLike = amountLikeResponse.result;

            const amountCommentResponse =
              await videoAPI.countCommentVideosByVideo(video.idVideo);
            const amountComment = amountCommentResponse.result;

            return {
              ...video,
              amountLike,
              amountComment,
            };
          } catch (error) {
            console.log(
              "Error fetching amountLike or amountComment for video:",
              video.idVideo,
              error
            );
            return { ...video, amountLike: 0, amountComment: 0 };
          }
        })
      );

      setAllVideos(updatedVideos);
      setRowCount(videoResponse.result.totalElements);
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [
    myAccount.channel.nameUnique,
    page,
    pageSize,
    searchValue,
    propertySearch,
    optionSort,
  ]);

  return (
    <>
      <DataGrid
        editMode='row'
        rows={allVideos}
        columns={columns}
        getRowId={(row) => row.idVideo}
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
          noRowsLabel: "Không có video",
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
            setOpenDialogListFilterMyVideo: setOpenDialogListFilterMyVideo,
          },
        }}
        disableColumnSorting
        disableColumnMenu
      />
      <ListFilterMyVideo
        openDialogListFilterMyVideo={openDialogListFilterMyVideo}
        setOpenDialogListFilterMyVideo={setOpenDialogListFilterMyVideo}
        optionSort={optionSort}
        setOptionSort={setOptionSort}
        propertySearch={propertySearch}
        setPropertySearch={setPropertySearch}
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

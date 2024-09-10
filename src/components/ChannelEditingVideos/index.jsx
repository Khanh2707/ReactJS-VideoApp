import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
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
import { useMovieData } from "@mui/x-data-grid-generator";

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

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: "1px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant='h6' fontWeight='600'>
        Tất cả video
      </Typography>
      <GridToolbarQuickFilter />
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
  const data = useMovieData();

  const { myAccount } = useContext(AppContext);

  const [allVideos, setAllVideos] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 4,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { page, pageSize } = paginationModel;

  const handleProcessRowUpdate = (newRow) => {
    console.log("Row updated:", newRow);

    return newRow;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const videoResponse = await videoAPI.getAllByChannelNameUnique(
          myAccount.channel.nameUnique,
          page,
          pageSize
        );

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
                "Error fetching amountLike for video:",
                video.idVideo,
                error
              );
              return { ...video, amountLike: 0 };
            }
          })
        );

        setAllVideos(updatedVideos);
        setRowCount(videoResponse.result.totalElements);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [myAccount.channel.nameUnique, page, pageSize]);

  return (
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
      }}
    />
  );
}

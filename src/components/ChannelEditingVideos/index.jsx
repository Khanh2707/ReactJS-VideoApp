import { Box } from "@mui/material";
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

const columns = [
  {
    field: "imagePreview",
    headerName: "Video",
    width: 200,
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
            style={{ width: "160px", height: "90px", display: "block" }}
          />
        </Link>
      </Box>
    ),
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

  const { page, pageSize } = paginationModel;

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

  const handleProcessRowUpdate = (newRow) => {
    console.log("Row updated:", newRow);

    return newRow;
  };

  return (
    <DataGrid
      editMode='row'
      rows={allVideos}
      columns={columns}
      getRowId={(row) => row.idVideo}
      autoHeight={true}
      rowHeight={110}
      disableRowSelectionOnClick
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
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "linear-progress",
        },
      }}
      slots={{
        pagination: CustomPagination,
      }}
    />
  );
}

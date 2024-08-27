import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import videoAPI from "../../api/videoAPI";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

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
        <img
          src={params.value}
          alt='profile'
          style={{ width: "160px", height: "90px" }}
        />
      </Box>
    ),
  },
  {
    field: "hide",
    headerName: "Hiển thị",
    valueGetter: (value) => {
      return !value ? "Công khai" : "Riêng tư";
    },
  },
  {
    field: "ban",
    headerName: "Hạn chế",
    valueGetter: (value) => {
      return value ? "Bị gỡ" : "Không có";
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
];

export default function ChannelEditingVideos() {
  const [allVideos, setAllVideos] = useState([]);
  const { videos } = useLoaderData();

  useEffect(() => {
    const fetchData = async () => {
      const updatedVideos = await Promise.all(
        videos.result.map(async (video) => {
          try {
            const amountLikeResponse = await videoAPI.countLikeVideo(
              video.idVideo
            );
            const amountLike = amountLikeResponse.result;

            return {
              ...video,
              amountLike,
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
    };

    fetchData();
  }, [videos]);

  return (
    <DataGrid
      rows={allVideos}
      columns={columns}
      getRowId={(row) => row.idVideo}
      autoHeight={true}
      rowHeight={110}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
}

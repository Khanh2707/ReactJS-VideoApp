import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import videoAPI from "../../api/videoAPI";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AppContext } from "../../context/AppContext";

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
];

export default function ChannelEditingVideos() {
  const { myAccount } = useContext(AppContext);

  const [allVideos, setAllVideos] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 4,
  });

  const { page, pageSize } = paginationModel;

  useEffect(() => {
    const fetchData = async () => {
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
        setRowCount(videoResponse.result.totalElements);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
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
    />
  );
}

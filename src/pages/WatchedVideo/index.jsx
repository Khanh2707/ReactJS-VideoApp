import {
  Box,
  Chip,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import React from "react";
import WatchedVideoCard from "../../components/WatchedVideoCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WatchedVideo() {
  const deleteAllWatchedVideo = () => {};

  return (
    <>
      <Typography sx={{ fontWeight: "700", fontSize: "36px", mb: "32px" }}>
        Nhật ký xem
      </Typography>
      <Grid container flexWrap='nowrap'>
        <Grid item>
          <Box>
            <Typography
              sx={{ fontWeight: "700", fontSize: "20px", mb: "32px" }}
            >
              Hôm qua
            </Typography>
            <WatchedVideoCard
              title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
              nameChannel='Name Channel'
              viewVideo='View Video'
              dateTimeCreateVideo='Date time create video'
            />
          </Box>
        </Grid>
        <Grid
          item
          flexGrow={1}
          sx={{ display: "flex", alignItems: "start", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", borderBottom: "1px solid #fff" }}>
            <IconButton type='button' sx={{ color: "#fff" }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                color: "#fff",
                flexGrow: 1, // Cho phép InputBase chiếm hết không gian còn lại
              }}
              placeholder='Tìm kiếm... '
            />
            <IconButton type='button' sx={{ color: "#fff" }}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Chip
            label='Xóa tất cả nhật ký xem'
            icon={<DeleteIcon color="#fff" />}
            sx={{
              mt: "24px",
              p: '4px',
              color: "#fff",
              bgcolor: "#23272f",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
            onClick={deleteAllWatchedVideo}
          />
        </Grid>
      </Grid>
    </>
  );
}

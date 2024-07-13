import { Box, Grid, IconButton, InputBase, Typography } from "@mui/material";
import React from "react";
import WatchedVideoCard from "../../components/WatchedVideoCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function WatchedVideo() {
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
        <Grid item flexGrow={1} sx={{ display: "flex", alignItems: "start" }}>
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
        </Grid>
      </Grid>
    </>
  );
}

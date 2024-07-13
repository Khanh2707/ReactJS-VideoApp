import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import WatchedVideoCard from "../../components/WatchedVideoCard";

export default function WatchedVideo() {
  return (
    <Box>
      <Typography sx={{ fontWeight: "700", fontSize: "36px", mb: "32px" }}>
        Nhật ký xem
      </Typography>
      <Typography sx={{ fontWeight: "700", fontSize: "20px", mb: "32px" }}>
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
  );
}

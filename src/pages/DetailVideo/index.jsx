import React from "react";
import { Box, Grid } from "@mui/material";
import Video from "../../components/Video";
import RecommendVideoCard from "../../components/RecommendVideoCard";

export default function DetailVideo() {
  return (
    <Box sx={{ display: "flex" }}>
      <Video />
      <Box sx={{ ml: "24px" }}>
        <RecommendVideoCard
          title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
          nameChannel='Name Channel'
          viewVideo='View Video'
          dateTimeCreateVideo='Date time create'
        />
        <RecommendVideoCard
          title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
          nameChannel='Name Channel'
          viewVideo='View Video'
          dateTimeCreateVideo='Date time create'
        />
      </Box>
    </Box>
  );
}

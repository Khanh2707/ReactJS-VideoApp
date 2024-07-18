import { Grid } from "@mui/material";
import React from "react";
import MediaCard from "../../components/MediaCard";
import ListCategory from "../../components/ListCategory";

export default function Home() {
  return (
    <>
      <ListCategory />
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <MediaCard
            title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
            nameChannel='Name Channel'
            viewVideo='View Video'
            dateTimeCreateVideo='Date time create video'
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <MediaCard
            title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
            nameChannel='Name Channel'
            viewVideo='View Video'
            dateTimeCreateVideo='Date time create video'
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <MediaCard
            title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
            nameChannel='Name Channel'
            viewVideo='View Video'
            dateTimeCreateVideo='Date time create video'
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <MediaCard
            title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
            nameChannel='Name Channel'
            viewVideo='View Video'
            dateTimeCreateVideo='Date time create video'
          />
        </Grid>
      </Grid>
    </>
  );
}

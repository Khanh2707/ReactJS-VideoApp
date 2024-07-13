import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

export default function MediaCard() {
  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia component='img' height='200px' image='../../public/vite.svg' sx={{ objectFit: 'contain' }} />
      <CardContent sx={{ "&:last-child": { pb: "8px" } }}>
        <Grid container flexWrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='' src='../../public/vite.svg' />
          </Grid>
          <Grid item>
            <Typography
              variant='h6'
              component='div'
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 1,
                textOverflow: "ellipsis",
              }}
            >
              Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm
              bảo nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá
              dài. Dưới đây là cách bạn có thể sử dụng thuộc tính này với
              Typography:
            </Typography>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              sx={{
                "&:hover": {
                  color: "#333",
                },
              }}
            >
              Name Channel
            </Typography>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              component='span'
              sx={{ mr: "8px" }}
            >
              View
            </Typography>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              component='span'
              sx={{ mr: "8px" }}
            >
              -
            </Typography>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              component='span'
            >
              Date Time Create
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

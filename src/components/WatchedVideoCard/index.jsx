import { Paper, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export default function WatchedVideoCard({
  imagePreview,
  title,
  nameChannel,
  viewVideo,
  dateTimeCreateVideo,
}) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        height: "138px",
        mt: "16px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component='img'
        image={imagePreview}
        sx={{
          width: "246px",
          height: "138px",
          objectFit: "contain",
        }}
        alt=''
      />
      <CardContent sx={{ flexGrow: "1" }}>
        <Typography
          variant='h6'
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
            mb: "8px",
          }}
        >
          {title}
        </Typography>
        <Paper sx={{ color: "customGreySubTitle.main" }}>
          <Typography variant='subtitle2'>{nameChannel}</Typography>
          <Typography variant='subtitle2' component='span' sx={{ mr: "8px" }}>
            {viewVideo} lượt xem
          </Typography>
          <Typography variant='subtitle2' component='span' sx={{ mr: "8px" }}>
            -
          </Typography>
          <Typography variant='subtitle2' component='span'>
            {formatDistanceToNow(parseISO(dateTimeCreateVideo), {
              addSuffix: true,
              locale: vi,
            })}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}

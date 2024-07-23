import { Paper, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import iconReact from "../../assets/react.svg";

export default function WatchedVideoCard({
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
        width: "628px",
        height: "138px",
        mt: "16px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component='img'
        image={iconReact}
        sx={{
          width: "246px",
          height: "138px",
          objectFit: "contain",
          borderRadius: "8px",
        }}
        alt=''
      />
      <CardContent sx={{ width: "382px" }}>
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
            {viewVideo}
          </Typography>
          <Typography variant='subtitle2' component='span' sx={{ mr: "8px" }}>
            -
          </Typography>
          <Typography variant='subtitle2' component='span'>
            {dateTimeCreateVideo}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}

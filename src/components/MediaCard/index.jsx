import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

export default function MediaCard({
  title,
  nameChannel,
  viewVideo,
  dateTimeCreateVideo,
}) {
  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia
        component='img'
        height='200px'
        image='../../public/vite.svg'
        sx={{ objectFit: "contain" }}
      />
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
              {title}
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
              {nameChannel}
            </Typography>
            <Typography
              variant='subtitle2'
              color='text.secondary'
              component='span'
              sx={{ mr: "8px" }}
            >
              {viewVideo}
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
              {dateTimeCreateVideo}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

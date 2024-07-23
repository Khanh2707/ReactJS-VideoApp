import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import iconReact from "../../assets/react.svg";

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
        image={iconReact}
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{ "&:last-child": { pb: "8px" } }}>
        <Grid container flexWrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='' src='' />
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
              sx={{ color: "customGreySubTitle.main" }}
            >
              {nameChannel}
            </Typography>
            <Typography
              variant='subtitle2'
              component='span'
              sx={{ mr: "8px", color: "customGreySubTitle.main" }}
            >
              {viewVideo}
            </Typography>
            <Typography
              variant='subtitle2'
              component='span'
              sx={{ mr: "8px", color: "customGreySubTitle.main" }}
            >
              -
            </Typography>
            <Typography
              variant='subtitle2'
              component='span'
              sx={{ color: "customGreySubTitle.main" }}
            >
              {dateTimeCreateVideo}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

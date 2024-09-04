import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function MediaCard({
  avatar,
  title,
  nameChannel,
  nameUnique,
  viewVideo,
  dateTimeCreateVideo,
  imagePreview,
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia
        component='img'
        width='100%'
        height='100%'
        image={imagePreview}
        sx={{ objectFit: "cover", bgcolor: "#000", borderRadius: "12px" }}
      />
      <CardContent sx={{ "&:last-child": { pb: "8px" } }}>
        <Grid container flexWrap='nowrap' spacing={2}>
          <Grid
            item
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${nameUnique}`);
            }}
          >
            <Avatar alt='' src={avatar} />
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
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${nameUnique}`);
              }}
            >
              {nameChannel}
            </Typography>
            <Typography
              variant='subtitle2'
              component='span'
              sx={{ mr: "8px", color: "customGreySubTitle.main" }}
            >
              {viewVideo} lượt xem
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
              {formatDistanceToNow(parseISO(dateTimeCreateVideo), {
                addSuffix: true,
                locale: vi,
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

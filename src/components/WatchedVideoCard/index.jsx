import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { Link, useNavigate } from "react-router-dom";

export default function WatchedVideoCard({
  imagePreview,
  title,
  nameChannel,
  nameUnique,
  viewVideo,
  dateTimeCreateVideo,
  descriptionChannel,
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mt: "16px",
        cursor: "pointer",
        gap: "16px",
      }}
    >
      <Box sx={{ width: "246px", height: "138px" }}>
        <CardMedia
          component='img'
          image={imagePreview}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          alt=''
        />
      </Box>
      <CardContent
        sx={{
          width: "calc(100% - 246px)",
          height: "138px",
          p: "0",
          "&:last-child": { p: "0" },
        }}
      >
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
          <Typography
            variant='subtitle2'
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${nameUnique}`);
            }}
          >
            {nameChannel}
          </Typography>
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
          <Typography variant='subtitle2' sx={{ mr: "8px" }}>
            {descriptionChannel}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}

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
import { Link } from "react-router-dom";

export default function WatchedVideoCard({
  imagePreview,
  title,
  nameChannel,
  nameUnique,
  viewVideo,
  dateTimeCreateVideo,
}) {
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
          <Link to={`/${nameUnique}`} style={{ textDecoration: "none" }}>
            <Typography variant='subtitle2'>{nameChannel}</Typography>
          </Link>
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

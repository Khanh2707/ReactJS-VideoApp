import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

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
        boxShadow: "none",
        bgcolor: "#23272f",
        width: "628px",
        height: "138px",
        mt: "16px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ width: "246px", height: "138px" }}>
        <CardMedia
          component='img'
          image='../../public/vite.svg'
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
          }}
          alt=''
        />
      </Box>
      <Box sx={{ width: "382px" }}>
        <CardContent>
          <Typography
            variant='h6'
            sx={{
              color: "#fff",
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
          <Typography
            variant='subtitle2'
            color='rgb(170, 170, 170)'
            sx={{
              "&:hover": {
                color: "rgb(241, 241, 241)",
              },
            }}
          >
            {nameChannel}
          </Typography>
          <Typography
            variant='subtitle2'
            color='rgb(170, 170, 170)'
            component='span'
            sx={{ mr: "8px" }}
          >
            {viewVideo}
          </Typography>
          <Typography
            variant='subtitle2'
            color='rgb(170, 170, 170)'
            component='span'
            sx={{ mr: "8px" }}
          >
            -
          </Typography>
          <Typography
            variant='subtitle2'
            color='rgb(170, 170, 170)'
            component='span'
          >
            {dateTimeCreateVideo}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

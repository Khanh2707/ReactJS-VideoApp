import { Paper, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import iconReact from "../../assets/react.svg";

export default function RecommendVideoCard({
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
        mb: "8px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component='img'
        image={iconReact}
        sx={{
          width: "168px",
          height: "94px",
          objectFit: "contain",
          borderRadius: "8px",
        }}
        alt=''
      />
      <CardContent
        sx={{ width: "226px", ml: "8px", p: "0", "&:last-child": { p: "0" } }}
      >
        <Typography
          variant='subtitle1'
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
            mb: "8px",
            lineHeight: "1.4",
          }}
        >
          {title}
        </Typography>
        <Paper sx={{ color: "customGreySubTitle.main", lineHeight: "1" }}>
          <Typography
            variant='caption'
            component='div'
            sx={{ lineHeight: "1.1" }}
          >
            {nameChannel}
          </Typography>
          <Typography
            variant='caption'
            component='span'
            sx={{ mr: "4px", lineHeight: "1.1" }}
          >
            {viewVideo}
          </Typography>
          <Typography
            variant='caption'
            component='span'
            sx={{ mr: "4px", lineHeight: "1.1" }}
          >
            -
          </Typography>
          <Typography
            variant='caption'
            component='span'
            sx={{ lineHeight: "1.1" }}
          >
            {dateTimeCreateVideo}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
}

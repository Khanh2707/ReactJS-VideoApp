import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import iconReact from "../../assets/react.svg";

export default function MyVideoCard({ title, viewVideo, dateTimeCreate }) {
  return (
    <Card
      sx={{
        cursor: "pointer",
        width: "100%",
      }}
    >
      <CardMedia
        component='img'
        image={iconReact}
        sx={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
        }}
        alt=''
      />
      <CardContent sx={{ "&:last-child": { pb: "8px" } }}>
        <Typography
          variant='subtitle1'
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
        <Grid container spacing={1} sx={{ color: "customGreySubTitle.main" }}>
          <Grid item>
            <Typography variant='subtitle2'>{viewVideo}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2'>•</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2'>{dateTimeCreate}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

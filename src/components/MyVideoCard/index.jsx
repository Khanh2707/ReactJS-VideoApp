import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

export default function MyVideoCard({ title, viewVideo, dateTimeCreate }) {
  return (
    <Card
      sx={{
        bgcolor: "#23272f",
        boxShadow: "none",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <CardMedia
        component='img'
        image='../../public/vite.svg'
        sx={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
        }}
        alt=''
      />
      <CardContent sx={{ "&:last-child": { pb: "8px" } }}>
        <Typography
          color='#fff'
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
        <Grid container color='rgb(170, 170, 170)' spacing={1}>
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

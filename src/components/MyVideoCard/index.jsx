import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export default function MyVideoCard({
  title,
  imagePreview,
  viewVideo,
  dateTimeCreate,
}) {
  return (
    <Card
      sx={{
        cursor: "pointer",
        width: "100%",
      }}
    >
      <CardMedia
        component='img'
        image={imagePreview}
        sx={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
          backgroundColor: "#000",
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
            <Typography variant='subtitle2'>{viewVideo} lượt xem</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2'>•</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2'>
              {formatDistanceToNow(parseISO(dateTimeCreate), {
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

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export default function ResultSearchCard({
  avatar,
  title,
  nameChannel,
  nameUnique,
  viewVideo,
  dateTimeCreateVideo,
  imagePreview,
  descriptionChannel,
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ cursor: "pointer", display: "flex", borderRadius: "12px" }}>
      <Grid container>
        <Grid item xs={5}>
          <CardMedia
            component='img'
            width='100%'
            height='100%'
            image={imagePreview}
            sx={{ objectFit: "cover", bgcolor: "#000", borderRadius: "12px" }}
          />
        </Grid>
        <Grid item xs={7}>
          <CardContent sx={{ "&:last-child": { pb: "8px" } }}>
            <Typography
              variant='h6'
              component='div'
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",
              }}
            >
              {title}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                m: "8px 0",
              }}
            >
              <Avatar
                alt=''
                src={avatar}
                sx={{ width: "30px", height: "30px" }}
                onClick={() => {
                  navigate(`/${nameUnique}`);
                }}
              />
              <Typography
                variant='subtitle2'
                component='span'
                sx={{ color: "customGreySubTitle.main" }}
                onClick={() => {
                  navigate(`/${nameUnique}`);
                }}
              >
                {nameChannel}
              </Typography>
            </Box>
            <Typography
              variant='subtitle2'
              component='span'
              sx={{ mr: "8px", color: "customGreySubTitle.main" }}
            >
              {descriptionChannel}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

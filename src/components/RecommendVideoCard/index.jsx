import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { ReponsiveContext } from "../../context/ReponsiveContext";

export default function RecommendVideoCard({
  title,
  nameChannel,
  nameUnique,
  viewVideo,
  dateTimeCreateVideo,
  imagePreview,
}) {
  const navigate = useNavigate();

  const { isXlDown, isLgDown, isMdDown, isSmDown, isXsDown } =
    useContext(ReponsiveContext);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isLgDown ? "column" : "row",
        alignItems: "center",
        mb: "8px",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: isXlDown ? "226px" : "168px",
          height: isXlDown ? "127px" : "94px",
        }}
      >
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
          width: "226px",
          height: "94px",
          p: "0",
          "&:last-child": { p: "0" },
        }}
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${nameUnique}`);
            }}
          >
            {nameChannel}
          </Typography>
          <Typography
            variant='caption'
            component='span'
            sx={{ mr: "4px", lineHeight: "1.1" }}
          >
            {viewVideo} lượt xem
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

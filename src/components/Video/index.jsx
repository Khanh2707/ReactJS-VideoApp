import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  IconButton,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

const ControlsWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  zIndex: "1",
}));

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
}

export default function Video() {
  const playerWrapperRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      if (playerWrapperRef.current) {
        setWidth(playerWrapperRef.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <PlayerWrapper ref={playerWrapperRef}>
      <ReactPlayer
        width='100%'
        height={width / 1.777777777777778}
        url='https://www.youtube.com/watch?v=4tYuIU7pLmI'
        playing={false}
        style={{ backgroundColor: "#000" }}
      />

      <ControlsWrapper>
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ p: "16px" }}
        >
          <Grid item>
            <Typography variant='h5' sx={{ color: "#fff" }}>
              Video Title
            </Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <BookmarkIcon sx={{ color: "#fff" }} />
              <Typography sx={{ color: "#fff" }}>Bookmark</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
          <IconButton>
            <FastRewindIcon />
          </IconButton>
          <IconButton>
            <PlayArrowIcon />
          </IconButton>
          <IconButton>
            <FastForwardIcon />
          </IconButton>
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ p: "16px" }}
        >
          <Grid item xs={12}>
            <Slider
              min={0}
              max={100}
              defaultValue={20}
              ValueLabelComponent={ValueLabelComponent}
            />
          </Grid>

          <Grid item>
            <Grid container alignItems='center' direction='row'>
              <IconButton>
                <PlayArrowIcon />
              </IconButton>

              <IconButton>
                <VolumeUpIcon />
              </IconButton>

              <Slider
                min={0}
                max={100}
                defaultValue={100}
                sx={{ width: "100px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </ControlsWrapper>
    </PlayerWrapper>
  );
}

import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import { Box, Grid, IconButton, Slider, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

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

// const PrettoSlider = styled(Slider)(({ theme }) => ({
//   color: "#52af77",
//   height: "8px",

//   "& .MuiSlider-thumb": {
//     width: "24px",
//     height: "24px",
//     backgroundColor: "#fff",
//     border: "2px solid currentColor",
//     marginTop: "-8px",
//     marginLeft: "-12px",
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },

//   "& .MuiSlider-valueLabel": {
//     left: "calc(-50% + 4px)",
//   },

//   "& .MuiSlider-track": {
//     height: "8px",
//     borderRadius: "4px",
//   },

//   "& .MuiSlider-rail": {
//     height: "8px",
//     borderRadius: "4px",
//   },
// }));

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
            <Slider />
          </Grid>
        </Grid>
      </ControlsWrapper>
    </PlayerWrapper>
  );
}

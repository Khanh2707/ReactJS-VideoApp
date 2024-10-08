import React, { forwardRef, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

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

export default forwardRef(function PlayerControls(
  {
    screenfull,
    titleVideo,
    onPlayPause,
    playing,
    onRewind,
    onFastForward,
    muted,
    onMute,
    volume,
    onVolumeChange,
    onVolumeSeekUp,
    playbackRate,
    onPlaybackRateChange,
    onToggleFullScreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    onChangeDisplayFormat,
  },
  ref
) {
  const [showPlaybackRate, setShowPlaybackRate] = useState(false);
  const listPlaybackRateRef = useRef(null);
  const playbackRateButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      listPlaybackRateRef.current &&
      !listPlaybackRateRef.current.contains(event.target) &&
      !playbackRateButtonRef.current.contains(event.target)
    ) {
      setShowPlaybackRate(false);
    }
  };

  const toggleListPlaybackRate = () => {
    setShowPlaybackRate((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ControlsWrapper ref={ref}>
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ p: "16px" }}
      >
        {screenfull.isFullscreen && (
          <Grid item>
            <Typography variant='h5' sx={{ color: "#fff" }}>
              {titleVideo}
            </Typography>
          </Grid>
        )}
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
            value={played * 100}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid>
        <Grid item>
          <Grid container alignItems='center' direction='row'>
            <IconButton onClick={onRewind}>
              <FastRewindIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton onClick={onPlayPause}>
              {playing ? (
                <PauseIcon sx={{ color: "#fff" }} />
              ) : (
                <PlayArrowIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
            <IconButton onClick={onFastForward}>
              <FastForwardIcon sx={{ color: "#fff" }} />
            </IconButton>

            <IconButton onClick={onMute}>
              {muted ? (
                <VolumeOffIcon sx={{ color: "#fff" }} />
              ) : (
                <VolumeUpIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>

            <Slider
              min={0}
              max={100}
              value={volume * 100}
              sx={{ width: "100px" }}
              onChange={onVolumeChange}
              onChangeCommitted={onVolumeSeekUp}
            />

            <Button
              variant='text'
              sx={{ color: "#fff", ml: "8px" }}
              onClick={onChangeDisplayFormat}
            >
              <Typography>
                {elapsedTime}/{totalDuration}
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <Box sx={{ position: "relative" }}>
            <Button
              variant='text'
              sx={{ color: "#fff" }}
              onClick={toggleListPlaybackRate}
              ref={playbackRateButtonRef}
            >
              <Typography sx={{ textTransform: "none" }}>
                {playbackRate === 1.0 ? "Chuẩn" : `${playbackRate}x`}
              </Typography>
            </Button>
            {showPlaybackRate && (
              <Grid
                container
                direction='column-reverse'
                sx={{
                  minWidth: "100px",
                  bgcolor: "rgba(28, 28, 28, 0.9)",
                  position: "absolute",
                  bottom: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                ref={listPlaybackRateRef}
              >
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <Button
                    variant='text'
                    sx={{
                      color: "#fff",
                      bgcolor:
                        rate === playbackRate ? "rgba(255, 255, 255, 0.1)" : "",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                      borderRadius: "0",
                      p: "8px 16px",
                    }}
                    onClick={() => onPlaybackRateChange(rate)}
                  >
                    <Typography sx={{ textTransform: "none" }}>
                      {rate === 1.0 ? "Chuẩn" : rate}
                    </Typography>
                  </Button>
                ))}
              </Grid>
            )}
          </Box>
          <IconButton onClick={onToggleFullScreen}>
            <FullscreenIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Grid>
      </Grid>
    </ControlsWrapper>
  );
});

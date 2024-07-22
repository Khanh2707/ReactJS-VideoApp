import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
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

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
}

export default function PlayerControls() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;

  return (
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

            <Button variant='text' sx={{ color: "#fff", ml: "16px" }}>
              <Typography>27:07</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant='text' sx={{ color: "#fff" }} onClick={handleClick}>
            <Typography>1x</Typography>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Grid container direction='column-reverse'>
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button variant='text' sx={{ color: "#fff" }}>
                  <Typography>{rate}</Typography>
                </Button>
              ))}
            </Grid>
          </Popover>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ControlsWrapper>
  );
}

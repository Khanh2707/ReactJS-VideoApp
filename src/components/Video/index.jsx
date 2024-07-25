import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import PlayerControls from "../PlayerControls";
import screenfull from "screenfull";

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

export default function Video() {
  const playerWrapperRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
  });

  const { playing, muted, volume, playbackRate } = state;

  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlaybackRateChange = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const handleToggleFullScreen = () => {
    screenfull.toggle(playerWrapperRef.current);
  };

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
        ref={playerRef}
        width='100%'
        height={width / 1.777777777777778}
        url='https://www.youtube.com/watch?v=4tYuIU7pLmI'
        style={{ backgroundColor: "#000" }}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
      />

      <PlayerControls
        onPlayPause={handlePlayPause}
        playing={playing}
        onRewind={handleRewind}
        onFastForward={handleFastForward}
        muted={muted}
        onMute={handleMute}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onVolumeSeekDown={handleVolumeSeekDown}
        playbackRate={playbackRate}
        onPlaybackRateChange={handlePlaybackRateChange}
        onToggleFullScreen={handleToggleFullScreen}
      />
    </PlayerWrapper>
  );
}

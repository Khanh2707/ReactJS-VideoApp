import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import PlayerControls from "../PlayerControls";
import screenfull from "screenfull";

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
}));

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }

  return `${mm}:${ss}`;
};

let count = 0;

export default function Video() {
  const [width, setWidth] = useState(0);
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const playerWrapperRef = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);

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

  const handleVolumeSeekUp = (e, newValue) => {
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

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }

    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }

    if (!seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

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
    <PlayerWrapper ref={playerWrapperRef} onMouseMove={handleMouseMove}>
      <ReactPlayer
        ref={playerRef}
        width='100%'
        height={width / 1.777777777777778}
        url='http://127.0.0.1:4000/BẠC PHẬN - ICM x JACK - OFFICIAL MV.mp4'
        style={{ backgroundColor: "#000" }}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={handleProgress}
      />

      <PlayerControls
        ref={controlsRef}
        onPlayPause={handlePlayPause}
        playing={playing}
        onRewind={handleRewind}
        onFastForward={handleFastForward}
        muted={muted}
        onMute={handleMute}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onVolumeSeekUp={handleVolumeSeekUp}
        playbackRate={playbackRate}
        onPlaybackRateChange={handlePlaybackRateChange}
        onToggleFullScreen={handleToggleFullScreen}
        played={played}
        onSeek={handleSeekChange}
        onSeekMouseDown={handleSeekMouseDown}
        onSeekMouseUp={handleSeekMouseUp}
        elapsedTime={elapsedTime}
        totalDuration={totalDuration}
        onChangeDisplayFormat={handleChangeDisplayFormat}
      />
    </PlayerWrapper>
  );
}

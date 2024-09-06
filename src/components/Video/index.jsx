import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import PlayerControls from "../PlayerControls";
import screenfull from "screenfull";
import videoAPI from "../../api/videoAPI";

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
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

export default function Video({ idVideo, titleVideo, linkVideo }) {
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
  const [watchProgress, setWatchProgress] = useState(0);
  const [hasWatchedEnough, setHasWatchedEnough] = useState(false);

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const playerWrapperRef = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
    if (!playing) {
      setState((prevState) => ({ ...prevState, seeking: false }));
    }
    console.log(`Play/Pause clicked: ${playing ? "Paused" : "Playing"}`);
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    console.log("Rewind 10 seconds");
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    console.log("Fast Forward 10 seconds");
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
    console.log(`Mute toggled: ${!state.muted}`);
  };

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
    console.log(`Volume changed: ${newValue}`);
  };

  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
    console.log(`Volume Seek Up: ${newValue}`);
  };

  const handlePlaybackRateChange = (rate) => {
    setState({ ...state, playbackRate: rate });
    console.log(`Playback Rate changed: ${rate}`);
  };

  const handleToggleFullScreen = () => {
    screenfull.toggle(playerWrapperRef.current);
    console.log("Toggled Full Screen");
  };

  const handleProgress = (changeState) => {
    if (!playing || seeking) return;

    setState({ ...state, ...changeState });

    const currentTime = playerRef.current.getCurrentTime();
    const totalDuration = playerRef.current.getDuration();

    let requiredWatchTime = 0.5;
    if (playbackRate > 1) {
      requiredWatchTime = 0.8;
    }

    const adjustedWatchTime = requiredWatchTime * totalDuration;

    setWatchProgress((prevProgress) => {
      const newProgress = Math.min(
        (currentTime / adjustedWatchTime) * 100,
        100
      );
      if (newProgress >= 100 && !hasWatchedEnough) {
        setHasWatchedEnough(true);
        setWatchProgress(0);

        videoAPI
          .updateViewVideo(idVideo)
          .then((response) => {})
          .catch((error) => {});
      }
      console.log(`Watch Progress: ${newProgress}%`);
      return newProgress;
    });
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
    console.log(`Seek Bar Changed: ${newValue}`);
  };

  const handleSeekMouseDown = () => {
    setState({ ...state, seeking: true });
    console.log("Seeking started");
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
    console.log(`Seeking ended: ${newValue}`);
  };

  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
    console.log(`Time Display Format changed: ${timeDisplayFormat}`);
  };

  const handleEnded = () => {
    setHasWatchedEnough(false);
    setWatchProgress(0);
    console.log("Video has ended.");
    setState({ ...state, playing: false });
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    console.log("Mouse moved: Controls visible");
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
    <PlayerWrapper ref={playerWrapperRef} onMouseMove={handleMouseMove}>
      <ReactPlayer
        ref={playerRef}
        width='100%'
        height={width / 1.777777777777778}
        url={linkVideo}
        style={{ backgroundColor: "#000" }}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onEnded={handleEnded}
      />

      <PlayerControls
        screenfull={screenfull}
        titleVideo={titleVideo}
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
        elapsedTime={format(playerRef.current?.getCurrentTime() || 0)}
        totalDuration={format(playerRef.current?.getDuration() || 0)}
        onChangeDisplayFormat={handleChangeDisplayFormat}
      />
    </PlayerWrapper>
  );
}

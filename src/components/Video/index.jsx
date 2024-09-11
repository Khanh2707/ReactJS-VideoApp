import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import PlayerControls from "../PlayerControls";
import screenfull from "screenfull";
import videoAPI from "../../api/videoAPI";
import { useParams } from "react-router-dom";

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
}));

const LoadingWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
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

export default function Video({
  idVideo,
  titleVideo,
  linkVideo,
  imagePreview,
}) {
  const [duration, setDuration] = useState(0);
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
  const [isLoading, setIsLoading] = useState(true);

  const playerWrapperRef = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
    if (!playing) {
      setState((prevState) => ({ ...prevState, seeking: false }));
    }
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
    if (!playing || seeking) return;

    setState({ ...state, ...changeState });

    const currentTime = playerRef.current.getCurrentTime();

    console.log(currentTime);

    let requiredWatchTime = 0.5;
    if (playbackRate > 1) {
      requiredWatchTime = 0.8;
    }

    const adjustedWatchTime = requiredWatchTime * duration;

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
      return newProgress;
    });
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = () => {
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

  const handleEnded = () => {
    setHasWatchedEnough(false);
    setWatchProgress(0);
    setState({ ...state, playing: false });
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
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
      {isLoading && (
        <LoadingWrapper>
          <CircularProgress color='secondary' />
        </LoadingWrapper>
      )}

      {!playing && playerRef?.current?.getCurrentTime() === 0 ? (
        <img
          src={imagePreview}
          alt={imagePreview}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      ) : null}

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
        onDuration={(d) => setDuration(d)}
        onReady={() => setIsLoading(false)}
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
        totalDuration={format(duration)}
        onChangeDisplayFormat={handleChangeDisplayFormat}
      />
    </PlayerWrapper>
  );
}

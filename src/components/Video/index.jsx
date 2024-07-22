import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import PlayerControls from "../PlayerControls";

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

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

      <PlayerControls />
    </PlayerWrapper>
  );
}

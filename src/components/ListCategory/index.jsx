import React, { useRef, useState } from "react";
import { Chip, Grid, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ListCategory() {
  const handleClick = () => {};

  const carouselRef = useRef(null);
  const [position, setPosition] = useState(0);

  const scrollBy = 200;

  const handleNext = () => {
    if (carouselRef.current) {
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newPosition = Math.min(position + scrollBy, maxScrollLeft);
      setPosition(newPosition);
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const newPosition = Math.max(position - scrollBy, 0);
      setPosition(newPosition);
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Grid
      container
      alignItems='center'
      flexWrap='nowrap'
      spacing={1}
      sx={{ pb: "16px" }}
    >
      <Grid item md={1} sm={1} xs={1} textAlign='center'>
        <IconButton type='button' sx={{ p: "10px", color: "#fff" }} onClick={handlePrev}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      <Grid item md={10} sm={10} xs={10}>
        <Grid
          container
          spacing={1}
          flexWrap='nowrap'
          overflow='hidden'
          ref={carouselRef}
        >
          {["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"].map(
            (text, index) => (
              <Grid item>
                <Chip
                  label='Category'
                  onClick={handleClick}
                  sx={{
                    color: "#fff",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
      <Grid item md={1} sm={1} xs={1} textAlign='center'>
        <IconButton type='button' sx={{ p: "10px", color: "#fff" }} onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

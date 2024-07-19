import React, { useRef, useState, useEffect } from "react";
import { Chip, Grid, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ListCategory() {
  const carouselRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [selectedChip, setSelectedChip] = useState(null);

  const scrollBy = 200;

  useEffect(() => {
    if (listCategory.length > 0) {
      setSelectedChip(listCategory[0].id);
    }
  }, []);

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

  const listCategory = Array.from({ length: 21 }, (_, index) => ({
    id: `${index + 1}`,
    name: `Danh mục ${index + 1}`,
  }));

  const handleClick = (id) => () => {
    setSelectedChip(id);
  };

  return (
    <Grid container alignItems='center' flexWrap='nowrap' sx={{ pb: "16px" }}>
      <Grid item md={1} sm={1} xs={1} textAlign='center'>
        <IconButton type='button' onClick={handlePrev}>
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
          {listCategory.map((item) => (
            <Grid item key={item.id}>
              <Chip
                label={item.name}
                onClick={handleClick(item.id)}
                sx={{
                  bgcolor: selectedChip === item.id ? "primary.main" : "",
                  color: selectedChip === item.id ? "common.white" : "",
                  "&:hover": {
                    bgcolor: selectedChip === item.id ? "primary.main" : "",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item md={1} sm={1} xs={1} textAlign='center'>
        <IconButton type='button' onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

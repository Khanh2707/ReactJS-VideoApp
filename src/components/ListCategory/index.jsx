import React, { useRef, useState, useEffect } from "react";
import { Chip, Grid, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import categoryVideoAPI from "../../api/categoryVideoAPI";

const scrollBy = 200;

export default function ListCategory() {
  const [position, setPosition] = useState(0);
  const [selectedChip, setSelectedChip] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const carouselRef = useRef(null);

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

  const handleSelectCategory = (idCategory) => {
    setSelectedChip(idCategory);
  };

  const checkOverflow = () => {
    if (carouselRef.current) {
      setIsOverflowing(
        carouselRef.current.scrollWidth > carouselRef.current.clientWidth
      );
    }
  };

  // API
  const getAllCategory = () => {
    categoryVideoAPI
      .getAllCategory()
      .then((response) => {
        const defaultCategory = { idCategory: 0, nameCategory: "Tất cả" };
        const updatedCategories = [defaultCategory, ...response.result];
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedChip(0);
    }
  }, [categories]);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories]);

  return (
    <Grid container alignItems='center' flexWrap='nowrap' sx={{ pb: "16px" }}>
      {isOverflowing && (
        <Grid item md={1} sm={1} xs={1} textAlign='center'>
          <IconButton type='button' onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grid>
      )}
      <Grid
        item
        md={isOverflowing ? 10 : 12}
        sm={isOverflowing ? 10 : 12}
        xs={isOverflowing ? 10 : 12}
      >
        <Grid
          container
          spacing={1}
          flexWrap='nowrap'
          overflow='hidden'
          ref={carouselRef}
        >
          {categories.map((item) => (
            <Grid item key={item.idCategory}>
              <Chip
                label={item.nameCategory}
                onClick={() => handleSelectCategory(item.idCategory)}
                sx={{
                  bgcolor: selectedChip === item.idCategory ? "#3ea6ff" : "",
                  color: selectedChip === item.idCategory ? "common.white" : "",
                  "&:hover": {
                    bgcolor: selectedChip === item.idCategory ? "#3ea6ff" : "",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {isOverflowing && (
        <Grid item md={1} sm={1} xs={1} textAlign='center'>
          <IconButton type='button' onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

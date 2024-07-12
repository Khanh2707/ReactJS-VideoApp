import React from "react";
import { Box, Chip, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import Slider from "react-slick";

export default function ListCategory() {
  const handleClick = () => {};

  return (
    <Grid container spacing={1} sx={{ pb: "16px" }}>
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
  );
}

import React from "react";
import ListCategory from "../../components/ListCategory";
import { Link, useLoaderData } from "react-router-dom";
import { Box, Chip, Grid } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ResultSearchCard from "../../components/ResultSearchCard";

export default function ResultSearch() {
  const { videos } = useLoaderData();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ListCategory />
        <Chip
          icon={<TuneIcon />}
          label='Bộ lọc'
          sx={{
            p: "4px",
            fontSize: "14px",
            fontWeight: "600",
            bgcolor: "rgba(0, 0, 0, 0)",
            "& .MuiChip-icon": {
              color: "text.primary",
            },
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {videos.result.map((item) => {
          return (
            <Grid item md={12} sm={12} xs={12} key={item.idVideo}>
              <Link
                to={`/watch/${item.idVideo}`}
                style={{ textDecoration: "none" }}
              >
                <ResultSearchCard
                  avatar={item.channel.avatar}
                  title={item.title}
                  nameChannel={item.channel.name}
                  nameUnique={item.channel.nameUnique}
                  viewVideo={item.view}
                  dateTimeCreateVideo={item.dateTimeCreate}
                  imagePreview={item.imagePreview}
                  descriptionChannel={item.description}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

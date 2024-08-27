import { Grid } from "@mui/material";
import React from "react";
import MediaCard from "../../components/MediaCard";
import ListCategory from "../../components/ListCategory";
import { Link, useLoaderData } from "react-router-dom";

export default function Home() {
  const { videos } = useLoaderData();

  console.log(videos);

  return (
    <>
      <ListCategory />
      <Grid container spacing={2}>
        {videos.result.map((item) => {
          return (
            <Grid item md={6} sm={12} xs={12} key={item.idVideo}>
              <Link
                to={`/watch/${item.idVideo}`}
                style={{ textDecoration: "none" }}
              >
                <MediaCard
                  avatar={item.channel.avatar}
                  title={item.title}
                  nameChannel={item.channel.name}
                  nameUnique={item.channel.nameUnique}
                  viewVideo={item.view}
                  dateTimeCreateVideo={item.dateTimeCreate}
                  imagePreview={item.imagePreview}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

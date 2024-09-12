import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MediaCard from "../../components/MediaCard";
import ListCategory from "../../components/ListCategory";
import { useLoaderData, useNavigate } from "react-router-dom";
import videoAPI from "../../api/videoAPI";
import { ThemeContext } from "../../context/ThemeContext";
import { AppContext } from "../../context/AppContext";

export default function Home() {
  const navigate = useNavigate();

  const { themeMode } = useContext(ThemeContext);
  const { selectedChip, setSelectedChip } = useContext(AppContext);

  const [videosByCategory, setVideosByCategory] = useState([]);
  const [openBackdropVideos, setOpenBackdropVideos] = useState(true);

  useEffect(() => {
    videoAPI
      .getAllVideo("dateTimeCreate", "desc", 0, 4, selectedChip)
      .then((response) => {
        setVideosByCategory(response.result.content);
      })
      .catch((error) => {})
      .finally(() => {
        setOpenBackdropVideos(false);
      });
  }, [selectedChip]);

  return (
    <>
      <ListCategory
        selectedChip={selectedChip}
        setSelectedChip={setSelectedChip}
        setOpenBackdropVideos={setOpenBackdropVideos}
      />
      <Grid container spacing={2} sx={{ position: "relative" }}>
        {videosByCategory.map((item) => (
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            key={item.idVideo}
            onClick={() => {
              navigate(`/watch/${item.idVideo}`);
            }}
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
          </Grid>
        ))}
        <Backdrop
          sx={{
            zIndex: 100,
            position: "absolute",
            backgroundColor:
              themeMode === "light"
                ? "rgba(255, 255, 255, 0.5)"
                : "rgba(15, 18, 20, 0.5)",
          }}
          open={openBackdropVideos}
        >
          {/* <CircularProgress
            color='inherit'
            sx={{
              position: "absolute",
              top: "150px",
            }}
          /> */}
        </Backdrop>
      </Grid>
      {videosByCategory.length == 0 && openBackdropVideos === false && (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 400px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Không có video nào thuộc thể loại này</Typography>
        </Box>
      )}
    </>
  );
}

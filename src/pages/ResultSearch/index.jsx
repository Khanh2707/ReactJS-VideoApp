import React, { useContext, useEffect, useState } from "react";
import ListCategory from "../../components/ListCategory";
import { Link } from "react-router-dom";
import { Backdrop, Box, Chip, Grid, Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ResultSearchCard from "../../components/ResultSearchCard";
import { AppContext } from "../../context/AppContext";
import { SearchContext } from "../../context/SearchContext";
import { ThemeContext } from "../../context/ThemeContext";
import videoAPI from "../../api/videoAPI";
import ListFilterMyVideo from "../../components/dialog/ListFilterMyVideo";

export default function ResultSearch() {
  const { themeMode } = useContext(ThemeContext);

  const { selectedChip, setSelectedChip } = useContext(AppContext);
  const { valueSearchAllVideo } = useContext(SearchContext);

  const [openBackdropVideos, setOpenBackdropVideos] = useState(true);
  const [listAllVideos, setListAllVideos] = useState([]);
  const [openDialogListFilterMyVideo, setOpenDialogListFilterMyVideo] =
    useState(false);
  const [propertySearch, setPropertySearch] = useState("dateTimeCreate");
  const [optionSort, setOptionSort] = useState("desc");

  const getAllSearchVideoByTitle = () => {
    if (valueSearchAllVideo === "") {
      videoAPI
        .getAllVideo(propertySearch, optionSort, 0, 1000, selectedChip)
        .then((response) => {
          const filteredVideos = response.result.content.filter(
            (video) => !(video.ban || video.hide)
          );
          setListAllVideos(filteredVideos);
          setOpenBackdropVideos(false);
        })
        .catch((error) => {});
    } else {
      videoAPI
        .getAllSearchVideoByTitle(
          valueSearchAllVideo,
          propertySearch,
          optionSort,
          0,
          1000,
          selectedChip
        )
        .then((response) => {
          const filteredVideos = response.result.content.filter(
            (video) => !(video.ban || video.hide)
          );
          setListAllVideos(filteredVideos);
          setOpenBackdropVideos(false);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    getAllSearchVideoByTitle();
  }, [valueSearchAllVideo, propertySearch, optionSort, selectedChip]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ListCategory setOpenBackdropVideos={setOpenBackdropVideos} />
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
          onClick={() => setOpenDialogListFilterMyVideo(true)}
        />
      </Box>
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
      <Grid container spacing={2}>
        {listAllVideos.map((item) => {
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
      {listAllVideos.length == 0 && openBackdropVideos === false && (
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
      <ListFilterMyVideo
        openDialogListFilterMyVideo={openDialogListFilterMyVideo}
        setOpenDialogListFilterMyVideo={setOpenDialogListFilterMyVideo}
        optionSort={optionSort}
        setOptionSort={setOptionSort}
        propertySearch={propertySearch}
        setPropertySearch={setPropertySearch}
        idCategory={selectedChip}
        setIdCategory={setSelectedChip}
      />
    </>
  );
}

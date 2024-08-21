import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import categoryVideoAPI from "../../api/categoryVideoAPI";

export default function ListSelectCategory({
  category,
  setCategory,
  errorCategory,
  setErrorCategory,
}) {
  const [showListCategory, setShowListCategory] = useState(false);
  const [listAllCategory, setListAllCategory] = useState([]);

  const buttonRef = useRef(null);
  const listCategoryRef = useRef(null);

  const theme = useTheme();

  const handleClickOutside = (event) => {
    if (
      listCategoryRef.current &&
      !listCategoryRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowListCategory(false);
    }
  };

  const toggleMenu = () => {
    setShowListCategory((prev) => !prev);
  };

  const handleSelectCategory = (item) => {
    setCategory(item);
    setShowListCategory(false);
    setErrorCategory("");
  };

  useEffect(() => {
    categoryVideoAPI.getAllCategory().then((response) => {
      console.log(response);
      setListAllCategory(response.result);
    });

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", mr: "10px" }}>
      <Button variant='outlined' onClick={toggleMenu} ref={buttonRef}>
        {category?.nameCategory ?? "Thể loại video"}
      </Button>
      {showListCategory && (
        <Paper
          ref={listCategoryRef}
          sx={{
            position: "absolute",
            minWidth: "135px",
            bottom: "40px",
            left: "0",
            bgcolor: theme.palette.customBgcolorMenu.main,
            boxShadow: theme.palette.customBoxShadowMenu.main,
            borderRadius: "8px",
          }}
        >
          <List>
            {listAllCategory.map((item, index) => {
              return (
                <ListItem disablePadding key={item.idCategory}>
                  <ListItemButton
                    onClick={() => handleSelectCategory(item)}
                    selected={
                      category && item.idCategory === category.idCategory
                    }
                  >
                    <Typography sx={{ ml: "8px" }}>
                      {item.nameCategory}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
      <Typography color='error' variant='subtitle2' sx={{ mt: "8px" }}>
        {errorCategory}
      </Typography>
    </Box>
  );
}

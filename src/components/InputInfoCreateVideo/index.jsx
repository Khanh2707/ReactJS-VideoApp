import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "customBorderTextField.main",
    },
    "&:hover fieldset": {
      borderColor: "customBorderTextField.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "customBorderTextField.main",
    },
  },
  "& .Mui-error": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
  },
};

export default function InputInfoCreateVideo({
  register,
  clearErrors,
  errors,
  fileVideo,
}) {
  const [titleVideo, setTitleVideo] = useState(0);
  const [descriptionVideo, setdescriptionVideo] = useState(0);

  const handleTitleVideoChange = (event) => {
    setTitleVideo(event.target.value.length);
  };

  const handleDescriptionVideoChange = (event) => {
    setdescriptionVideo(event.target.value.length);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Box>
        <Typography sx={{ fontWeight: "600", mb: "4px" }}>
          Tiêu đề (bắt buộc)
        </Typography>
        <TextField
          value={fileVideo.name.slice(0, fileVideo.name.lastIndexOf("."))}
          placeholder='Thêm tiêu đề để mô tả video của bạn!'
          size='small'
          error={!!errors.titleVideo}
          autoComplete='titleVideo'
          fullWidth
          id='titleVideo'
          name='titleVideo'
          helperText={errors.titleVideo?.message || ""}
          {...register("titleVideo", {
            required: "Vui lòng nhập tiêu đề",
            maxLength: {
              value: 100,
              message: "Tiêu đề không được quá 100 ký tự",
            },
            onChange: (e) => {
              clearErrors("titleVideo");
              handleTitleVideoChange(e);
            },
          })}
          sx={{
            width: "500px",
            ...textFieldStyles,
            "& .MuiInputBase-input": {
              paddingBottom: "25px",
            },
          }}
          multiline
          minRows={2}
          maxRows={Infinity}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{
                  position: "absolute",
                  bottom: "25px",
                  right: "0px",
                  transform: "translateY(100%)",
                  marginBottom: "8px",
                  paddingRight: "8px",
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography>{`${titleVideo}/100`}</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "600", mb: "4px" }}>Mô tả</Typography>
        <TextField
          placeholder='VD: Đây là lần đầu tiên tôi quay vlog...!'
          size='small'
          error={!!errors.descriptionVideo}
          autoComplete='descriptionVideo'
          fullWidth
          id='descriptionVideo'
          name='descriptionVideo'
          helperText={errors.descriptionVideo?.message || ""}
          {...register("descriptionVideo", {
            maxLength: {
              value: 5000,
              message: "Mô tả không được quá 5000 ký tự",
            },
            onChange: (e) => {
              clearErrors("descriptionVideo");
              handleDescriptionVideoChange(e);
            },
          })}
          sx={{
            width: "500px",
            ...textFieldStyles,
            "& .MuiInputBase-input": {
              paddingBottom: "25px",
            },
          }}
          multiline
          minRows={2}
          maxRows={Infinity}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{
                  position: "absolute",
                  bottom: "25px",
                  right: "0px",
                  transform: "translateY(100%)",
                  marginBottom: "8px",
                  paddingRight: "8px",
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography>{`${descriptionVideo}/5000`}</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

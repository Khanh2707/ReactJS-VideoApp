import {
  Box,
  Chip,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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
  setValue,
  fileVideo,
}) {
  const [titleVideo, setTitleVideo] = useState("");
  const [descriptionVideo, setDescriptionVideo] = useState("");
  const [error, setError] = useState("");
  const [fileImagePreview, setFileImagePreview] = useState("");

  const theme = useTheme();

  const imagePreviewRef = useRef(null);

  const handleClickImagePreview = () => {
    imagePreviewRef.current.click();
  };

  const handleSelectFileImagePreview = (e) => {
    const file = e.target.files[0];

    console.log(file);

    const validImageTypes = ["image/jpeg", "image/png"];

    if (validImageTypes.includes(file.type)) {
      file.preview = URL.createObjectURL(file);
      setFileImagePreview(file);
      setError("");
    } else {
      setError("Định dạng không hợp lệ. Vui lòng chọn tệp JPEG, PNG.");
      setFileImagePreview(null);
    }
  };

  const handleTitleVideoChange = (event) => {
    setTitleVideo(event.target.value);
  };

  const handleDescriptionVideoChange = (event) => {
    setDescriptionVideo(event.target.value);
  };

  useEffect(() => {
    if (fileVideo && fileVideo.name) {
      const defaultTitle = fileVideo.name.slice(
        0,
        fileVideo.name.lastIndexOf(".")
      );
      setTitleVideo(defaultTitle);
      setValue("titleVideo", defaultTitle);
      clearErrors("titleVideo");
    }
  }, [fileVideo, setValue, clearErrors]);

  useEffect(() => {
    return () => {
      fileImagePreview && URL.revokeObjectURL(fileImagePreview.preview);
    };
  }, [fileImagePreview]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Box>
        <Typography sx={{ fontWeight: "600", mb: "4px" }}>
          Tiêu đề (bắt buộc)
        </Typography>
        <TextField
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
                <Typography>{`${titleVideo.length}/100`}</Typography>
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
            width: "400px",
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
                <Typography>{`${descriptionVideo.length}/5000`}</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {!fileImagePreview && (
        <Box
          sx={{
            width: "150px",
            height: "80px",
            border: `1px dashed ${theme.palette.customGreySubTitle.main}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleClickImagePreview}
        >
          <Box sx={{ textAlign: "center" }}>
            <AddPhotoAlternateIcon
              sx={{ color: `${theme.palette.customGreySubTitle.main}` }}
            />
            <Typography
              variant='subtitle2'
              sx={{ color: "customGreySubTitle.main" }}
            >
              Tải tệp lên
            </Typography>
          </Box>
          <input
            type='file'
            ref={imagePreviewRef}
            onChange={handleSelectFileImagePreview}
            style={{ display: "none" }}
            // accept="video/mp4"
          />
        </Box>
      )}
      {error && (
        <Typography color='error' variant='subtitle2' sx={{ mt: "-16px" }}>
          {error}
        </Typography>
      )}
      {fileImagePreview && (
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "320px" }}>
            <img
              src={fileImagePreview.preview}
              alt=''
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Chip
            label='Đổi ảnh'
            sx={{
              p: "4px",
              ml: "12px",
              bgcolor: "text.primary",
              color: "secondary.main",
              "&:hover": {
                bgcolor: "text.primary",
                opacity: "0.9",
              },
              fontSize: "14px",
              fontWeight: "600",
            }}
            onClick={handleSelectFileImagePreview}
          />
        </Box>
      )}
    </Box>
  );
}

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChannelEditingDetails() {
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

  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleDescriptionChange = (event) => {
    setDescriptionLength(event.target.value.length);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (formData) => {
    console.log("Form data is: ", formData);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{
        width: "100%",
        maxWidth: "400px",
        p: "0 16px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "600", mb: "4px" }}>
            Tên kênh
          </Typography>
          <TextField
            placeholder='VD: Mr.Beast'
            size='small'
            error={!!errors.nameChannel}
            autoComplete='nameChannel'
            id='nameChannel'
            name='nameChannel'
            autoFocus
            helperText={errors.nameChannel?.message || ""}
            {...register("nameChannel", {
              required: "Vui lòng nhập trường này",
              maxLength: {
                value: 45,
                message: "Tên kênh không được quá 45 ký tự",
              },
              onChange: () => clearErrors("nameChannel"),
            })}
            sx={{ ...textFieldStyles, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "600", mb: "4px" }}>
            Tên người dùng
          </Typography>
          <TextField
            placeholder='VD: Trần Phúc Khánh'
            size='small'
            error={!!errors.nameUser}
            autoComplete='nameUser'
            fullWidth
            id='nameUser'
            name='nameUser'
            helperText={errors.nameUser?.message || ""}
            {...register("nameUser", {
              required: "Vui lòng nhập trường này",
              maxLength: {
                value: 45,
                message: "Tên người dùng không được quá 45 ký tự",
              },
              onChange: () => clearErrors("nameUser"),
            })}
            sx={textFieldStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "600", mb: "4px" }}>
            Thông tin mô tả
          </Typography>
          <TextField
            placeholder='VD: Đến từ Hà Nội'
            size='small'
            error={!!errors.description}
            autoComplete='description'
            fullWidth
            id='description'
            name='description'
            helperText={errors.description?.message || ""}
            {...register("description", {
              required: "Vui lòng nhập trường này",
              maxLength: {
                value: 255,
                message: "Thông tin mô tả không được quá 255 ký tự",
              },
              onChange: (e) => {
                clearErrors("description");
                handleDescriptionChange(e);
              },
            })}
            sx={textFieldStyles}
            multiline
            rows={4}
            // inputProps={{ maxLength: 255 }}
          />
          <Typography
            variant='caption'
            sx={{ display: "block", textAlign: "right", mt: 1 }}
          >
            {descriptionLength}/255
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant='contained'
        fullWidth
        sx={{
          mt: "32px",
          p: "8px",
          borderRadius: "8px",
        }}
      >
        <Typography variant='subtitle2' sx={{ fontWeight: "600" }}>
          Thay đổi
        </Typography>
      </Button>
    </Box>
  );
}

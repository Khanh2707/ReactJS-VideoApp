import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
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
        p: 2, // Padding
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "600", mb: "4px" }}>
            Tên đăng nhập
          </Typography>
          <TextField
            placeholder='VD: phuckhanh@gmail.com'
            size='small'
            error={!!errors.username}
            autoComplete='username'
            id='username'
            name='username'
            autoFocus
            helperText={errors.username?.message || ""}
            {...register("username", {
              required: "Vui lòng nhập trường này",
              onChange: () => clearErrors("username"),
            })}
            sx={{ ...textFieldStyles, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "600", mb: "4px" }}>
            Mật khẩu
          </Typography>
          <TextField
            placeholder='Mật khẩu'
            size='small'
            error={!!errors.password}
            autoComplete='password'
            fullWidth
            id='password'
            name='password'
            helperText={errors.password?.message || ""}
            {...register("password", {
              required: "Vui lòng nhập trường này",
              onChange: () => clearErrors("password"),
            })}
            sx={textFieldStyles}
          />
        </Grid>
      </Grid>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: "32px",
          p: "8px",
          bgcolor: "#1ac7b6",
          "&:hover": {
            backgroundColor: "#1ac7b6",
            opacity: "0.9",
          },
          borderRadius: "8px",
        }}
      >
        <Typography variant='subtitle2' sx={{ fontWeight: "600" }}>
          Đăng nhập
        </Typography>
      </Button>
    </Box>
  );
}

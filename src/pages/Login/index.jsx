import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import iconGoogle from "../../assets/icon-google.png";

export default function Login() {
  const theme = useTheme();

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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
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
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "360px",
          minHeight: "100px",
          padding: "32px 24px",
          margin: "24px",
          alignSelf: "center",
          boxShadow: theme.palette.customBoxShadowForm.main,
          bgcolor: "customBgcolorForm.main",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant='h6'
          sx={{ fontWeight: "600", mb: "8px", alignSelf: "center" }}
        >
          Đăng nhập
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{
            mb: "32px",
            alignSelf: "center",
            color: "customGreySubTitle.main",
          }}
        >
          Xem video online trên ViewTube ❤️
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
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
                fullWidth
                id='username'
                name='username'
                autoFocus
                helperText={errors.username?.message || ""}
                {...register("username", {
                  required: "Vui lòng nhập trường này",
                  onChange: () => clearErrors("username"),
                })}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                Mật khẩu
              </Typography>
              <TextField
                placeholder='Mật khẩu'
                size='small'
                type={showPassword ? "text" : "password"}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
          <Button
            variant='outlined'
            fullWidth
            sx={{
              mt: "32px",
              p: "8px",
              borderColor: "customGreySubTitle.main",
              "&:hover": {
                backgroundColor: "customBgcolorForm.main",
                borderColor: "customGreySubTitle.main",
              },
              borderRadius: "8px",
            }}
          >
            <Box sx={{ width: "20px", height: "20px" }}>
              <img
                alt=''
                src={iconGoogle}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Typography variant='subtitle2' sx={{ ml: "8px" }}>
              Đăng nhập với Google
            </Typography>
          </Button>
          <Box sx={{ mt: "32px", textAlign: "center" }}>
            <Typography component='span' sx={{ mr: "4px" }}>
              Bạn chưa có tài khoản?
            </Typography>
            <Link to='/register' style={{ textDecoration: "none" }}>
              <Typography
                component='span'
                sx={{ color: "#1ac7b6", cursor: "pointer" }}
              >
                Đăng ký
              </Typography>
            </Link>
            <Typography>Hoặc</Typography>
            <Typography sx={{ color: "#1ac7b6", cursor: "pointer" }}>
              Quên mật khẩu?
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
}

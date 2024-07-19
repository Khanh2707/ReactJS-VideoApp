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

export default function Register() {
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Mật khẩu không khớp",
      });
      return;
    }

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
          borderRadius: "2px",
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
          Đăng ký
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
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
                  },
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
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                Nhập lại mật khẩu
              </Typography>
              <TextField
                placeholder='Nhập lại mật khẩu'
                size='small'
                type={showConfirmPassword ? "text" : "password"}
                error={!!errors.confirmPassword}
                autoComplete='confirmPassword'
                fullWidth
                id='confirmPassword'
                name='confirmPassword'
                helperText={errors.confirmPassword?.message || ""}
                {...register("confirmPassword", {
                  required: "Vui lòng nhập trường này",
                  onChange: () => clearErrors("confirmPassword"),
                })}
                sx={textFieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        edge='end'
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
              Đăng ký
            </Typography>
          </Button>
          <Box sx={{ mt: "32px", textAlign: "center" }}>
            <Typography component='span' sx={{ mr: "4px" }}>
              Bạn đã có tài khoản?
            </Typography>
            <Link to='/login' style={{ textDecoration: "none" }}>
              <Typography
                component='span'
                sx={{ color: "#1ac7b6", cursor: "pointer" }}
              >
                Đăng nhập
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
}

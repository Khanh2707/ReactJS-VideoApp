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
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import iconGoogle from "../../assets/icon-google.png";
import authAPI from "../../api/authAPI";
import { AppContext } from "../../context/AppContext";
import { OAuthConfig } from "../../configurations/configurations";

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { getMyAccount } = useContext(AppContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const theme = useTheme();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // API
  const handleFormSubmit = (formData) => {
    authAPI
      .authenticate(formData)
      .then((response) => {
        localStorage.setItem("accessToken", response.result.token);
        getMyAccount();
        navigate("/");
        console.log(response);
      })
      .catch((error) => {
        setOpenSnackbar(true);
        console.log(error);
      });
  };

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  return (
    <>
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
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: "600", color: "#fff" }}
              >
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
              onClick={handleContinueWithGoogle}
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          variant='filled'
          sx={{ width: "100%" }}
        >
          Thông tin đăng nhập chưa chính xác!
        </Alert>
      </Snackbar>
    </>
  );
}

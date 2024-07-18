import {
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const theme = useTheme();

  const textFieldStyles = {
    "& .MuiInputLabel-root": {
      color: "customGreySubTitle.main",
      "&.Mui-focused": {
        color: "customGreySubTitle.main",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "customBorderTextField.main",
      },
      "&:hover fieldset": {
        borderColor: "customBorderTextField.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "customGreySubTitle.main",
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
          width: "360px",
          minHeight: "100px",
          padding: "32px 24px",
          textAlign: "center",
          borderRadius: "2px",
          margin: "24px",
          alignSelf: "center",
          boxShadow: theme.palette.customBoxShadowForm.main,
          bgcolor: "customBgcolorForm.main",
          borderRadius: "8px",
        }}
      >
        <Typography variant='h5' sx={{ mb: "32px" }}>
          Đăng nhập
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                size='small'
                error={!!errors.username}
                autoComplete='username'
                fullWidth
                id='username'
                label='User Name'
                name='username'
                autoFocus
                helperText={errors.username?.message || ""}
                {...register("username", {
                  required: "User Name is required",
                  minLength: {
                    value: 5,
                    message: "User Name must be at least 5 characters long",
                  },
                  onChange: () => clearErrors("username"),
                })}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                error={!!errors.password}
                autoComplete='password'
                fullWidth
                id='password'
                label='Password'
                name='password'
                helperText={errors.password?.message || ""}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  onChange: () => clearErrors("password"),
                })}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                error={!!errors.email}
                autoComplete='email'
                fullWidth
                id='email'
                label='Email'
                name='email'
                helperText={errors.email?.message || ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                  onChange: () => clearErrors("email"),
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
              mt: "24px",
              p: "8px",
              bgcolor: "#1dbfaf",
              "&:hover": {
                backgroundColor: "#17a797",
              },
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
}

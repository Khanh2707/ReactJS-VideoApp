import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";

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

export default function ChannelEditingDetails() {
  const [descriptionLength, setDescriptionLength] = useState(0);

  const { myAccount } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameChannel: myAccount.channel.name,
      nameUniqueChannel: myAccount.channel.nameUnique,
      descriptionChannel: myAccount.channel.description,
    },
  });

  const handleDescriptionChange = (event) => {
    setDescriptionLength(event.target.value.length);
  };

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
            error={!!errors.nameUniqueChannel}
            autoComplete='nameUniqueChannel'
            fullWidth
            id='nameUniqueChannel'
            name='nameUniqueChannel'
            helperText={errors.nameUniqueChannel?.message || ""}
            {...register("nameUniqueChannel", {
              required: "Vui lòng nhập trường này",
              maxLength: {
                value: 45,
                message: "Tên người dùng không được quá 45 ký tự",
              },
              onChange: () => clearErrors("nameUniqueChannel"),
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
            error={!!errors.descriptionChannel}
            autoComplete='descriptionChannel'
            fullWidth
            id='descriptionChannel'
            name='descriptionChannel'
            helperText={errors.descriptionChannel?.message || ""}
            {...register("descriptionChannel", {
              required: "Vui lòng nhập trường này",
              maxLength: {
                value: 255,
                message: "Thông tin mô tả không được quá 255 ký tự",
              },
              onChange: (e) => {
                clearErrors("descriptionChannel");
                handleDescriptionChange(e);
              },
            })}
            multiline
            minRows={4}
            maxRows={Infinity}
            sx={{
              ...textFieldStyles,
              "& .MuiInputBase-input": {
                paddingBottom: "25px",
              },
            }}
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
                  <Typography>{`${descriptionLength}/100`}</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant='contained'
        fullWidth
        type='submit'
        sx={{
          mt: "32px",
          p: "8px",
          borderRadius: "8px",
          bgcolor: "#2e7d32",
          "&:hover": {
            bgcolor: "#2e7d32",
          },
        }}
      >
        <Typography
          variant='subtitle2'
          sx={{ fontWeight: "600", color: "#fff" }}
        >
          Thay đổi
        </Typography>
      </Button>
    </Box>
  );
}

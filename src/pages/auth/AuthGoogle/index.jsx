import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { Backdrop, CircularProgress } from "@mui/material";

export default function AuthGoogle() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const { getMyAccount } = useContext(AppContext);

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `http://localhost:8080/auth/outbound/authentication?code=${authCode}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          localStorage.setItem("accessToken", data.result?.token);
          setIsLoggedin(true);
          getMyAccount();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <Backdrop
      open={true}
      sx={{ bgcolor: "primary.main", transitionDuration: "0ms" }}
    >
      <CircularProgress sx={{ color: "text.primary" }} size={100} />
    </Backdrop>
  );
}

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthContext from "../Contexts/AuthContext";
import { useContext, useState, useEffect, lazy } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "../css/Signup.module.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Kamari
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const iconHover = {
  cursor: "pointer",
  alignSelf: "start",
  margin: "0px 0px 20px 0px",
};

export default function ClientAdmin() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const client = (searchParams.get("client"));
  const client_obj = JSON.parse(decodeURIComponent(client))
  console.log(client_obj)
  // const client = JSON.parse(decodeURIComponent(searchParams.get("client")));

  // useEffect(() => {
  //   console.log(client_obj)
  // }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      client: client_obj,
      client_user_name: {
        first: data.get("firstName"),
        last: data.get("lastName")
      },
      client_user_email: data.get("email"),
      client_user_password: data.get("password"),
    };

    fetchWrapper("/client-user", "", "POST", { ...payload }).then((res) => {
      if (res.message === "Client User Created") {
        console.log(res)
        const client_admin = encodeURIComponent(JSON.stringify(res.client_user));
        const url_client = encodeURIComponent(JSON.stringify(client_obj));
        console.log(client_admin, url_client)
        // navigate(`/client-team/?client=${url_client}&client_admin=${client_admin}`);
        navigate("/client-dashboard")
      }
    });
  };

  function handleBackClick() {
    navigate("/");
  }

  return (
    <div className={styles.Signup}>
      <div className={styles.Message}>
        <div className={styles.MessageText}>
          <Typography variant="h2">Step. 2</Typography>
          <Typography variant="body1">
            Create your admin account. This is the account that will be able to manage team members and will be listed as the point of contact on Kamari.
          </Typography>
        </div>
      </div>
      <div className={styles.SignupForm}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ArrowBackIcon
              onClick={() => handleBackClick()}
              style={iconHover}
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "5px",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoFocus
                />
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ WebkitBoxShadow: "0 0 0 1000px white inset" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </div>
  );
}

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
import bcrypt from "bcryptjs";
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

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export default function Signup() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const hashedPassword = await hashPassword(data.get("password"));

    const payload = {
      email: email ? email : data.get("email"),
      password: hashedPassword,
      type: "standard",
      organization: data.get("organizationName"),
      name: {
        first: data.get("firstName"),
        last: data.get("lastName"),
      },
    };

    fetchWrapper("/signup", "", "POST", { ...payload }).then((res) => {
      if (res.message === "User Registered") {
        setUserData(res.user);
        setTokenString(res.token);
        navigate("/");
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
          <Typography variant="h2">Welcome to Kamari</Typography>
          <Typography variant="body1">
            We hope you are enjoy our beta testing. If you have any feed back,
            reach out to us or submit a ticket by clicking the "Submit Issue"
            button in your profile.
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
            <Avatar sx={{ m: 1, bgcolor: "#6CE5E8" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="organizationName"
                label="Organization Name"
                name="organizationName"
                autoFocus
              />
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
                defaultValue={email ? email : ""}
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Have an account? Log In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </div>
  );
}

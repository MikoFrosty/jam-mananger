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

export default function ClientSignup() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const org_id = searchParams.get("org_id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: email ? email : data.get("email"),
      password: data.get("password"),
      type: "client",
      client_organization: data.get("organizationName"),
      associated_org_id: org_id,
    };

    fetchWrapper("/client-signup", "", "POST", { ...payload }).then((res) => {
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
            One of our trusted partners sent you an invite to view your product
            documentation. We are so glad you have decided to support a brand
            who supports us. Remember, your docs don't go away and will always
            be free to see. Client's never pay a penny.
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
              Create Client Account
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
                label="Brand Name"
                name="organizationName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
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
                Create Client Account
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </div>
  );
}

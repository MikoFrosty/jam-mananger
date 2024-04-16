import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import fetchWrapper from "../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthContext from "../Contexts/AuthContext";
import { useContext, useState, useEffect, lazy } from "react";

import { Grid } from "@mui/material";

import styles from "../css/Signup.module.css";
import { useDispatch } from 'react-redux';
import { setClientUser } from '../StateManagement/Actions/actions';

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

export default function ClientAccountSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
    } else {
      setPasswordError("");
    }

    // If both email and password are valid, proceed with form submission
    if (emailRegex.test(email) && passwordRegex.test(password) && data.get("organizationName").length > 2) {
      const payload = {
        account_email: data.get("email"),
        account_password: data.get("password"),
        account_name: data.get("organizationName"),
      };

      console.log(payload);

      fetchWrapper("/client-account", "", "POST", { ...payload }).then((res) => {
        if (res.message === "Client account created") {
          setUserData(res.client_account);
          setTokenString(res.token);
          dispatch(setClientUser(res.client_account));
        }
      });
    }
  };

  useEffect(() => {
    if (token && user) {
      navigate("/client-dashboard")
    }
  }, [token, user])

  function handleBackClick() {
    navigate("/");
  }

  return (
    <div className={styles.Signup}>
      <div className={styles.Message}>
        <div className={styles.MessageText}>
          <Typography variant="h2">Welcome to Kamari</Typography>
          <Typography variant="body1">
            No more overpaying to find freelancers. With Kamari, you can post jobs, find talent, and manage tasks easily.
          </Typography>
          <Typography mt={15} variant="caption">
            You are using the beta version of Kamari so if there is something you see that can be better, reach out to us and let us know!
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
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              className={styles.AuthForm}
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel}>Brand Name</label>
                <input
                  required
                  id="organizationName"
                  name="organizationName"
                  className={styles.SprintTitleInput}
                  type="text"
                />
              </div>
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel}>Email</label>
                <input
                  required
                  id="email"
                  name="email"
                  defaultValue={email ? email : ""}
                  className={styles.SprintTitleInput}
                  type="email"
                  autoComplete="email"
                />
                {emailError && (
                  <Typography variant="caption" color="error">
                    {emailError}
                  </Typography>
                )}
              </div>
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel}>Password</label>
                <input
                  required
                  id="password"
                  name="password"
                  className={styles.SprintTitleInput}
                  type="password"
                  autoComplete="current-password"
                />
                {passwordError && (
                  <Typography variant="caption" color="error">
                    {passwordError}
                  </Typography>
                )}
              </div>
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

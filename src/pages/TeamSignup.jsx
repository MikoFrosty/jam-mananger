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
      <Link color="inherit" href="https://kamariteams.com">
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

export default function Signup() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type") || null;
  const org_id = searchParams.get("org_id") || null;
  const invitation_id = searchParams.get("invitation_id") || null;
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

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

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      const payload = {
        email: email ? email : data.get("email"),
        password: data.get("password"),
        type: "standard",
        role: type,
        existing_org_id: org_id,
        invitation_id,
        name: {
          first: data.get("firstName"),
          last: data.get("lastName"),
        },
        hourly_rate: data.get("hourlyRate")
      };
  
      console.log(payload);
  
      fetchWrapper("/signup", "", "POST", { ...payload }).then((res) => {
        if (res.message === "User Registered") {
          setUserData(res.user);
          setTokenString(res.token);
          navigate("/");
        }
      })
    }
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "5px",
                }}
              >
                <div className={styles.SprintInput}>
                  <label className={styles.SprintLabel}>First Name</label>
                  <input
                    required
                    id="firstname"
                    name="firstName"
                    className={styles.SprintTitleInput}
                    type="text"
                  />
                </div>
                <div className={styles.SprintInput}>
                  <label className={styles.SprintLabel}>Last Name</label>
                  <input
                    required
                    id="lastname"
                    name="lastName"
                    className={styles.SprintTitleInput}
                    type="text"
                  />
                </div>
              </div>
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel}>Hourly Rate</label>
                <div className={styles.PrefixWrapper}>
                  <div className={styles.Prefix}>$</div>
                  <input
                    name="hourlyRate"
                    id="hourlyrate"
                    required
                    defaultValue={35}
                    min={0}
                    className={styles.SprintTitleInput}
                    type="number"
                  />
                </div>
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

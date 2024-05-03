import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import fetchWrapper from "../utils/fetchWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSearchParams } from "react-router-dom";

import styles from "../css/Signup.module.css";
import { useEffect, useState } from "react";

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

export default function ForgotPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("u") || null;
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!showPassword) {
      const payload = {
        email: data.get("email"),
      };

      fetchWrapper("/reset-password-link", "", "POST", { ...payload }).then(
        (res) => {
          console.log(res);
        }
      );
    } else {
      const password1 = data.get("password1");
      const password2 = data.get("password2");

      if (password1 !== password2) {
        setPasswordError("Passwords do not match");
      } else {
        // Password validation
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password1)) {
          setPasswordError(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
          );
        } else {
          setPasswordError("");
          const payload = {
            password: data.get("password1"),
            id: user_id,
          };

          fetchWrapper("/reset-password", "", "POST", { ...payload }).then(
            (res) => {
              console.log(res);
            }
          );
        }
      }
    }
  };

  useEffect(() => {
    if (user_id) {
      setShowPassword(true);
    }
  }, [user_id]);

  function handleBackClick() {
    navigate("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.AuthForm}>
        <ArrowBackIcon onClick={() => handleBackClick()} style={iconHover} />
        <Typography textAlign={"left"} component="h1" variant="h5">
          Forgot Password?
        </Typography>
        {!showPassword ? (
          <Typography textAlign={"left"} variant="body1">
            If we find an account with the associated email, we will send a link
            to reset the password. If you do not see the email, check your spam
            folder.
          </Typography>
        ) : (
          <Typography textAlign={"left"} variant="body1">
            Enter a new password below
          </Typography>
        )}
        <form
          className={styles.AuthForm}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {!showPassword ? (
            <div className={styles.SprintInput}>
              <label className={styles.SprintLabel}>Email</label>
              <input
                required
                id="email"
                name="email"
                className={styles.SprintTitleInput}
                type="email"
                autoComplete="email"
              />
            </div>
          ) : (
            <>
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel}>Password</label>
                <input
                  required
                  id="password1"
                  name="password1"
                  className={styles.SprintTitleInput}
                  type="password"
                />
              </div>
              <div className={styles.SprintInput}>
                <label className={styles.SprintLabel}>Re-enter Password</label>
                <input
                  required
                  id="password2"
                  name="password2"
                  className={styles.SprintTitleInput}
                  type="password"
                />
              </div>
            </>
          )}
          {passwordError && (
            <Typography variant="caption" color="error">
              {passwordError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {
              !showPassword ? "Send Reset Link" : "Reset Password"
            }
          </Button>
          <Grid container spacing={"15px"} justifyContent="center">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Need an Account?"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/client-login" variant="body2">
                {"Client Login"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/forgot-password" variant="body2">
                {"Forgot Password?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

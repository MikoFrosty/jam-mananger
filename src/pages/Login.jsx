import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthContext from "../Contexts/AuthContext";
import { useContext } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { setLogout, setUser } from "../StateManagement/Actions/actions";

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

export default function Login() {
  const dispatch = useDispatch();
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };
    fetchWrapper("/login", "", "POST", { ...payload }).then((res) => {
      setUserData(res.user);
      setTokenString(res.token);
      localStorage.setItem("token", res.token);

      dispatch(setUser(res.user));
      dispatch(setLogout(false));

      if (res?.token) {
        navigate("/");
      }
    });
  };

  function handleBackClick() {
    navigate("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.AuthForm}>
        <ArrowBackIcon onClick={() => handleBackClick()} style={iconHover} />
        <Typography textAlign={"left"} component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={styles.AuthForm}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
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
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
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

import Avatar from "@mui/material/Avatar";
import styles from "../css/FindWork.module.css";
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
import { useContext } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { setLogout, setClientUser } from "../StateManagement/Actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function ClientLogin() {
  const dispatch = useDispatch();
  const { clientUser, setClientUserData, token, setTokenString } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      client_user_email: data.get("email"),
      client_user_password: data.get("password"),
    };
    fetchWrapper("/client-account-login", "", "POST", { ...payload })
      .then((res) => {
        console.log(res);
        setTokenString(res.token);

        dispatch(setClientUser(res.client_account));
        dispatch(setLogout(false));

        if (res?.token) {
          navigate("/client-dashboard");
        }

        console.log(res);
      })
      .catch((error) => {
        notify("Invalid username or password. Try again.");
        if (error.response) {
          // Handle the specific case for status 409
          notify("Specific error message for status 409");
        } else {
          // Handle other errors
          notify(error);
        }
      });
  };

  function handleBackClick() {
    navigate("/home");
  }

  return (
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
        <ArrowBackIcon onClick={() => handleBackClick()} style={iconHover} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          />
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
              <Link href="/forgot-password" variant="body2">
                {"Forgot Password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Not a Client?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <ToastContainer className={styles.ToastContainerStyle} />
    </Container>
  );
}

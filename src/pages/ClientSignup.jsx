import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const org_id = searchParams.get("org_id");
  const invitation_id = searchParams.get("invitation_id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      client_name: data.get("organizationName"),
      associated_org_id: org_id,
      invitation_id: invitation_id
    };

    fetchWrapper("/client", "", "POST", { ...payload }).then((res) => {
      console.log(res);
      if (res.message === 'Client created') {
        console.log(res.client)
        const client = JSON.stringify(res.client);
        console.log(client)
        const url_client = encodeURIComponent(client);
        // console.log(url_client)
        // const decoded = decodeURIComponent(url_client);
        // console.log(decoded);
        // const client_obj = JSON.parse(decoded);
        // console.log(client_obj)
        navigate(`/client-admin/?client=${url_client}`);
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
          <Typography variant="h2">Step. 1</Typography>
          <Typography variant="body1">
            Create the client account. This will be the organization that is
            connected to the org that invited you. In the next step you will be
            creating your admin account.
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="organizationName"
                label="Brand Name"
                name="organizationName"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </div>
  );
}

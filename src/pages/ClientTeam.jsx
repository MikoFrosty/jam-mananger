import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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

export default function ClientTeam() {
  const { user, setUserData, token, setTokenString } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [teamEmails, setTeamEmails] = useState(["", "", "", ""]);
  const client = JSON.parse(searchParams.get("client"));
  const clientAdmin = JSON.parse(searchParams.get("client_admin"));

  useEffect(() => {
    console.log(client);
    console.log(clientAdmin);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payloads = teamEmails.filter((email) => email && email !== "").map((email) => {
      return {
        team_member_email: email,
        type: "team-member",
      };
    });

    for (let payload of payloads) {
      console.log(payload)
      fetchWrapper("/client-invitation", "", "POST", { ...payload });
    }

    navigate("/client-dashboard");
  };

  function handleBackClick() {
    navigate("/client-admin");
  }

  function handleTeamEmailChange(value, index) {
    // Create a new array by copying the current teamEmails state
    const updatedEmails = [...teamEmails];

    // Update the email at the specific index with the new value
    updatedEmails[index] = value;

    // Set the updated emails array as the new state
    setTeamEmails(updatedEmails);
  }
  return (
    <div className={styles.Signup}>
      <div className={styles.Message}>
        <div className={styles.MessageText}>
          <Typography variant="h2">Step. 3</Typography>
          <Typography variant="body1">
            Last step! Invite up to 4 of your team members to manage the product
            pipeline alongside you. Enter their emails, have them accept the
            invite via email, and get started! You can manage admin privileges
            later.
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
              sx={{
                mt: 1,
                width: "100%",
                rowGap: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className={styles.Invitee}>
                <Typography variant="caption">
                  {`${clientAdmin?.client_user_name?.first} ${clientAdmin?.client_user_name.last}`}{" "}
                  - Admin
                </Typography>
                <Typography variant="body1">
                  {clientAdmin?.client_user_email}
                </Typography>
              </div>
              {teamEmails.map((email, index) => {
                return (
                  <div className={styles.Invitee}>
                    <Typography variant="caption">Team Member</Typography>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Team Email"
                      name="email"
                      autoComplete="email"
                      value={teamEmails[index]}
                      onChange={(e) =>
                        handleTeamEmailChange(e.target.value, index)
                      }
                    />
                  </div>
                );
              })}
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

import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";

import styles from "../css/LandingPage.module.css";
import LandingAppBar from '../features/AppBar/LandingAppBar';

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#333",
  width: "30%",
  backgroundColor: "white",
  boxShadow: "none",
  border: "2px solid #333",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    border: "2px solid #333",
  },
}));

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
      {`${new Date().getFullYear()}.`}
    </Typography>
  );
}

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.LandingPage}>
      <LandingAppBar />
      <div className={styles.Main}>
        <div className={styles.ContentRow}></div>
      </div>
      <Copyright />
    </div>
  );
}

export default Landing;

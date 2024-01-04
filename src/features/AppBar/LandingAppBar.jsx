import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import kamariLogo from "../../../public/kamari.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import styles from "../../css/LandingAppBar.module.css";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#333",
  backgroundColor: "white",
  boxShadow: "none",
  border: "2px solid #333",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    border: "2px solid #333",
  },
}));

const TextButton = styled(Button)(({ theme }) => ({
  color: "#333",
  backgroundColor: "white",
  boxShadow: "none",
  border: "2px solid transparent",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "2px solid #6CE5E8",
    borderTop: "2px solid transparent",
    borderRight: "2px solid transparent",
    borderLeft: "2px solid transparent",
    transition: "0.3s",
  },
}));

export default function LandingAppBar() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className={styles.AppBar}>
      <div className={styles.ToolBar}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={handleClick}
        >
          <img
            className={styles.LogoImage}
            src={kamariLogo}
            alt="Kamari Logo"
          />
          <Typography variant="h5" color="#333" noWrap>
            Kamari
          </Typography>
        </div>
        <div className={styles.ButtonGroupRow}>
          <TextButton
            onClick={() => navigate("/about-us")}
            disableTouchRipple
            variant="contained"
          >
            About Us
          </TextButton>
          <TextButton
            onClick={() => navigate("/pricing")}
            disableTouchRipple
            variant="contained"
          >
            Pricing
          </TextButton>
          <TextButton
            onClick={() => navigate("/signup")}
            disableTouchRipple
            variant="contained"
          >
            Get Kamari For Free
          </TextButton>
        </div>
      </div>
    </div>
  );
}

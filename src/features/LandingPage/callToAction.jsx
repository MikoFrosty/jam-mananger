import React from "react";
import RightGraphic from "../../../public/landing-graphic-right.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import styles from '../../css/CallToAction.module.css'; // Import the CSS file

export default function CallToAction() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate(`/signup?email=${data.get('email')}`);
  }

  return (
    <div className={styles.callToActionContainer}>
      <div className={styles.flexRow}>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
        >
          <h1 className={styles.title}>Redefining Sprint Management</h1>
          <h3 className={styles.description}>
            Kamari focuses on empowering teams who strive to work together
            towards rapid delivery of products.
          </h3>
          <div className={styles.flexRowCenter}>
            <TextField
              margin="none"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="standard"
              className={styles.emailTextField}
            />
            <Button
              type="submit"
              variant="outlined"
              className={styles.getStartedButton}
            >
              Get Started
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </form>
        <div className={styles.graphicContainer}>
          <img className={styles.graphicImage} src={RightGraphic} alt="Right Graphic"/>
        </div>
      </div>
    </div>
  );
}

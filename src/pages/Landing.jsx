import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import background from "../../public/kamari-background-photo.png";

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
  const isMobile = window.innerWidth < 600;
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        minWidth: "100vw", // Ensure full viewport width
        maxWidth: "100vw",
        color: "#333",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover", // Cover the entire area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat",
        margin: "0px",
        overflowY: "scroll",
      }}
    >
      <div>
        <div
          style={{
            height: "calc(100vh - 20px)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "calc(100% - 20px)" : "33%",
              textAlign: "left",
              flex: "2",
              justifyContent: isMobile ? "start" : "center",
              marginLeft: isMobile ? "10px" : "30px",
              margin: isMobile ? "20px 10px" : "0px 30px"
            }}
          >
            <h1 style={{ margin: "10px 0px" }}>Welcome to Kamari</h1>
            <p>
              Kamari is a dev centric project management solution for
              organizations of all sizes. We aim to build for the individual and
              fit the needs of the enterprise. Welcome to Kamari!
            </p>
            <ColorButton onClick={() => navigate("/signup")} style={{width: "fit-content"}}>Get Started for Free</ColorButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

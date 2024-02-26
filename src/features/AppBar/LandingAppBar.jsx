import Typography from "@mui/material/Typography";
import kamariLogo from "../../../public/kamari-1000.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import styles from "../../css/LandingAppBar.module.css";
import HoverDropdown from "../../components/HoverDropdown";

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
        <div className={styles.ButtonGroupRow}>
          <div className={styles.Logo} onClick={handleClick}>
            <img
              className={styles.LogoImage}
              src={kamariLogo}
              alt="Kamari Logo"
            />
          </div>
          <HoverDropdown
            dropdownContent={
              <>
                <div className={styles.HoverDropdownContentChildren}>
                  <Typography variant="body1">Documentation</Typography>
                  <Typography color={"#a1a1a1"} variant="caption">Centralize Brand Knowledge</Typography>
                </div>
                <div className={styles.HoverDropdownContentChildren}>
                  <Typography variant="body1">Project Management</Typography>
                  <Typography color={"#a1a1a1"} variant="caption">Coming Soon</Typography>
                </div>
                <div className={styles.HoverDropdownContentChildren}>
                  <Typography variant="body1">Reporting</Typography>
                  <Typography color={"#a1a1a1"} variant="caption">Coming Soon</Typography>
                </div>
              </>
            }
            buttonContent={
              <Typography variant="body1">Products</Typography>
            }
          />
          <HoverDropdown
            dropdownContent={
              <div className={styles.DropdownContentRow}>
                <div className={styles.DropdownContentRowLeft}>
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body1">Integrations</Typography>
                    <Typography color={"#a1a1a1"} variant="caption">Coming Soon</Typography>
                  </div>
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body1">Pipelines</Typography>
                    <Typography color={"#a1a1a1"} variant="caption">Coming Soon</Typography>
                  </div>
                  <div className={styles.HoverDropdownContentChildren}>
                    <Typography variant="body1">Client View</Typography>
                    <Typography color={"#a1a1a1"} variant="caption">Invite clients to get a closer look at progress</Typography>
                  </div>
                </div>
                {/* <div className={styles.dropdownContentRowRight}>
                  
                </div> */}
              </div>
            }
            buttonContent={
              <Typography variant="body1">Resources</Typography>
            }
          />
        </div>
        <div className={styles.ButtonGroupRow}>
          {/* <button onClick={() => navigate("/pricing")} className={styles.LandingAppBarButton}>
            <Typography variant="body1">Pricing</Typography>
          </button> */}
          <button onClick={() => navigate("/login")} className={styles.LandingAppBarButton}>
            <Typography variant="body1">Login</Typography>
          </button>
          <button onClick={() => navigate("/signup")} className={styles.LandingAppBarButton}>
            <Typography variant="body1">Get Started for Free</Typography>
          </button>
        </div>
      </div>
    </div>
  );
}

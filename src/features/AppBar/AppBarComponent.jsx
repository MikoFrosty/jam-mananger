import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import kamariLogo from "../../../public/kamari.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import fetchWrapper from "../../utils/fetchWrapper";
import MultipleSelect from "../MultiSelect";

import styles from "../../css/AppBar.module.css";

import MenuIcon from '@mui/icons-material/Menu';

const logoStyle = {
  width: "100%",
  maxWidth: "50px",
  maxHeight: "50px",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: "dodgerblue",
  backgroundColor: "white",
  boxShadow: "none",
  border: "2px solid dodgerblue",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    border: "2px solid dodgerblue",
  },
}));

export default function AppBarComponent({ token, handleChange, selectedData, onCreateJamClick }) {
  const [expandedUser, setExpandedUser] = useState({});

  // useEffect(() => {
  //   fetchWrapper("/user/true", token, "GET", {}).then((res) => {
  //     console.log(res.compiled_user);
  //     setExpandedUser(res.compiled_user);
  //   });
  // }, []);

  function handleClick() {
    navigate("/");
  }

  return (
    <AppBar className={styles.AppBar}>
      <Toolbar className={styles.ToolBar}>
        <div
          className={styles.Logo}
          onClick={handleClick}
        >
          <img className={styles.LogoImage} src={kamariLogo} alt="Kamari Logo" />
          <Typography variant="h5" color="#333" noWrap>
            Kamari
          </Typography>
        </div>
        <MenuIcon className={styles.MenuIcon}/>
        <div className={styles.ButtonGroupRow}>
          {/* <MultipleSelect
            label={"Projects"}
            selectedData={selectedData}
            handleChange={handleChange}
            jam_groups={expandedUser.user_groups}
          >
            {Object.keys(expandedUser).length > 0
              ? expandedUser.user_groups.map((group, index) => {
                  return (
                    <MenuItem key={index + 1} value={group.jam_group_id}>
                      <ListItemText size="small" sx={{fontSize:"16px", color: "#333", padding: "3px 0px"}} primary={group.title} />
                      <Checkbox
                      size="small"
                        checked={selectedData.includes(group.jam_group_id)}
                      />
                    </MenuItem>
                  );
                })
              : null}
          </MultipleSelect> */}
          {/* <ColorButton
            disableTouchRipple
            onClick={onCreateJamClick}
            variant="contained"
          >
            Create Task
          </ColorButton> */}
          <AccountCircleIcon
            style={{ color: "#333", height: "40px", width: "40px" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

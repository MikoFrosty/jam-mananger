import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import jamManagerLogo from "../../assets/jam-manager-logo-500.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import fetchWrapper from "../../utils/fetchWrapper";
import MultipleSelect from "../MultiSelect";

const logoStyle = {
  width: "100%",
  maxWidth: "50px",
  maxHeight: "50px",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#333",
  backgroundColor: "white",
  boxShadow: "none",
  border: "2px solid #F3EDCD",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "none",
    border: "2px solid #F3EDCD",
  },
}));

export default function AppBarComponent({ token, handleChange, selectedData, onCreateJamClick }) {
  const [expandedUser, setExpandedUser] = useState({});

  useEffect(() => {
    fetchWrapper("/user/true", token, "GET", {}).then((res) => {
      console.log(res.compiled_user);
      setExpandedUser(res.compiled_user);
    });
  }, []);

  return (
    <AppBar
      style={{ backgroundColor: "white", padding: "5px 0px" }}
      position="sticky"
    >
      <Toolbar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img style={logoStyle} src={jamManagerLogo} alt="Jam Manager Logo" />
          <Typography variant="h5" color="#333" noWrap>
            Jam Manager
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            height: "fit-content",
            columnGap: "10px",
          }}
        >
          <MultipleSelect
            label={"Groups"}
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
          </MultipleSelect>
          <ColorButton
            disableTouchRipple
            onClick={onCreateJamClick}
            variant="contained"
          >
            Create Jam
          </ColorButton>
          <AccountCircleIcon
            style={{ color: "#333", height: "40px", width: "40px" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

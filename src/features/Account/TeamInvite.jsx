import { useState } from "react";
import styles from "../../css/Folders/FolderCreate.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import fetchWrapper from "../../utils/fetchWrapper";
import { useDispatch } from "react-redux";
import HoverDropdown from "../../components/HoverDropdown";
import Typography from '@mui/material/Typography';

export default function TeamCreate({ toggleModal }) {
  const [selectedType, setSelectedType] = useState(null);
  const permissionOptions = ["Admin", "Standard"];
  const dispatch = useDispatch();

  function handlePermissionSelect(type) {
    setSelectedType(type);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      team_member_email: data.get("email"),
      type: selectedType,
    };

    fetchWrapper("/team-invitation", localStorage.getItem("token"), "POST", {
      ...payload,
    }).then((res) => {
      toggleModal();
    });
  };

  function handleClientSelect(value) {
    setSelectedClient(value);
  }

  return (
    <div className={styles.FolderCreation}>
      <Box className={styles.MainForm} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Teammate Email"
          name="email"
          autoFocus
        />
        <HoverDropdown
          customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
          dropdownContent={
            <>
              {permissionOptions.map((permission, index) => {
                return (
                  <div
                    key={`permission_${index}`}
                    onClick={() => handlePermissionSelect(permission)}
                    className={`${styles.HoverDropdownContentChildren} ${
                      permission.toLowerCase() ===
                      selectedType?.toLowerCase()
                        ? styles.Selected
                        : ""
                    }`}
                  >
                    <Typography variant="body1">{permission}</Typography>
                  </div>
                );
              })}
            </>
          }
          buttonContent={
            <Typography variant="body1">{selectedType ? selectedType : "Select Role"}</Typography>
          }
        />
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "5px",
          }}
        >
        </div> */}
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Invite
        </Button>
      </Box>
    </div>
  );
}

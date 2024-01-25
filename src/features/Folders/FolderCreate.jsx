import { useState } from "react";
import styles from "../../css/Folders/FolderCreate.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import fetchWrapper from "../../utils/fetchWrapper";
import DropdownSelect from "../../components/inputs/Dropdown";
import { useDispatch } from "react-redux";
import { toggleRefetch } from "../../StateManagement/Actions/actions";

export default function FolderCreate({ toggleModal }) {
  const [selectedClient, setSelectedClient] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      name: data.get("folderName"),
      description: data.get("folderDescription"),
      client: selectedClient,
      documents: [],
    };

    fetchWrapper("/folders", localStorage.getItem("token"), "POST", {
      ...payload,
    }).then((res) => {
      if (res.message === "Folder Created") {
        console.log(res);
        toggleModal();
        dispatch(toggleRefetch(true));
      }
    });
  };

  function handleClientSelect(value) {
    setSelectedClient(value);
  }

  return (
    <div className={styles.FolderCreation}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="folderName"
          label="Folder Name"
          name="folderName"
          autoFocus
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "5px",
          }}
        >
          {/* <DropdownSelect
            onChange={handleClientSelect}
            fullWidth={true}
            label={"Client"}
          /> */}
        </div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="folderDescription"
          label="Description"
          name="folderDescription"
          multiline
          maxRows={6}
          minRows={2}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Folder
        </Button>
      </Box>
    </div>
  );
}

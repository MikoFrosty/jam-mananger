// DocumentCreatorBar.jsx
import React, { useState, useEffect } from "react";
import styles from "../../css/DocumentCreator/DocumentCreatorBar.module.css";
import Typography from "@mui/material/Typography";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DropdownSelect from "../../components/inputs/Dropdown";
import { useDispatch } from "react-redux";
import { selectFolder } from "../../StateManagement/Actions/actions";

export default function DocumentCreatorBar() {
  const dispatch = useDispatch();
  const folders = JSON.parse(localStorage.getItem("folders") || "[]");
  const [selectedFolder, setSelectedFolder] = useState("");

  function handleFolderSelect(event) {
    setSelectedFolder(event.target.value);
  }

  return (
    <div className={styles.DocumentationBar}>
      <div className={styles.DocBarLeft}>
        <Typography className={styles.InlineFlex} variant="body1">
          Create Doc
        </Typography>
      </div>
      <div className={styles.DocBarRight}>
        <DropdownSelect
          valueList={folders}
          selectedValue={selectedFolder}
          fullWidth={true}
          label={"Folder"}
          onChange={handleFolderSelect}
          itemValueKey={"folder_id"}
        />
        <button className={styles.DocBarRightButton}>
          <Typography className={styles.InlineFlex} variant="body1">
            Save
          </Typography>
          <NoteAddIcon />
        </button>
      </div>
    </div>
  );
}

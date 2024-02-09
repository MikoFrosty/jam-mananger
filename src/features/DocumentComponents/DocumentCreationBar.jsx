// DocumentCreatorBar.jsx
import React, { useState, useEffect } from "react";
import styles from "../../css/DocumentCreator/DocumentCreatorBar.module.css";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

import HoverDropdown from "../../components/HoverDropdown";
import { useSelector } from "react-redux";
import { fetchClients } from "../../StateManagement/Actions/actions";

export default function DocumentCreatorBar({ onSave, handleClientSelect, handleFolderSelect, selectedClient, selectedFolder }) {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.app.folders)
  const clients = useSelector((state) => state.app.clients)

  useEffect(() => {
    dispatch(fetchClients())
  }, [])

  return (
    <div className={styles.DocumentationBar}>
      <div className={styles.DocBarLeft}>
        <HoverDropdown
          customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
          dropdownContent={
            <>
              {folders.map((folder, index) => {
                return (
                  <div
                    key={`folder_${index}`}
                    onClick={() => handleFolderSelect(folder)}
                    className={`${styles.HoverDropdownContentChildren} ${
                      folder.folder_id === selectedFolder.folder_id
                        ? styles.Selected
                        : ""
                    }`}
                  >
                    <Typography variant="body1">{folder.name}</Typography>
                    <Typography color={"#a1a1a1"} variant="caption">
                      {folder.documents?.length + " "}
                      Documents
                    </Typography>
                  </div>
                );
              })}
            </>
          }
          buttonContent={<Typography variant="body1">Folder</Typography>}
        />
        <HoverDropdown
          dropdownContent={
            <>
              {clients.map((client, index) => {
                return (
                  <div
                    key={`client_${index}`}
                    onClick={() => handleClientSelect(client)}
                    className={`${styles.HoverDropdownContentChildren} ${
                      client.client_id === selectedClient.client_id
                        ? styles.Selected
                        : ""
                    }`}
                  >
                    <Typography variant="body1">
                      {client.client_name}
                    </Typography>
                    <Typography color={"#a1a1a1"} variant="caption">
                      {client.client_poc?.client_user_email}
                    </Typography>
                  </div>
                );
              })}
            </>
          }
          buttonContent={<Typography variant="body1">Client</Typography>}
        />
      </div>
      {/* <div className={styles.DocBarRight}>
        <button onClick={onSave} className={styles.DocBarRightButton}>
          <Typography className={styles.InlineFlex} variant="body1">
            Save
          </Typography>
          <NoteAddIcon />
        </button>
      </div> */}
    </div>
  );
}

// DocumentCreatorBar.jsx
import React, { useState, useEffect } from "react";
import styles from "../../css/DocumentCreator/DocumentCreatorBar.module.css";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

import HoverDropdown from "../../components/HoverDropdown";
import { useSelector } from "react-redux";
import {
  fetchClients,
  fetchFolders,
} from "../../StateManagement/Actions/actions";

export default function DocumentCreatorBar({
  handleClientSelect,
  handleFolderSelect,
  selectedClient,
  selectedFolder,
  isPublic,
  handleVisibilitySelect,
}) {
  console.log(isPublic);
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.app.folders);
  const clients = useSelector((state) => state.app.clients);

  useEffect(() => {
    if (!clients) {
      dispatch(fetchClients());
    }
  }, [clients])

  return (
    <div className={styles.DocumentationBar}>
      <div className={styles.DocBarLeft}>
        {folders.length > 0 ? (
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
        ) : null}
        <HoverDropdown
          customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
          dropdownContent={
            <>
              <div
                key={`visibility_option_true`}
                onClick={() => handleVisibilitySelect(true)}
                className={`${styles.HoverDropdownContentChildren} ${
                  isPublic === true ? styles.Selected : ""
                }`}
              >
                <Typography variant="body1">Public</Typography>
                <Typography color={"#a1a1a1"} variant="caption">
                  Anyone with the link to this document can view it
                </Typography>
              </div>
              <div
                key={`visibility_option_false`}
                onClick={() => handleVisibilitySelect(false)}
                className={`${styles.HoverDropdownContentChildren} ${
                  isPublic === false ? styles.Selected : ""
                }`}
              >
                <Typography variant="body1">Private</Typography>
                <Typography color={"#a1a1a1"} variant="caption">
                  Only org members and clients can view this document
                </Typography>
              </div>
            </>
          }
          buttonContent={<Typography variant="body1">Visibility</Typography>}
        />
        {clients?.length > 0 ? (
          <HoverDropdown
            dropdownContent={
              <>
                {clients.map((client, index) => {
                  return (
                    <div
                      key={`client_${index}`}
                      onClick={() => handleClientSelect(client)}
                      className={`${styles.HoverDropdownContentChildren} ${
                        client.client_id === selectedClient?.client_id
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
        ) : null}
      </div>
    </div>
  );
}

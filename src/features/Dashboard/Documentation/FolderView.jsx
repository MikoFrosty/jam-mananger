import styles from "../../../css/Documentation/DocumentationFolders.module.css";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Typography from "@mui/material/Typography";
import DocumentView from "./DocumentView";
import { useState } from "react";
import SlidingModal from "../SlidingModal";
import FolderCreate from "../../Folders/FolderCreate";

export default function FolderView({ withoutFirstCards, data }) {
  const [createFolder, setCreateFolder] = useState(false);

  console.log(data)

  function toggleModal() {
    setCreateFolder(!createFolder);
    console.log(createFolder);
  }

  return (
    <div className={styles.FolderViewContainer}>
      {createFolder ? (
        <SlidingModal isOpen={createFolder} toggleModal={toggleModal}>
          {<FolderCreate toggleModal={toggleModal} />}
        </SlidingModal>
      ) : null}
      <Typography textAlign={"left"} variant="caption">
        Folders
      </Typography>
      <div className={styles.FolderView}>
        <div className={styles.FolderContainer}>
          {!withoutFirstCards ? (
            <div className={styles.FolderCard}>
              <CreateNewFolderIcon
                sx={{ width: "150px", height: "150px" }}
                className={styles.FolderIcon}
                onClick={toggleModal}
              />
              <Typography pb={"15px"} variant="body1">
                Create New Folder
              </Typography>
            </div>
          ) : null}
          {data?.folders?.map((folder, index) => {
            if (index < 10) {
              return (
                <div key={folder._id} className={styles.FolderCard}>
                  <Typography variant="body1">{folder.name}</Typography>
                </div>
              );
            }
          })}
        </div>
        <Typography mt={"10px"} variant="caption">
          Documents
        </Typography>
        <DocumentView data={data} withoutFirstCards={withoutFirstCards} />
      </div>
    </div>
  );
}

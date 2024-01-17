import styles from "../../../css/Documentation/DocumentView.module.css";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { toggleView } from "../../../StateManagement/Actions/actions";

export default function DocumentView({ withoutFirstCards, data }) {
  const dispatch = useDispatch();
  function handleViewToggle() {
    dispatch(toggleView("documentation-create"))
  }

  return (
    <div className={styles.DocumentView}>
      {!withoutFirstCards ? (
        <div className={styles.DocumentCard}>
          <NoteAddIcon
            sx={{ width: "150px", height: "150px" }}
            className={styles.DocumentIcon}
            onClick={() => handleViewToggle()}
          />
          <Typography pb={"15px"} variant="body1">
            Create New Document
          </Typography>
        </div>
      ) : null}
      {
        data?.documents?.map((document) => {
          return (
            <div className={styles.DocumentCard}>
              <Typography variant="body1">{document.title}</Typography>
            </div>
          )
        })
      }
    </div>
  );
}

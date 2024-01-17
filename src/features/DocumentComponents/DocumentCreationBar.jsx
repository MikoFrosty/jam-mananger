import styles from "../../css/DocumentCreator/DocumentCreatorBar.module.css";
import Typography from "@mui/material/Typography";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DropdownSelect from "../../components/inputs/Dropdown";

export default function DocumentCreatorBar({  }) {

  return (
    <div className={styles.DocumentationBar}>
      <div className={styles.DocBarLeft}>
        <Typography className={styles.InlineFlex} variant="body1">Create Doc</Typography>
      </div>
      <div className={styles.DocBarRight}>
        <DropdownSelect focused={true} label={"Folder"} fullWidth={true}/>
        <button className={styles.DocBarRightButton}>
          <Typography className={styles.InlineFlex} variant="body1">
            Save
          </Typography>
          <NoteAddIcon />
        </button>
      </div>
    </div>
  )
}
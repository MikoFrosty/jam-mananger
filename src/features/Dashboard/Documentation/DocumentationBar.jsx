import styles from "../../../css/Documentation/DocumentationBar.module.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterListIcon from '@mui/icons-material/FilterList';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SortIcon from '@mui/icons-material/Sort';
import Divider from "@mui/material/Divider";

export default function DocumentationBar({ view, onViewToggle, searchChild }) {
  return (
    <div className={styles.DocumentationBar}>
      <div className={styles.DocBarLeft}>
        <Typography variant="body1">Documentation</Typography>
      </div>
      <div className={styles.DocBarRight}>
        {
          searchChild
        }
        <button className={styles.DocBarRightButton}>
          <Typography className={styles.InlineFlex} variant="body1">
            Filters
          </Typography>
          <FilterListIcon />
        </button>
        <button className={styles.DocBarRightButton}>
          <Typography className={styles.InlineFlex} variant="body1">
            Create Doc
          </Typography>
          <NoteAddIcon />
        </button>
        <div className={styles.ViewToggler}>
          <button onClick={() => onViewToggle("table")} className={`${view === "table" ? styles.SelectedView : ''} ${styles.TogglerButton}`}>
            <Typography className={styles.InlineFlex} variant="body1">
              Table
            </Typography>
          </button>
          <button onClick={() => onViewToggle("card")} className={`${view === "card" ? styles.SelectedView : ''} ${styles.TogglerButton}`}>
            <Typography className={styles.InlineFlex} variant="body1">
              Card
            </Typography>
          </button>
        </div>
      </div>
    </div>
  )
}
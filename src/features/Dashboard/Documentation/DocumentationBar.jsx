import styles from "../../../css/Documentation/DocumentationBar.module.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SortIcon from "@mui/icons-material/Sort";
import Divider from "@mui/material/Divider";

export default function DocumentationBar({
  view,
  onViewToggle,
  searchChild,
  toggle,
  toggleOptions,
  label,
}) {
  return (
    <div className={styles.DocumentationBar}>
      <div className={styles.DocBarLeft}>
        <Typography variant="body1">{label}</Typography>
      </div>
      <div className={styles.DocBarRight}>
        {searchChild}
        <button className={styles.DocBarRightButton}>
          <Typography className={styles.InlineFlex} variant="body1">
            Filters
          </Typography>
          <FilterListIcon />
        </button>
        {toggle === true ? (
          <div className={styles.ViewToggler}>
            {toggleOptions.map((option, index) => {
              return (
                <button
                  key={`doc_bar_button_${index}`}
                  onClick={() => onViewToggle(option)}
                  className={`${view === option ? styles.SelectedView : ""} ${
                    styles.TogglerButton
                  }`}
                >
                  <Typography className={styles.InlineFlex} variant="body1">
                    {option}
                  </Typography>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

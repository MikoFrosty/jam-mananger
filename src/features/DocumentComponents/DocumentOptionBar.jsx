import styles from "../../css/DocumentCreator/DocumentOptionsBar.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";

export default function DocumentOptionBar() {

  return (
    <div className={styles.OptionBar}>
      <div className={styles.Left}>
        <VisibilityIcon sx={{ alignSelf: "end" }} />
        <Typography variant="caption">Public</Typography>
      </div>
      <div className={styles.Right}>
        
      </div>
    </div>
  );
}

import styles from "../../css/Account/AccountBar.module.css";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function AccountBar({
  view,
  onViewToggle,
  toggle,
  toggleOptions,
  label,
}) {
  return (
    <div className={styles.AccountBar}>
      <div className={styles.AccountBarLeft}>
        <Typography variant="body1">{label}</Typography>
      </div>
      <div className={styles.AccountBarRight}>
        {toggle === true ? (
          <div className={styles.ViewToggler}>
            {toggleOptions.map((option) => {
              return (
                <button
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

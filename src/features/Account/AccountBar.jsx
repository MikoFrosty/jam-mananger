import styles from "../../css/Account/AccountBar.module.css";
import Typography from "@mui/material/Typography";

export default function AccountBar({
  view,
  onViewToggle,
  toggle,
  toggleOptions,
  label,
  children
}) {
  return (
    <div className={styles.AccountBar}>
      <div className={styles.AccountBarLeft}>
        <Typography variant="body1">{label}</Typography>
        {
          children
        }
      </div>
      <div className={styles.AccountBarRight}>
        {toggle === true ? (
          <div className={styles.ViewToggler}>
            {toggleOptions.map((option, index) => {
              return (
                <button
                  key={`option_${index}`}
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

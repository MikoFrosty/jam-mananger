import styles from "../../css/Cards/Plackard.module.css";
import Typography from '@mui/material/Typography';
import LogoutIcon from "@mui/icons-material/Logout";

export default function Plackard({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <div className={styles.Plackard}>
      <div className={styles.PlackardImage}>
        {
          <Typography variant="h5">
            {
              user?.name?.first[0].toUpperCase() || user?.email[0].toUpperCase()
            }
          </Typography>
        }
      </div>
      <div className={styles.PlackardInfo}>
        <Typography className={styles.InlineFlex} variant="body2">Daniel Carmichael</Typography>
        <Typography variant="caption">{user.type}</Typography>
      </div>
      <LogoutIcon className={styles.LogoutIcon} onClick={handleLogout}/>
    </div>
  )
}
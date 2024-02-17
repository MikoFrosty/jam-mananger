import styles from "../../css/Cards/Plackard.module.css";
import Typography from '@mui/material/Typography';
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";

export default function Plackard({ onLogout }) {
  const user = useSelector((state) => state.app.user);

  function handleLogout() {
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
        <Typography className={styles.InlineFlex} variant="body2">{`${user?.name?.first} ${user?.name?.last}`}</Typography>
        <Typography variant="caption">{user?.type}</Typography>
      </div>
      <LogoutIcon className={styles.LogoutIcon} onClick={handleLogout}/>
    </div>
  )
}
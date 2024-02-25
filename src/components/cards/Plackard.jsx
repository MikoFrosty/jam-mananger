import styles from "../../css/Cards/Plackard.module.css";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";

export default function Plackard({ type, onLogout }) {
  const user = useSelector((state) => state.app.user);
  const clientUser = useSelector((state) => state.app.client_user);

  console.log(type)
  console.log(clientUser)

  function handleLogout() {
    onLogout();
  }

  return (
    <div className={styles.Plackard}>
      <div className={styles.PlackardImage}>
        {
          <Typography variant="h5">
            {type === "user"
              ? user?.name?.first[0].toUpperCase() ||
                user?.email[0].toUpperCase()
              : clientUser?.client_user_name?.first[0] || "?"}
          </Typography>
        }
      </div>
      <div className={styles.PlackardInfo}>
        <Typography
          className={styles.InlineFlex}
          variant="body2"
        >{`${type === "user" ? user?.name?.first : clientUser?.client_user_name?.first} ${type === "user" ? user?.name?.last : clientUser?.client_user_name?.last}`}</Typography>
        <Typography variant="caption">{user?.type}</Typography>
      </div>
      <LogoutIcon className={styles.LogoutIcon} onClick={handleLogout} />
    </div>
  );
}

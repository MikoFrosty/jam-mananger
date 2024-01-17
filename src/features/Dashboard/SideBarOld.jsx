import { useSelector } from "react-redux";
import styles from "../../css/SideBar.module.css";
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { toggleView } from "../../StateManagement/Actions/actions";

export default function SideBar() {
  const dispatch = useDispatch();

  const viewMode = useSelector((state) => state.viewMode);

  function selectView(view) {
    dispatch(toggleView(view))
  }

  return (
    <div className={styles.SideBar}>
      <button onClick={() => selectView("dashboard")} className={styles.SideBarOption}>
        <Typography variant="body1">Dashboard</Typography>
      </button>
      <button onClick={() => selectView("documentation")} className={styles.SideBarOption}>
        <Typography variant="body1">Documentation</Typography>
      </button>
      <button onClick={() => selectView("integrations")} className={styles.SideBarOption}>
        <Typography variant="body1">Integrations</Typography>
      </button>
      <button onClick={() => selectView("settings")} className={styles.SideBarOption}>
        <Typography variant="body1">Settings</Typography>
      </button>
    </div>
  )
}
import styles from "../../css/Account/ProfileDetails.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function ProfileDetails() {
  const user = useSelector((state) => state.app.user);
  const organization = useSelector((state) => state.app.organization);
  const isAdmin = organization?.admins?.some((admin) => admin.email === user?.email);
  const isBillableUser = organization?.billable_user.email === user?.email;

  console.log(user)

  const taggedData = {
    admin: {
      backgroundColor: "rgba(46, 196, 182, 0.3)",
      padding: "5px",
      borderRadius: "5px",
    },
    standard: {
      backgroundColor: "rgba(255, 201, 20, 0.3)",
      padding: "5px",
      borderRadius: "5px",
    },
    tag: {
      backgroundColor: "#5fa9fda1",
      padding: "5px",
      borderRadius: "5px"
    },
    alert: {
      backgroundColor: "rgba(245, 81, 31, 0.3)",
      padding: "5px",
      borderRadius: "5px"
    }
  };

  return (
    <div className={styles.ProfileDetails}>
      <div className={styles.ProfileImage}>
        {user?.profile_image_url ? (
          <img
            className={styles.Image}
            src={user.profile_image_url}
            alt="User Profile Photo"
          />
        ) : (
          <AccountCircleIcon className={styles.Image} />
        )}
      </div>
      <div className={styles.ProfileInfo}>
        <Typography variant="h5">{`${user?.name?.first} ${user?.name?.last}`}</Typography>
        <div className={styles.TaggedInfo}>
          <Typography
            sx={{ ...taggedData.tag }}
            variant="body2"
          >{`${user?.tasks?.length} Tasks`}</Typography>
          {isAdmin ? (
            <Typography sx={{ ...taggedData.admin }} variant="body2">
              Admin
            </Typography>
          ) : (
            <Typography sx={{ ...taggedData.standard }} variant="body2">
              Standard
            </Typography>
          )}
          {isBillableUser ? (
            <Typography sx={{ ...taggedData.alert }} variant="body2">
              Billable User
            </Typography>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}

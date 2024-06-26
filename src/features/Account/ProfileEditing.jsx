import { useState } from "react";
import styles from "../../css/Account/ProfileEditing.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { updateUser } from "../../StateManagement/Actions/actions";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import fetchWrapper from '../../utils/fetchWrapper';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Typography from "@mui/material/Typography";

export default function ProfileEditing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [editMode, setEditMode] = useState(true);
  const [email, setEmail] = useState(user?.email || "");
  const [firstName, setFirstName] = useState(user?.name?.first || "");
  const [lastName, setLastName] = useState(user?.name?.last || "");
  const [profileUrl, setProfileUrl] = useState(user?.profile_image_url || "");
  const [hourlyRate, setHourlyRate] = useState(user?.hourly_rate || 0);
  console.log(user);
  const [editModeStyles, setEditModeStyles] = useState({
    backgroundColor: "#ae5ffda1",
    borderRadius: "25%",
    padding: "5px",
  });

  function notify(message) {
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handleFirstNameChange(value) {
    setFirstName(value);
  }

  function handleLastNameChange(value) {
    setLastName(value);
  }

  function handleProfileUrlChange(value) {
    setProfileUrl(value);
  }

  function handleHourlyRateChange(value) {
    setHourlyRate(value);
  }

  function handleEditSubmit() {
    const payload = {
      user_id: user.user_id,
      name: {
        first: firstName,
        last: lastName,
      },
      profile_image_url: profileUrl,
      hourly_rate: hourlyRate
    };

    dispatch(updateUser(payload));
    setEditMode(true);
  }

  function handleEditModeToggle() {
    setEditMode(!editMode);
  }

  function triggerPasswordReset() {
    if (user) {
      fetchWrapper("/reset-password-link", "", "POST", { email: user.email }).then((res) => {
        if (res.message === "Password Reset Link Sent") {
          notify("Password reset link sent");
        } else {
          notify("There was an issue sending a password reset link")
        }
      });
    }
  }

  return (
    <div className={styles.ProfileEditor}>
      <div style={{ display: "flex", flexDirection: "row", width: "fit-content", height: "fit-content", alignSelf: "end", alignItems: "center", columnGap: "10px"}}>
        <Typography variant="body2">Edit Profile Info</Typography>
        <ModeEditIcon
          sx={{ alignSelf: "end", ...editModeStyles }}
          className={styles.Icon}
          onClick={handleEditModeToggle}
        />
      </div>
      <div className={styles.ProfileInput}>
        <label className={styles.ProfileLabel} htmlFor="ProfileEmail">
          Email
        </label>
        <input
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={true}
          defaultValue={email}
          id="ProfileEmail"
          className={styles.ProfileTitleInput}
          type="email"
        />
      </div>
      <div className={styles.ProfileInput}>
        <label className={styles.ProfileLabel} htmlFor="ProfileImageUrl">
          Profile Image URL
        </label>
        <input
          onChange={(e) => handleProfileUrlChange(e.target.value)}
          disabled={editMode}
          defaultValue={profileUrl}
          id="ProfileImageUrl"
          className={styles.ProfileTitleInput}
          type="url"
        />
      </div>
      <div className={styles.InputRow}>
        <div className={styles.ProfileInput}>
          <label className={styles.ProfileLabel} htmlFor="FirstName">
            First Name
          </label>
          <input
            onChange={(e) => handleFirstNameChange(e.target.value)}
            disabled={editMode}
            defaultValue={firstName}
            id="FirstName"
            className={styles.ProfileTitleInput}
            type="text"
          />
        </div>
        <div className={styles.ProfileInput}>
          <label className={styles.ProfileLabel} htmlFor="LastName">
            Last Name
          </label>
          <input
            onChange={(e) => handleLastNameChange(e.target.value)}
            disabled={editMode}
            defaultValue={lastName}
            id="LastName"
            className={styles.ProfileTitleInput}
            type="text"
          />
        </div>
        <div className={styles.ProfileInput}>
          <label className={styles.ProfileLabel} htmlFor="HourlyRate">
            Hourly Rate
          </label>
          <input
            onChange={(e) => handleHourlyRateChange(e.target.value)}
            name="hourlyRate"
            disabled={editMode}
            id="Hourlyrate"
            defaultValue={hourlyRate}
            min={0}
            className={styles.ProfileTitleInput}
            type="number"
          />
        </div>
      </div>
      {!editMode ? (
        <button className={styles.Button} onClick={handleEditSubmit}>
          Submit Changes
        </button>
      ) : null}
      <button
        disabled={editMode}
        onClick={triggerPasswordReset}
        className={styles.ResetPasswordButton}
      >
        Reset Password
      </button>
      <ToastContainer className={styles.ToastContainerStyle} />
    </div>
  );
}

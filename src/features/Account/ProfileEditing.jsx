import { useState } from "react";
import styles from "../../css/Account/ProfileEditing.module.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function ProfileEditing() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [editMode, setEditMode] = useState(true);
  const [email, setEmail] = useState(user?.email || "")
  const [firstName, setFirstName] = useState(user?.name?.first || "")
  const [lastName, setLastName] = useState(user?.name?.last || "")
  const [editModeStyles, setEditModeStyles] = useState({
    backgroundColor: "#5fa9fda1",
    borderRadius: '25%',
    padding: "5px"
  })

  function handleEmailChange(value) {
    setEmail(value)
  }

  function handleFirstNameChange(value) {
    setFirstName(value)
  }

  function handleLastNameChange(value) {
    setLastName(value)
  }

  function handleEditSubmit() {
    const payload = {
      user_id: user.user_id,
      email,
      name: {
        first: firstName,
        last: lastName
      }
    }

    console.log(payload)
    setEditMode(true)
  }

  function handleEditModeToggle() {
    setEditMode(!editMode)
  }

  function triggerPasswordReset() {
    console.log("Password reset triggered")
  }

  return (

    <div className={styles.ProfileEditor}>
      <ModeEditIcon sx={{alignSelf: "end", ...editModeStyles}} className={styles.Icon} onClick={handleEditModeToggle} />
      <div className={styles.ProfileInput}>
        <label className={styles.ProfileLabel} htmlFor="ProfileEmail">Email</label>
        <input onChange={(e) => handleEmailChange(e.target.value)} disabled={editMode} defaultValue={email} id="ProfileEmail" className={styles.ProfileTitleInput} type="email" />
      </div>
      <div className={styles.InputRow}>
        <div className={styles.ProfileInput}>
          <label className={styles.ProfileLabel} htmlFor="FirstName">First Name</label>
          <input onChange={(e) => handleFirstNameChange(e.target.value)} disabled={editMode} defaultValue={firstName} id="FirstName" className={styles.ProfileTitleInput} type="text" />
        </div>
        <div className={styles.ProfileInput}>
          <label className={styles.ProfileLabel} htmlFor="LastName">Last Name</label>
          <input onChange={(e) => handleLastNameChange(e.target.value)} disabled={editMode} defaultValue={lastName} id="LastName" className={styles.ProfileTitleInput} type="text" />
        </div>
      </div>
      {
        !editMode ? (<button className={styles.Button} onClick={handleEditSubmit}>Submit Changes</button>) : (null)
      }
      <button onClick={triggerPasswordReset} className={styles.ResetPasswordButton}>Reset Password</button>
    </div>
  )
}
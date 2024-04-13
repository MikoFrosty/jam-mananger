import styles from "../../css/Signup/StepTwo.module.css";
import { Typography } from "@mui/material";
import { useState } from 'react';

export default function StepTwo({ type, handleInputChange }) {
  return (
    <div className={styles.StepTwo}>
      <Typography variant="h2">Kamari for {type}s</Typography>
      <div className={styles.Information}>
        {type === "Freelancer" ? (
          <>
            <div className={styles.InformationRow}>
              <div className={styles.SprintInput}>
                <label className={styles.SprintInputLabel} htmlFor="FirstName">
                  First Name
                </label>
                <input
                  id="FirstName"
                  className={styles.SprintTitleInput}
                  type="text"
                  autoFocus={true}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                />
              </div>
              <div className={styles.SprintInput}>
                <label className={styles.SprintInputLabel} htmlFor="LastName">
                  Last Name
                </label>
                <input
                  id="LastName"
                  className={styles.SprintTitleInput}
                  type="text"
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.SprintInput}>
              <label className={styles.SprintInputLabel} htmlFor="LastName">
                Email
              </label>
              <input
                id="LastName"
                className={styles.SprintTitleInput}
                type="email"
                autoComplete="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className={styles.InformationRow}>
              <div className={styles.SprintInput}>
                <label
                  className={styles.SprintInputLabel}
                  htmlFor="PasswordOne"
                >
                  Password
                </label>
                <input
                  id="PasswordOne"
                  className={styles.SprintTitleInput}
                  type="password"
                  autoComplete="password"
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
              </div>
              <div className={styles.SprintInput}>
                <label
                  className={styles.SprintInputLabel}
                  htmlFor="PasswordTwo"
                >
                  Repeat Password
                </label>
                <input
                  id="PasswordTwo"
                  className={styles.SprintTitleInput}
                  type="password"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.InformationRow}>
              <div className={styles.SprintInput}>
                <label className={styles.SprintInputLabel} htmlFor="CompanyName">
                  Company or Brand Name
                </label>
                <input
                  id="CompanyName"
                  className={styles.SprintTitleInput}
                  type="text"
                  autoFocus={true}
                  onChange={(e) => handleInputChange("company_namee", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.SprintInput}>
              <label className={styles.SprintInputLabel} htmlFor="LastName">
                Email
              </label>
              <input
                id="LastName"
                className={styles.SprintTitleInput}
                type="email"
                autoComplete="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className={styles.InformationRow}>
              <div className={styles.SprintInput}>
                <label
                  className={styles.SprintInputLabel}
                  htmlFor="PasswordOne"
                >
                  Password
                </label>
                <input
                  id="PasswordOne"
                  className={styles.SprintTitleInput}
                  type="password"
                  autoComplete="password"
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
              </div>
              <div className={styles.SprintInput}>
                <label
                  className={styles.SprintInputLabel}
                  htmlFor="PasswordTwo"
                >
                  Repeat Password
                </label>
                <input
                  id="PasswordTwo"
                  className={styles.SprintTitleInput}
                  type="password"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

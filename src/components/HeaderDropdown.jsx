import React from "react";
import styles from "../css/HeaderDropdown.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";

export default function HeaderDropdown({
  buttonContent,
  dropdownContent,
  onToggleSidebar,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={styles.Dropdown}>
      <button className={styles.DropdownButton}>
        <div className={styles.DropdownButtonLeft}>
          {buttonContent}
          <KeyboardArrowDownIcon
            fontSize={"small"}
            className={styles.IconDown}
          />
          <KeyboardArrowUpIcon fontSize={"small"} className={styles.IconUp} />
        </div>
      </button>
      <div className={styles.DropdownContent}>
        <div className={styles.DropdownItem}>
          <Typography variant="caption">{user?.email}</Typography>
        </div>
        {dropdownContent}
      </div>
    </div>
  );
}

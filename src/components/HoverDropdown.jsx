import React from 'react';
import styles from "../css/HoverDropdown.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function HoverDropdown({ buttonContent, dropdownContent }) {
  return (
    <div className={styles.Dropdown}>
      <button className={styles.DropdownButton}>
        {
          buttonContent
        }
        <KeyboardArrowDownIcon fontSize={"small"} className={styles.IconDown}/>
        <KeyboardArrowUpIcon fontSize={"small"} className={styles.IconUp}/>
      </button>
      <div className={styles.DropdownContent}>
        {
          dropdownContent
        }
      </div>
    </div>
  );
}

export default HoverDropdown;

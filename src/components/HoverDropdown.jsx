import React, { useState } from 'react';
import styles from "../css/HoverDropdown.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HoverDropdown({ buttonContent, dropdownContent, customStyles = {}, customButtonStyles = {} }) {
  const [isHovered, setIsHovered] = useState(false);

  // Adjust the style dynamically based on hover state
  const dynamicStyle = isHovered ? { zIndex: 1000 } : {};

  return (
    <div 
      className={styles.Dropdown} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{...dynamicStyle, ...customButtonStyles}} // Apply the dynamic style here
    >
      <button style={customButtonStyles} className={styles.DropdownButton}>
        {buttonContent || <Skeleton />}
        <KeyboardArrowDownIcon fontSize={"small"} className={styles.IconDown}/>
        <KeyboardArrowUpIcon fontSize={"small"} className={styles.IconUp}/>
      </button>
      <div style={{...customStyles, ...dynamicStyle}} className={styles.DropdownContent}>
        {dropdownContent || <Skeleton />}
      </div>
    </div>
  );
}

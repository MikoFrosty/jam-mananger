import React from 'react';

import styles from "../../css/Buttons/FixedButton.module.css";

function FixedButton({ label, handleClick, verticalOffset = "10px" }) {
  console.log("fixed button")
  return (
    <button style={{bottom: verticalOffset}} className={styles.Button} onClick={handleClick}>
      {label}
    </button>
  );
}

export default FixedButton;

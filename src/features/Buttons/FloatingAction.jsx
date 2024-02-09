import React from 'react';

import styles from "../../css/Buttons/FixedButton.module.css";

function FixedButton({ label, handleClick }) {
  console.log("fixed button")
  return (
    <button className={styles.Button} onClick={handleClick}>
      {label}
    </button>
  );
}

export default FixedButton;

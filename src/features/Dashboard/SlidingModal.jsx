import React, { useState } from "react";
import styles from "../../css/SlidingModal.module.css";
import Button from "@mui/material/Button";

function SlidingModal({ isOpen, toggleModal, children }) {
  const handleModalContentClick = (e) => {
    e.stopPropagation(); // Stop click event from reaching the backdrop
  };

  return (
    <div>
      <div
        id="modalBackdrop"
        onClick={ toggleModal }
        className={
          isOpen ? `${styles.modal} ${styles.modalOpen}` : styles.modal
        }
      >
        <div className={styles.modalContent} onClick={handleModalContentClick}>
          <Button
            id="closeModalButton"
            onClick={toggleModal}
            className={styles.Button}
          >
            Cancel
          </Button>
          {
            children
          }
        </div>
      </div>
    </div>
  );
}

export default SlidingModal;

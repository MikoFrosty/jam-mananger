import React, { useEffect, useState } from "react";
import styles from "../../css/SearchBar/TableSearch.module.css";

export default function TableSearch({ label, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }

  return (
    <form className={styles.FormContainer} onSubmit={handleSubmit}>
      <input
        className={styles.FormInput}
        type="text"
        placeholder={label}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}

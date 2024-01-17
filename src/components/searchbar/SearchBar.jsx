import React, { useState } from 'react';

import styles from "../../css/SearchBar/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.FormContainer} onSubmit={handleSubmit}>
      <input
        className={styles.FormInput}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={styles.FormButton} type="submit">Search</button>
    </form>
  );
}

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from "../../css/Inputs/HoverDateTimePicker.module.css";
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomHoverDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false); // Initialize as false to hide the picker initially

  // Convert the Date object to a Unix timestamp
  const getUnixTimestamp = (date) => {
    return date.getTime();
  };

  // Format the date into "mm/dd/yyyy" format
  const formatDate = (date) => {
    // Using toLocaleDateString for simplicity
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  console.log("Selected date (Unix Timestamp):", getUnixTimestamp(startDate));
  console.log("Formatted start date:", formatDate(startDate));

  return (
    <div 
      className={styles.DatePicker} 
      onMouseEnter={() => setPickerVisible(true)} 
      onMouseLeave={() => setPickerVisible(false)}
    >
      {isPickerVisible ? (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline // This makes the DatePicker always visible when it's rendered
        />
      ) : (
        // Display formatted date when the picker is not visible
        formatDate(startDate)
      )}
    </div>
  );
}

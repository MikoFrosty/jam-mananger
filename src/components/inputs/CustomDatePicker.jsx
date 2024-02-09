import React from "react";
import styles from "../../css/Inputs/CustomDatePicker.module.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';

// Include minDate in the component's props
export default function CustomDatePicker({
  currentMonth,
  currentYear,
  selectedDate,
  handleDateSelect,
  goToPrevMonth,
  goToNextMonth,
  minDate // New prop for minimum selectable date
}) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={styles.datePicker}>
      <div className={styles.controls}>
        <ChevronLeftIcon className={styles.Icon} onClick={goToPrevMonth} />
        <span className={styles.monthDisplay}>
          {currentMonth + 1} / {currentYear}
        </span>
        <ChevronRightIcon className={styles.Icon} onClick={goToNextMonth} />
      </div>
      <div className={styles.weekdays}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            <Typography variant="caption">{day}</Typography>
          </div>
        ))}
      </div>
      <div className={styles.daysGrid}>
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className={styles.emptyDay}></div>
        ))}
        {daysArray.map((day) => {
          const dayDate = new Date(currentYear, currentMonth, day);
          const isDisabled = minDate && dayDate < minDate; // Disable dates before minDate
          return (
            <div
              key={day}
              className={`${styles.day} ${isDisabled ? styles.disabledDay : ''} ${selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth ? styles.selectedDay : ''}`}
              onClick={() => !isDisabled && handleDateSelect(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

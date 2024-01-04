function getDays(number_of_dates) {
  const currentDate = new Date();
  const days = [];

  for (let i = 0; i < number_of_dates; i++) {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + i);
    days.push(nextDay.toDateString());
  }

  return {days, today: days[0]};
}

export default getDays;
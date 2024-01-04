import React, { useEffect, useState } from "react";
import getDays from "../utils/dates/buildDates";
import "../index.css";

const styles = {
  forecast: {
    display: "flex",
    flex: "10",
    flexDirection: "column",
    minWidth: "100%",
    minHeight: "400px",
    backgroundColor: "white",
    rowGap: "10px",
  },
  days: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: "10px",
    width: "100%",
    height: "50px",
    backgroundColor: "white",
    padding: "0px 20px",
  },
  day: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    border: "2px solid transparent",
    borderRadius: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    height: "fit-content",
    width: "20px",
  },
  day_info: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px"
  },
};

function JamForecast({ jams }) {
  const forecastObj = getDays(7);
  const forecastDays = forecastObj.days;
  const today = forecastObj.today;
  const [selectedDay, setSelectedDay] = useState(today);

  useEffect(() => {
    console.log(jams)
  }, [selectedDay])

  return (
    <div id="forecast" style={styles.forecast}>
      <div id="days-row" style={styles.days}>
        {forecastDays.map((day, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelectedDay(day)} // Wrap in an arrow function
              className={`${
                selectedDay === day ? "forecast-day highlight" : "forecast-day"
              }`}
              id={`day-${index + 1}`}
            >
              <p className="day-text">{day.split(" ")[2]}</p>
            </div>
          );
        })}
      </div>
      <div id="forecast-info" style={styles.day_info}></div>
    </div>
  );
}

export default JamForecast;

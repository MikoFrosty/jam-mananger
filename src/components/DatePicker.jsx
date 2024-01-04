import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import convert from "../utils/dates/convertDates";
import dayjs from "dayjs";

export default function BasicDatePicker({ onChange, time }) {
  // Convert the Unix timestamp to a JavaScript Date object
  const selectedDate = new Date(convert.unixToDate(time));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DateTimePicker
        format="MM/DD/YY @ hh:mm"
          label="Jam Start Time"
          sx={{ width: "100%" }}
          value={selectedDate}
          onChange={(newValue) => onChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

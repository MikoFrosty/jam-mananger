import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function JamCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar defaultValue={dayjs("2022-04-17")} readOnly />
    </LocalizationProvider>
  );
}

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface DatePickerInputProps {
  label: string;
  value: string;
  onChange: (e: string) => void;
}

export default function DatePickerInput(props: DatePickerInputProps) {
  const { label, onChange, value } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        value={value}
        minDate={dayjs("2017-01-01")}
        onChange={(newValue) => onChange(dayjs(newValue).format("YYYY-MM-DD"))}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

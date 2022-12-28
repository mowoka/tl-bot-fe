import { MenuItem, TextField } from "@mui/material";
import React, { RefObject } from "react";
interface InputDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  ref: RefObject<HTMLDivElement | undefined>;
  options: { key: string; value: string }[];
}

const InputDropdown = (props: InputDropdownProps) => {
  const { placeholder, label, value, options, ref } = props;
  return (
    <>
      <TextField
        className="w-full h-[50px]"
        id="outlined-select-currency"
        select
        label={label}
        defaultValue={value}
        placeholder={placeholder}
        inputRef={ref}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.key}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default InputDropdown;

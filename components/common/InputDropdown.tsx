import { MenuItem, TextField } from "@mui/material";
import React, { RefObject } from "react";
interface InputDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: { key: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDropdown = (props: InputDropdownProps) => {
  const { placeholder, label, options, onChange, value } = props;
  return (
    <>
      <TextField
        className="w-full h-[50px]"
        select
        label={label}
        size="medium"
        defaultValue={"choose"}
        value={value ? value : "choose"}
        placeholder={placeholder}
        onChange={onChange}
      >
        <MenuItem disabled value="choose">
          Choose {label}
        </MenuItem>
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

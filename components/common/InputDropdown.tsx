import { MenuItem, TextField } from "@mui/material";
import React from "react";
interface InputDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: { id: number; name: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDropdown = (props: InputDropdownProps) => {
  const { placeholder, label, options, onChange, value } = props;
  return (
    <>
      <TextField
        className="w-full h-[56px]"
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
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default InputDropdown;

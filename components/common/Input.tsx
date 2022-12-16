import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
}

const Input = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {props.type == "password" ? (
        <FormControl className="w-full" variant="outlined">
          <InputLabel htmlFor={`outlined-adornment-password-${props.label}`}>
            {props.label}
          </InputLabel>
          <OutlinedInput
            id={`outlined-adornment-password-${props.label}`}
            type={showPassword ? "text" : "password"}
            value={props.value}
            onChange={props.onChange}
            inputProps={{ maxLength: props.maxLength }}
            error={props.error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(true)}
                  onMouseDown={() => setShowPassword(false)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={props.label}
          />
        </FormControl>
      ) : (
        <TextField
          error={props.error}
          label={props.label}
          placeholder={props.placeholder}
          onChange={props.onChange}
          type="text"
          value={props.value}
          className="w-full"
          disabled={props.disabled}
          inputProps={{ maxLength: props.maxLength }}
        />
      )}
    </>
  );
};

export default Input;

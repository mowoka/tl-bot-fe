import { TextareaAutosize } from "@mui/material";
import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = (props: TextAreaProps) => {
  const { value, onChange } = props;
  return (
    <TextareaAutosize
      minRows={5}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder="Masukan keterangan"
      className="w-full bg-secondary rounded-lg p-2"
    />
  );
};

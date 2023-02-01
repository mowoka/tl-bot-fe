import Link from "next/link";
import React from "react";
import Input from "../common/Input";
import { CButton } from "../common/CButton";

interface ValidateFormProps {
  nik: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
  onValidateNik: () => void;
}

export const ValidateForm = (props: ValidateFormProps) => {
  const { nik, onChange, onValidateNik } = props;
  return (
    <div className="pt-10 w-full">
      <Input
        type="text"
        label="NIK"
        value={nik}
        placeholder="Input NIK"
        onChange={(e) => onChange(e, "nik")}
        error={nik.length > 0 && nik.length < 16 ? true : false}
        maxLength={16}
      />
      <div className="pt-12">
        <CButton text="Validate NIK" onClick={onValidateNik} />
      </div>
      <p className="py-4 text-center">
        already have account ?{" "}
        <Link href={"/accounts/login"} legacyBehavior>
          <a className="underline">here</a>
        </Link>
      </p>
    </div>
  );
};

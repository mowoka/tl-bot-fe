import Link from "next/link";
import Input from "../common/Input";
import { CButton } from "../common/CButton";

interface FormPanelProps {
  nik: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
  onSubmit: () => void;
}

const FormPanel = (props: FormPanelProps) => {
  const { nik, password, onChange, onSubmit } = props;
  return (
    <div className="w-[50%] h-full bg-secondary rounded-l-lg flex flex-col justify-center items-center px-16 py-8">
      <h1 className="text-2xl uppercase font-bold">Login</h1>
      <div className="w-full py-8">
        <div className="py-4">
          <Input
            type="text"
            label="NIK"
            value={nik}
            placeholder="Input NIK"
            onChange={(e) => onChange(e, "nik")}
            error={nik.length > 1 && nik.length < 16}
            maxLength={16}
          />
        </div>
        <div className="py-4">
          <Input
            type="password"
            label="Password"
            value={password}
            placeholder="Input Email address"
            onChange={(e) => onChange(e, "password")}
            error={password.length > 1 && password.length < 6}
            maxLength={10}
          />
        </div>
        <div className="py-4">
          <CButton text="Login" onClick={onSubmit} />
        </div>
        <p className="py-2 text-center">
          still have no account ?{" "}
          <Link href={"/accounts/register"} legacyBehavior>
            <a className="underline">here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormPanel;

import Link from "next/link";
import useLogin from "../../hooks/Login/useLogin";
import CButton from "../commons/CButton";
import Input from "../commons/Input";

const FormPanel = () => {
  const { email, password, onChange, onSubmit } = useLogin();
  return (
    <div className="w-[50%] h-full bg-secondary rounded-l-lg flex flex-col justify-center items-center px-16 py-8">
      <h1 className="text-2xl uppercase font-bold">Login</h1>
      <div className="w-full py-8">
        <div className="py-4">
          <Input
            type="text"
            label="Email"
            value={email}
            placeholder="Input Email address"
            onChange={(e) => onChange(e, "email")}
          />
        </div>
        <div className="py-4">
          <Input
            type="password"
            label="Password"
            value={password}
            placeholder="Input Email address"
            onChange={(e) => onChange(e, "password")}
          />
        </div>
        <div className="py-4">
          <CButton text="Login" onClick={onSubmit} />
        </div>
        <p className="py-2 text-center">
          still have no account ?{" "}
          <Link href={"/"} legacyBehavior>
            <a className="underline">here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormPanel;

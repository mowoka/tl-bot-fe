import { RegisterRootProps } from "../../hooks/registers/useRegister";
import { CButton } from "../common/CButton";

import Input from "../common/Input";

interface CollectionFormProps {
  registerRoot: RegisterRootProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
  onSubmit: () => void;
}

export const CollectionForm = (props: CollectionFormProps) => {
  const { registerRoot, onChange, onSubmit } = props;
  return (
    <div className="w-full max-w-[800px] bg-secondary min-h-[500px] rounded-lg shadow-2xl  py-6 px-8">
      <h3 className="font-semibold text-center text-black py-6 ">
        Complete this form to create your profile
      </h3>
      <div className="flex flex-row flex-wrap justify-between items-start">
        <div className="w-[50%] px-4 py-4">
          <Input
            type="text"
            label="Nama"
            value={registerRoot.name}
            placeholder="Input NIK"
            onChange={(e) => onChange(e, "name")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="text"
            label="ID Telegram"
            value={registerRoot.idTelegram}
            placeholder="Input ID Telegram"
            onChange={(e) => onChange(e, "idTelegram")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="text"
            label="Partner"
            value={registerRoot.partner}
            placeholder="Input Partner"
            onChange={(e) => onChange(e, "partner")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="text"
            label="Sector"
            value={registerRoot.sector}
            placeholder="Input Sector"
            onChange={(e) => onChange(e, "sector")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="text"
            label="witel"
            value={registerRoot.witel}
            placeholder="Input Witel"
            onChange={(e) => onChange(e, "witel")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="text"
            label="Regional"
            value={registerRoot.regional}
            placeholder="Input Regional"
            onChange={(e) => onChange(e, "regional")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="password"
            label="Password"
            value={registerRoot.password}
            placeholder="Input Password"
            onChange={(e) => onChange(e, "password")}
          />
        </div>
        <div className="w-[50%] px-4 py-4">
          <Input
            type="password"
            label="Confirm Password"
            value={registerRoot.confirmPassword}
            placeholder="Input Confirm Password"
            onChange={(e) => onChange(e, "confirm_password")}
          />
        </div>
      </div>
      <div className="pt-6 px-4">
        <CButton text="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};

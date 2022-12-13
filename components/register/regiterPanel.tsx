import { RegisterTitle } from "./regiterTitle";
import { ValidateForm } from "./validateForm";

interface RegisterPanel {
  nik: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
  onValidateNik: () => void;
}

export const RegisterPanel = (props: RegisterPanel) => {
  const { nik, onChange, onValidateNik } = props;
  return (
    <div className="w-full max-w-[450px] bg-secondary min-h-[500px] rounded-lg shadow-2xl flex flex-col justify-start items-center py-6 px-8">
      <RegisterTitle />
      <ValidateForm
        nik={nik}
        onChange={onChange}
        onValidateNik={onValidateNik}
      />
    </div>
  );
};

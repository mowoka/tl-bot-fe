import { FormUserTeknisi } from "../../hooks/teknisi-management/useTeknisiUser";
import { CButton } from "../common/CButton";
import Input from "../common/Input";
import LinearProgress from "@mui/material/LinearProgress";

interface FormPanelProps {
  formUserTeknisi: FormUserTeknisi;
  formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onSubmit: () => void;
  onLoading?: boolean;
}

export const FromPanel = (props: FormPanelProps) => {
  const { formUserTeknisi, formOnChange, onSubmit, onLoading } = props;
  return (
    <div className="bg-secondary  w-full max-w-[500px] min-h-[300px] rounded-lg p-4">
      <div className="flex justify-between items-center w-full">
        <div className="w-[100%] px-2 py-2">
          <Input
            type="text"
            label="NIK"
            value={formUserTeknisi.nik}
            placeholder="Input NIK"
            onChange={(e) => formOnChange(e, "nik")}
            error={
              formUserTeknisi.nik.length > 0 && formUserTeknisi.nik.length < 16
                ? true
                : false
            }
            maxLength={16}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-[50%] px-2 py-2">
          <Input
            type="text"
            label="Nama"
            value={formUserTeknisi.name}
            placeholder="Input Nama"
            onChange={(e) => formOnChange(e, "name")}
          />
        </div>
        <div className="w-[50%] px-2 py-2">
          <Input
            type="text"
            label="ID Telegram"
            value={formUserTeknisi.idTelegram}
            placeholder="Input ID Telegram"
            onChange={(e) => formOnChange(e, "idTelegram")}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-[50%] px-2 py-2">
          <Input
            type="text"
            label="Partner"
            value={formUserTeknisi.partner}
            placeholder="Input Partner"
            onChange={(e) => formOnChange(e, "partner")}
          />
        </div>
        <div className="w-[50%] px-2 py-2">
          <Input
            type="text"
            label="Sector"
            value={formUserTeknisi.sector}
            placeholder="Input Sector"
            onChange={(e) => formOnChange(e, "sector")}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-[50%] px-2 py-2">
          <Input
            type="text"
            label="Regional"
            value={formUserTeknisi.regional}
            placeholder="Input Regional"
            onChange={(e) => formOnChange(e, "regional")}
          />
        </div>
        <div className="w-[50%] px-2 py-2">
          <Input
            type="text"
            label="Witel"
            value={formUserTeknisi.witel}
            placeholder="Input Witel"
            onChange={(e) => formOnChange(e, "witel")}
          />
        </div>
      </div>
      <div className="pt-3 px-2">
        <CButton text="Submit" onClick={onSubmit} />
        {onLoading && (
          <div className="py-1">
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
};

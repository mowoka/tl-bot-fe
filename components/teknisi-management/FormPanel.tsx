import {
  FilterOptionsProps,
  FormUserTeknisi,
  MasterFilterOptions,
} from "../../hooks/teknisi-management/useTeknisiUser";
import { CButton, EButton } from "../common/CButton";
import Input from "../common/Input";
import LinearProgress from "@mui/material/LinearProgress";
import InputDropdown from "../common/InputDropdown";

interface FormPanelProps {
  formUserTeknisi: FormUserTeknisi;
  teamLeadUser: FilterOptionsProps[];
  formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onSubmit: () => void;
  onResetForm: () => void;
  onLoading?: boolean;
  step: number;
  isAdmin: boolean;
  masterFitlerOptions: MasterFilterOptions;
}

export const FromPanel = (props: FormPanelProps) => {
  const {
    formUserTeknisi,
    step,
    teamLeadUser,
    formOnChange,
    onSubmit,
    onLoading,
    isAdmin,
    onResetForm,
    masterFitlerOptions,
  } = props;

  return (
    <div className="bg-white  w-full min-w-[500px] max-w-[500px] min-h-[120px] rounded-lg p-4">
      <div className="px-2 py-2">
        <h2 className="font-bold text-2xl">Form Teknisi</h2>
        <h4 className="text-xs">
          {isAdmin
            ? "Isi Form untuk menambah teknisi baru"
            : "Dengan Mengisi Form maka teknisi tersebut akan masuk dalam tim anda"}
        </h4>
      </div>
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
            disabled={step === 2 ? true : false}
            maxLength={16}
          />
        </div>
      </div>
      {step === 2 && (
        <>
          <div className="flex justify-between items-center w-full flex-wrap">
            <div className="w-[100%] px-2 py-2">
              <Input
                type="text"
                label="Nama"
                value={formUserTeknisi.name}
                placeholder="Input Nama"
                onChange={(e) => formOnChange(e, "name")}
              />
            </div>
            <div className="w-[100%] px-2 py-2">
              <Input
                type="text"
                label="ID Telegram"
                value={formUserTeknisi.idTelegram}
                placeholder="Input ID Telegram"
                onChange={(e) => formOnChange(e, "idTelegram")}
              />
            </div>
            {isAdmin && (
              <div className="w-[100%] px-2 py-2">
                <InputDropdown
                  label="Team Lead"
                  value={formUserTeknisi.user_id}
                  placeholder="Choose Partner"
                  onChange={(e) => formOnChange(e, "team-lead")}
                  options={teamLeadUser}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Partner"
                value={formUserTeknisi.partner_id}
                placeholder="Choose Partner"
                onChange={(e) => formOnChange(e, "partner")}
                options={masterFitlerOptions.partner}
              />
            </div>
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Sector"
                value={formUserTeknisi.sector_id}
                placeholder="Choose Sector"
                onChange={(e) => formOnChange(e, "sector")}
                options={masterFitlerOptions.sector}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Regional"
                value={formUserTeknisi.regional_id}
                placeholder="Choose Regional"
                onChange={(e) => formOnChange(e, "regional")}
                options={masterFitlerOptions.regional}
              />
            </div>
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Witel"
                value={formUserTeknisi.witel_id}
                placeholder="Choose Witel"
                onChange={(e) => formOnChange(e, "witel")}
                options={masterFitlerOptions.witel}
              />
            </div>
          </div>
        </>
      )}
      <div className="pt-3 px-2">
        <CButton
          text={step !== 1 ? "Submit" : "Validate NIK"}
          onClick={onSubmit}
        />
        {step == 2 && (
          <div className="py-2">
            <EButton text={"Cancel"} onClick={onResetForm} />
          </div>
        )}
        {onLoading && (
          <div className="py-1">
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
};

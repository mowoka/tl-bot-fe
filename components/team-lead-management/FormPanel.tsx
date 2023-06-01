import { CButton, EButton, OButton } from "../common/CButton";
import Input from "../common/Input";
import LinearProgress from "@mui/material/LinearProgress";
import InputDropdown from "../common/InputDropdown";
import { MasterFilterOptions } from "@app/hooks/teknisi-management/useTeknisiUser";
import { FormTeamLeadUser } from "@app/hooks/team-lead-management/useTeamLeadManagement";

interface FormPanelProps {
  formTeamLeadUser: FormTeamLeadUser;
  formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onSubmit: () => void;
  onResetForm: () => void;
  onLoading?: boolean;
  step: number;
  masterFitlerOptions: MasterFilterOptions;
  setDefaultPassword: () => void;
}

export const FromPanel = (props: FormPanelProps) => {
  const {
    formTeamLeadUser,
    step,
    formOnChange,
    onSubmit,
    onLoading,
    onResetForm,
    masterFitlerOptions,
    setDefaultPassword,
  } = props;
  return (
    <div className="bg-white  w-full min-w-[500px] max-w-[500px] min-h-[120px] rounded-lg p-4">
      <div className="px-2 py-2">
        <h2 className="font-bold text-2xl">Form Teknisi</h2>
        <h4 className="text-xs">Isi Form untuk menambah team leader baru</h4>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-[100%] px-2 py-2">
          <Input
            type="text"
            label="NIK"
            value={formTeamLeadUser.nik}
            placeholder="Input NIK"
            onChange={(e) => formOnChange(e, "nik")}
            error={
              formTeamLeadUser.nik.length > 0 &&
              formTeamLeadUser.nik.length < 16
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
                value={formTeamLeadUser.name}
                placeholder="Input Nama"
                onChange={(e) => formOnChange(e, "name")}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full flex-wrap">
            <div className="w-[70%] px-2 py-2">
              <Input
                type="password"
                label="Password"
                value={formTeamLeadUser.password}
                placeholder="Input Password"
                onChange={(e) => formOnChange(e, "password")}
              />
            </div>
            <div className="w-[30%] px-2">
              <OButton text="Default Password" onClick={setDefaultPassword} />
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Partner"
                value={formTeamLeadUser.partner_id}
                placeholder="Choose Partner"
                onChange={(e) => formOnChange(e, "partner")}
                options={masterFitlerOptions.partner}
              />
            </div>
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Regional"
                value={formTeamLeadUser.regional_id}
                placeholder="Choose Regional"
                onChange={(e) => formOnChange(e, "regional")}
                options={masterFitlerOptions.regional}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Sector"
                value={formTeamLeadUser.sector_id}
                placeholder="Choose Sector"
                onChange={(e) => formOnChange(e, "sector")}
                options={masterFitlerOptions.sector}
              />
            </div>
            <div className="w-[50%] px-2 py-2">
              <InputDropdown
                label="Witel"
                value={formTeamLeadUser.witel_id}
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

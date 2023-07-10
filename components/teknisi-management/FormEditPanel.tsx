import Input from "../common/Input";
import LinearProgress from "@mui/material/LinearProgress";
import InputDropdown from "../common/InputDropdown";
import {
  FilterOptionsProps,
  FormUserTeknisi,
  MasterFilterOptions,
} from "@app/hooks/teknisi-management/useTeknisiUser";
import { CButton, EButton } from "../common/CButton";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface FormEditPanelProps {
  teamLeadUser: FilterOptionsProps[];
  masterFitlerOptions: MasterFilterOptions;
  formUserTeknisi: FormUserTeknisi;
  formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onLoading?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function FormEditPanel(props: FormEditPanelProps) {
  const {
    masterFitlerOptions,
    formUserTeknisi,
    formOnChange,
    teamLeadUser,
    onLoading,
    onCancel,
    onSubmit,
  } = props;

  return (
    <div className="bg-white  w-full min-w-[500px] max-w-[500px] min-h-[120px] rounded-lg p-4">
      <div className="px-2 py-2">
        <h2 className="font-bold text-2xl">Form Edit Teknisi</h2>
      </div>
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
          <div className="w-[100%] px-2 py-2">
            <InputDropdown
              label="Team Lead"
              value={formUserTeknisi.user_id}
              placeholder="Choose Partner"
              onChange={(e) => formOnChange(e, "team-lead")}
              options={teamLeadUser}
            />
          </div>
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
        <FormGroup className="px-2">
          <FormControlLabel
            control={
              <Checkbox
                value={formUserTeknisi.isActive === 1 ? true : false}
                onChange={(e) => formOnChange(e, "status")}
                color="success"
              />
            }
            label="Teknisi Status"
          />
        </FormGroup>
      </>
      <div className="pt-3 px-2">
        <CButton text={"Submit"} onClick={onSubmit} />
        <div className="py-2">
          <EButton text={"Cancel"} onClick={onCancel} />
        </div>

        {onLoading && (
          <div className="py-1">
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
}

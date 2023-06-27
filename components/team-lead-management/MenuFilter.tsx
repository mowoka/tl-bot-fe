import { OButton } from "../common/CButton";
import InputDropdown from "../common/InputDropdown";
import { MasterFilterOptions } from "../../hooks/teknisi-management/useTeknisiUser";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Skeleton, Tooltip } from "@mui/material";
import { TeamLeadParamsProps } from "@app/hooks/team-lead-management/useTeamLeadManagement";

interface MenuFilterProps {
  masterOptions: MasterFilterOptions;
  masterFilterOptionsLoading: boolean;
  params: TeamLeadParamsProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  resetParams: () => void;
  handleOpenModal: () => void;
}

export const MenuFilter = (props: MenuFilterProps) => {
  const {
    params,
    masterOptions,
    masterFilterOptionsLoading,
    onChange,
    resetParams,
    handleOpenModal,
  } = props;
  return (
    <div className="py-4 flex justify-between items-center">
      <div className="w-full flex justify-start items-center">
        {masterFilterOptionsLoading ? (
          <Skeleton variant="rounded" width={"100%"} height={56} />
        ) : (
          <>
            <div className="w-full max-w-[250px] h-[50px] flex  items-center">
              <InputDropdown
                label="Partner"
                placeholder="pilih teknisi"
                value={params.partner_id}
                options={masterOptions.partner}
                onChange={(e) => onChange(e, "partner")}
              />
            </div>
            <div className="w-full px-4 max-w-[250px] h-[50px] flex items-center">
              <InputDropdown
                label="Regional"
                placeholder="pilih regional"
                value={params.regional_id}
                options={masterOptions.regional}
                onChange={(e) => onChange(e, "regional")}
              />
            </div>
            <div className="w-full max-w-[250px] h-[50px] flex items-center">
              <InputDropdown
                label="Sector"
                placeholder="pilih sector"
                value={params.sector_id}
                options={masterOptions.sector}
                onChange={(e) => onChange(e, "sector")}
              />
            </div>
          </>
        )}
        {params.partner_id || params.regional_id || params.sector_id ? (
          <div className="w-full max-w-[250px] px-6 h-[56px] flex items-center">
            <IconButton onClick={resetParams}>
              <Tooltip title={"Reset Filter"}>
                <CloseIcon color="error" />
              </Tooltip>
            </IconButton>
          </div>
        ) : null}
      </div>

      <div className="w-full max-w-[200px] h-[56px] flex justify-end items-center">
        <OButton
          disable={false}
          text={"+ Team Lead"}
          onClick={handleOpenModal}
        />
      </div>
    </div>
  );
};

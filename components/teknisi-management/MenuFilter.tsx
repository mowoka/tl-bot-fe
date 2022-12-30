import { OButton } from "../common/CButton";
import InputDropdown from "../common/InputDropdown";
import {
  MasterFilterOptions,
  ParamsProps,
} from "../../hooks/teknisi-management/useTeknisiUser";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

interface MenuFilterProps {
  masterOptions: MasterFilterOptions;
  params: ParamsProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  resetParams: () => void;
}

export const MenuFilter = (props: MenuFilterProps) => {
  const { params, masterOptions, onChange, resetParams } = props;
  return (
    <div className="py-4 flex justify-between items-center">
      <div className="w-full flex justify-start items-center">
        <div className="w-full max-w-[250px] h-[50px] flex  items-center">
          <InputDropdown
            label="Partner"
            placeholder="pilih teknisi"
            value={params.partner}
            options={masterOptions.partner}
            onChange={(e) => onChange(e, "partner")}
          />
        </div>
        <div className="w-full px-4 max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Regional"
            placeholder="pilih regional"
            value={params.regional}
            options={masterOptions.regional}
            onChange={(e) => onChange(e, "regional")}
          />
        </div>
        <div className="w-full max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Sector"
            placeholder="pilih sector"
            value={params.sector}
            options={masterOptions.sector}
            onChange={(e) => onChange(e, "sector")}
          />
        </div>
        {params.partner || params.regional || params.sector ? (
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
          text="+ Add Teknisi"
          onClick={() => console.log("")}
        />
      </div>
    </div>
  );
};

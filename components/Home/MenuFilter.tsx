import { IconButton, Skeleton, Tooltip } from "@mui/material";
import InputDropdown from "../common/InputDropdown";
import CloseIcon from "@mui/icons-material/Close";
import DatePickerInput from "../common/DatePickerInput";
import { MasterFilterOptions } from "../../hooks/teknisi-management/useTeknisiUser";
import React from "react";
import { ParamsUserReport } from "../../hooks/home/useHome";

interface MenuFilterProps {
  masterFilterOptions: MasterFilterOptions;
  masterFilterOptionsLoading: boolean;
  params: ParamsUserReport;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onChangeDate: (value: string, name: string) => void;
  resetFilter: () => void;
  isAdmin: boolean;
}

export const MenuFilter = (props: MenuFilterProps) => {
  const {
    masterFilterOptions,
    masterFilterOptionsLoading,
    params,
    onChange,
    onChangeDate,
    resetFilter,
    isAdmin,
  } = props;

  return (
    <>
      {masterFilterOptionsLoading ? (
        <Skeleton variant="rounded" width={"100%"} height={56} />
      ) : (
        <div className="py-8 flex justify-between items-center">
          <div className="w-full flex justify-start items-center">
            <div
              className={`w-full ${
                isAdmin ? "max-w-[200px] pr-4" : "max-w-[250px] pr-2"
              } flex items-center`}
            >
              <DatePickerInput
                label="Start Date"
                onChange={(e) => onChangeDate(e, "startDate")}
                value={params.startDate}
              />
            </div>
            <div
              className={`w-full ${
                isAdmin ? "max-w-[200px] pr-4" : "max-w-[250px] pr-2"
              } flex items-center`}
            >
              <DatePickerInput
                label="End Date"
                onChange={(e) => onChangeDate(e, "endDate")}
                value={params.endDate}
              />
            </div>
            {isAdmin && (
              <>
                <div className="w-full max-w-[250px] h-[50px] flex  items-center">
                  <InputDropdown
                    label="Partner"
                    placeholder="pilih partner"
                    value={params.partner_id}
                    options={masterFilterOptions.partner}
                    onChange={(e) => onChange(e, "partner")}
                  />
                </div>
                <div className="w-full px-4 max-w-[250px] h-[50px] flex items-center">
                  <InputDropdown
                    label="Regional"
                    placeholder="pilih regional"
                    value={params.regional_id}
                    options={masterFilterOptions.regional}
                    onChange={(e) => onChange(e, "regional")}
                  />
                </div>
                <div className="w-full max-w-[250px] h-[50px] flex items-center">
                  <InputDropdown
                    label="Sector"
                    placeholder="pilih sector"
                    value={params.sector_id}
                    options={masterFilterOptions.sector}
                    onChange={(e) => onChange(e, "sector")}
                  />
                </div>
              </>
            )}
            {params.regional_id || params.sector_id || params.partner_id ? (
              <div className="w-full max-w-[100px] px-6 h-[56px] flex items-center">
                <IconButton onClick={resetFilter}>
                  <Tooltip title={"Reset Filter"}>
                    <CloseIcon color="error" />
                  </Tooltip>
                </IconButton>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

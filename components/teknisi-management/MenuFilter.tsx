import { OButton } from "../common/CButton";
import InputDropdown from "../common/InputDropdown";
import {
  MasterFilterOptions,
  ParamsProps,
} from "../../hooks/teknisi-management/useTeknisiUser";

interface MenuFilterProps {
  masterOptions: MasterFilterOptions;
  params: ParamsProps;
}

export const MenuFilter = (props: MenuFilterProps) => {
  const { params, masterOptions } = props;
  return (
    <div className="py-4 flex justify-between items-center">
      <div className="w-full flex justify-start items-center">
        <div className="w-full max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Partner"
            placeholder="pilih teknisi"
            value={params.partner}
            options={masterOptions.partner}
          />
        </div>
        <div className="w-full px-4 max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Regional"
            placeholder="pilih regional"
            value={params.regional}
            options={masterOptions.regional}
          />
        </div>
        <div className="w-full max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Sector"
            placeholder="pilih sector"
            value={params.sector}
            options={masterOptions.sector}
          />
        </div>
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

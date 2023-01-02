import { IconButton, Tooltip } from "@mui/material";
import InputDropdown from "../common/InputDropdown";
import { OButton } from "../common/CButton";
import CloseIcon from "@mui/icons-material/Close";

export const MenuFilter = () => {
  return (
    <div className="py-4 flex justify-between items-center">
      <div className="w-full flex justify-start items-center">
        <div className="w-full max-w-[250px] h-[50px] flex  items-center">
          <InputDropdown
            label="Partner"
            placeholder="pilih teknisi"
            value={""}
            options={[{ key: "a", value: "a" }]}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-full px-4 max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Regional"
            placeholder="pilih regional"
            value={""}
            options={[{ key: "a", value: "a" }]}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-full max-w-[250px] h-[50px] flex items-center">
          <InputDropdown
            label="Sector"
            placeholder="pilih sector"
            value={""}
            options={[{ key: "a", value: "a" }]}
            onChange={(e) => console.log(e)}
          />
        </div>

        <div className="w-full max-w-[250px] px-6 h-[56px] flex items-center">
          <IconButton onClick={() => {}}>
            <Tooltip title={"Reset Filter"}>
              <CloseIcon color="error" />
            </Tooltip>
          </IconButton>
        </div>
      </div>
      <div className="w-full max-w-[200px] h-[56px] flex justify-end items-center">
        <OButton disable={false} text="+ Add Teknisi" onClick={() => {}} />
      </div>
    </div>
  );
};

import { useRef } from "react";
import InputDropdown from "../common/InputDropdown";

const FormPerformansi = () => {
  const nameTeknisi = useRef<HTMLDivElement | undefined>();
  return (
    <div className="py-5">
      <InputDropdown
        ref={nameTeknisi}
        label="Nik/Nama Teknisi"
        placeholder="pilih teknisi"
        value="a"
        options={[
          { key: "a", value: "a" },
          { key: "b", value: "b" },
        ]}
      />
    </div>
  );
};

export default FormPerformansi;

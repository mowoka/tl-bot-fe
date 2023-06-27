import { LinearProgress, Skeleton } from "@mui/material";
import { FormDataProps } from "../../hooks/board/useBoard";
import { OButton } from "../common/CButton";
import Input from "../common/Input";
import InputDropdown from "../common/InputDropdown";
import { TextArea } from "../common/TextArea";
import { FilterOptionsProps } from "@app/hooks/teknisi-management/useTeknisiUser";

interface FormPerformansiProps {
  teknisiUserOptions: FilterOptionsProps[];
  teknisiUserOptionsLoading: boolean;
  teamLeadJobOptions: FilterOptionsProps[];
  teamLeadJobOptionsLoading: boolean;
  formData: FormDataProps;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => void;
  onSubmit: () => void;
  onLoading?: boolean;
}

const FormPerformansi = (props: FormPerformansiProps) => {
  const {
    teamLeadJobOptions,
    teamLeadJobOptionsLoading,
    teknisiUserOptions,
    teknisiUserOptionsLoading,
    formData,
    onChange,
    onSubmit,
    onLoading,
  } = props;
  return (
    <div className="py-1 mt-10 w-full max-w-[600px]">
      <div className="py-4">
        {teknisiUserOptionsLoading ? (
          <Skeleton variant="rounded" width={"100%"} height={56} />
        ) : (
          <InputDropdown
            label="Teknisi"
            placeholder="Pilih Teknisi"
            value={formData.teknisiUserId}
            options={teknisiUserOptions}
            onChange={(e) => onChange(e, "teknisi")}
          />
        )}
      </div>
      <div className="flex py-4 w-full justify-between items-start">
        <div className="w-[80%]">
          {teamLeadJobOptionsLoading ? (
            <Skeleton variant="rounded" width={"100%"} height={56} />
          ) : (
            <InputDropdown
              label="Tugas"
              placeholder="Pilih Tugas"
              value={formData.jobId}
              options={teamLeadJobOptions}
              onChange={(e) => onChange(e, "job")}
            />
          )}
        </div>
        <div className="w-[20%] pl-4 h-[56px]">
          <Input
            label="Nilai"
            type="text"
            placeholder=""
            value={formData.nilai ? formData.nilai : "-"}
            onChange={(e) => onChange(e, "score")}
            disabled={true}
          />
        </div>
      </div>
      <div className="py-4 w-full">
        <TextArea
          value={formData.keterangan}
          onChange={(e) => onChange(e, "keterangan")}
        />
      </div>
      <div className="w-full">
        <OButton text="Submit" onClick={onSubmit} />
        {onLoading && (
          <div className="py-1">
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPerformansi;

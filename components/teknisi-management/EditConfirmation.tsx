import { Button } from "@mui/material";

interface EditConfirmationProps {
  teknisiName: string;
  teknisiStatus: number;
  isLoading: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

export default function EditConfirmation(props: EditConfirmationProps) {
  const { teknisiName, teknisiStatus, isLoading, handleClose, handleSubmit } =
    props;
  return (
    <div className="bg-white min-w-[500px] min-h-[150px] rounded-lg p-4 relative">
      <div>
        Apakah anda yakin akan
        <span className="font-semibold text-rose-500">
          {teknisiStatus == 1 ? " nonactive" : " active"}
        </span>{" "}
        kan teknisi user {teknisiName} ini ?
      </div>
      <div className="flex justify-end items-center absolute right-5 bottom-8 ">
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-rose-400 text-white"
          variant="contained"
          color="error"
        >
          Ya
        </Button>
        <Button
          onClick={handleClose}
          className="ml-4 bg-white text-black hover:text-white"
          variant="contained"
          color="secondary"
        >
          Tidak
        </Button>
      </div>
    </div>
  );
}

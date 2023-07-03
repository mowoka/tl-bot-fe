import { UserTeknisi } from "@app/hooks/teknisi-management/useTeknisiUser";
import { Button } from "@mui/material";

interface DeleteConfirmationProps {
  userTeknisi?: UserTeknisi;
  handleClose: () => void;
  handleDeleteTeknisiUser: () => void;
  deleteLoading: boolean;
}

export function DeleteConfirmation(props: DeleteConfirmationProps) {
  const { userTeknisi, handleClose, handleDeleteTeknisiUser, deleteLoading } =
    props;
  return (
    <div className="bg-white min-w-[500px] min-h-[150px] rounded-lg p-4 relative">
      <div>
        Apakah anda yakin akan{" "}
        <span className="font-semibold text-rose-500">Delete</span> teknisi user{" "}
        {userTeknisi?.name} ini ?
      </div>
      <div className="flex justify-end items-center absolute right-5 bottom-8 ">
        <Button
          disabled={deleteLoading}
          onClick={handleDeleteTeknisiUser}
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

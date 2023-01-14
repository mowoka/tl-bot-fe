import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import FormPerformansi from "../components/board/Form";
import { useProfile } from "../hooks/common/useProfile";
import { useBoard } from "../hooks/board/useBoard";
import { useGuard } from "../hooks/common/userGuard";
import SnackbarMessage from "../components/common/Snackbar";
import { ScreenLoading } from "../components/common/ScreenLoading";
import { useToken } from "../hooks/common/useToken";

const Board = () => {
  const { isAuthenticate } = useGuard();
  const { token } = useToken();
  const { profile } = useProfile();

  const {
    optionsData,
    formData,
    isLoading,
    errorMessage,
    onChange,
    onSubmit,
    onCloseError,
  } = useBoard();

  if (!isAuthenticate || !profile.name || !token) {
    return <ScreenLoading />;
  }

  return (
    <Layout profile={profile}>
      <SnackbarMessage
        show={errorMessage.show}
        message={errorMessage.message}
        status={errorMessage.status}
        onClose={onCloseError}
      />
      <div className="flex justify-start items-end py-4">
        <h2 className="font-semibold text-4xl">TL Board</h2>
        <span className="text-md">(*Tiket khusus dari team lead)</span>
      </div>
      <Divider />
      <FormPerformansi
        optionsData={optionsData}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onLoading={isLoading}
      />
    </Layout>
  );
};

export default Board;

// import FormPerformansi from "@app/components/board/Form";
import Layout from "@app/components/common/Layout";
// import { ScreenLoading } from "@app/components/common/ScreenLoading";
// import SnackbarMessage from "@app/components/common/Snackbar";
// import { useBoard } from "@app/hooks/board/useBoard";
import { useProfile } from "@app/hooks/common/useProfile";
import useUser from "@app/hooks/common/useUser";
// import { useGuard } from "@app/hooks/common/userGuard";
import { Divider } from "@mui/material";

const Board = () => {
  // const { isAuthenticate } = useGuard();
  const { profile } = useProfile();
  const { logout } = useUser();

  // const {
  //   optionsData,
  //   formData,
  //   isLoading,
  //   errorMessage,
  //   onChange,
  //   onSubmit,
  //   onCloseError,
  // } = useBoard();

  // if (!isAuthenticate || !profile.name) {
  //   return <ScreenLoading />;
  // }

  return (
    <Layout profile={profile} logout={logout}>
      {/* <SnackbarMessage
        show={errorMessage.show}
        message={errorMessage.message}
        status={errorMessage.status}
        onClose={onCloseError}
      /> */}
      <div className="py-4">
        <h2 className="font-semibold text-4xl">TL Board</h2>
        <span className="text-md">
          (* Tiket khusus dari team lead kepada teknisi)
        </span>
      </div>
      <Divider />
      {/* <FormPerformansi
        optionsData={optionsData}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onLoading={isLoading}
      /> */}
    </Layout>
  );
};

export default Board;

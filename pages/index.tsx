import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import { useGuard } from "../hooks/common/userGuard";
import useHome from "../hooks/home/useHome";
import { DataTable } from "../components/Home/DataTable";
import { useProfile } from "../hooks/common/useProfile";
import SnackbarMessage from "../components/common/Snackbar";
import { MenuFilter } from "../components/Home/MenuFilter";
import { ModalElement } from "../components/common/Modal";
import { DataTableHistory } from "../components/Home/DataTableHistory";
import { ScreenLoading } from "../components/common/ScreenLoading";
import useUser from "../hooks/common/useUser";

export default function Home() {
  const { isAuthenticate } = useGuard();
  const { profile } = useProfile();
  const { logout } = useUser();
  const {
    data,
    isLoading,
    errorMessage,
    masterFilterOptions,
    params,
    open,
    historyTable,
    isHistoryLoading,
    historyData,
    onChange,
    onChangeDate,
    onCloseError,
    resetFilter,
    handleClose,
    handleOpenTiketHistory,
  } = useHome();

  if (!isAuthenticate || !profile.name) {
    return <ScreenLoading />;
  }

  return (
    <Layout profile={profile} logout={logout}>
      <SnackbarMessage
        show={errorMessage.show}
        message={errorMessage.message}
        status={errorMessage.status}
        onClose={onCloseError}
      />
      <ModalElement open={open} handleClose={handleClose}>
        <DataTableHistory
          historyTable={historyTable}
          isLoading={isHistoryLoading}
          historyData={historyData}
        />
      </ModalElement>
      <h2 className="font-semibold text-4xl py-4">Performansi IOAN</h2>
      <Divider />
      <MenuFilter
        masterFilterOptions={masterFilterOptions}
        onChange={onChange}
        onChangeDate={onChangeDate}
        params={params}
        resetFilter={resetFilter}
      />
      <DataTable
        isLoading={isLoading}
        data={data}
        handleOpenTiketHistory={handleOpenTiketHistory}
      />
    </Layout>
  );
}

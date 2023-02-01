import { Divider } from "@mui/material";
import { DataTable } from "app/components/Home/DataTable";
import { DataTableHistory } from "app/components/Home/DataTableHistory";
import { MenuFilter } from "app/components/Home/MenuFilter";
import Layout from "app/components/common/Layout";
import { ModalElement } from "app/components/common/Modal";
import { ScreenLoading } from "app/components/common/ScreenLoading";
import SnackbarMessage from "app/components/common/Snackbar";
import { useProfile } from "app/hooks/common/useProfile";
import useUser from "app/hooks/common/useUser";
import { useGuard } from "app/hooks/common/userGuard";
import useHome from "app/hooks/home/useHome";

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

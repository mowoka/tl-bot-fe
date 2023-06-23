import { DataTable } from "@app/components/Home/DataTable";
import { DataTableHistory } from "@app/components/Home/DataTableHistory";
import { MenuFilter } from "@app/components/Home/MenuFilter";
import Layout from "@app/components/common/Layout";
import { ModalElement } from "@app/components/common/Modal";
import { ScreenLoading } from "@app/components/common/ScreenLoading";
import SnackbarMessage from "@app/components/common/Snackbar";
import { useProfile } from "@app/hooks/common/useProfile";
import useUser from "@app/hooks/common/useUser";
import { useGuard } from "@app/hooks/common/userGuard";
import useHome from "@app/hooks/home/useHome";
import { Divider } from "@mui/material";

export default function Home() {
  const { isAuthenticate } = useGuard();
  const { profile } = useProfile();
  const { logout } = useUser();
  const {
    data,
    isLoading,
    errorMessage,
    masterFilterOptions,
    masterFilterOptionsLoading,
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

  const isAdmin = profile.role === "admin";

  return (
    <Layout profile={profile} logout={logout}>
      <SnackbarMessage
        show={errorMessage.show}
        message={errorMessage.message}
        status={errorMessage.status}
        onClose={onCloseError}
      />
      {/* <ModalElement open={open} handleClose={handleClose}>
        <DataTableHistory
          historyTable={historyTable}
          isLoading={isHistoryLoading}
          historyData={historyData}
        />
      </ModalElement> */}
      <h2 className="font-semibold text-4xl py-4">
        Performansi Teknisi IOAN{" "}
        <span className="text-xl">
          (Integration, Operation, Assurance, Network)
        </span>
      </h2>
      <Divider />
      <MenuFilter
        masterFilterOptions={masterFilterOptions}
        masterFilterOptionsLoading={masterFilterOptionsLoading}
        onChange={onChange}
        onChangeDate={onChangeDate}
        params={params}
        resetFilter={resetFilter}
        isAdmin={isAdmin}
      />
      <DataTable
        isLoading={isLoading}
        data={data}
        handleOpenTiketHistory={handleOpenTiketHistory}
      />
    </Layout>
  );
}

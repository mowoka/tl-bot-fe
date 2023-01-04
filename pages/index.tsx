import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import { useGuard } from "../hooks/common/userGuard";
import useHome from "../hooks/home/useHome";
import { DataTable } from "../components/Home/DataTable";
import { useProfile } from "../hooks/common/useProfile";
import SnackbarMessage from "../components/common/Snackbar";
import { MenuFilter } from "../components/Home/MenuFilter";
import ModalElement from "../components/common/Modal";
import { DataTableHistory } from "../components/Home/DataTableHistory";

export default function Home() {
  useGuard();
  const { profile } = useProfile();
  const {
    data,
    isLoading,
    errorMessage,
    masterFilterOptions,
    params,
    open,
    historyTable,
    onChange,
    onChangeDate,
    onCloseError,
    resetFilter,
    handleClose,
    handleOpenTiketHistory,
  } = useHome();

  return (
    <Layout profile={profile} footer={true}>
      <SnackbarMessage
        show={errorMessage.show}
        message={errorMessage.message}
        status={errorMessage.status}
        onClose={onCloseError}
      />
      <ModalElement open={open} handleClose={handleClose}>
        <DataTableHistory historyTable={historyTable} />
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

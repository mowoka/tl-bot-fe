import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import { DataTable } from "../components/teknisi-management/DataTable";
import { MenuFilter } from "../components/teknisi-management/MenuFilter";
import { useTeknisiUser } from "../hooks/teknisi-management/useTeknisiUser";
import { useProfile } from "../hooks/common/useProfile";
import { ModalElement } from "../components/common/Modal";
import { useModalElement } from "../hooks/common/useModalElement";
import { FromPanel } from "../components/teknisi-management/FormPanel";
import SnackbarMessage from "../components/common/Snackbar";
import { useGuard } from "../hooks/common/userGuard";
import { ScreenLoading } from "../components/common/ScreenLoading";

const TeknisiManagement = () => {
  const { isAuthenticate } = useGuard();
  const { profile } = useProfile();

  const { open, handleOpen, handleClose } = useModalElement();
  const {
    params,
    data,
    masterFilterOptions,
    isLoading,
    submitLoading,
    formUserTeknisi,
    errorMessage,
    onChange,
    formOnChange,
    resetParams,
    onSubmit,
    onCloseError,
  } = useTeknisiUser();

  if (!isAuthenticate || !profile.name) {
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
      <ModalElement open={open} handleClose={handleClose}>
        <FromPanel
          formOnChange={formOnChange}
          onSubmit={onSubmit}
          formUserTeknisi={formUserTeknisi}
          onLoading={submitLoading}
        />
      </ModalElement>
      <h2 className="font-semibold text-4xl py-4">Teknisi User Management</h2>
      <Divider />
      <MenuFilter
        handleOpenModal={handleOpen}
        params={params}
        masterOptions={masterFilterOptions}
        onChange={onChange}
        resetParams={resetParams}
      />
      <DataTable data={data} isLoading={isLoading} />
    </Layout>
  );
};

export default TeknisiManagement;

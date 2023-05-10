import Layout from "@app/components/common/Layout";
import { ModalElement } from "@app/components/common/Modal";
import { ScreenLoading } from "@app/components/common/ScreenLoading";
import SnackbarMessage from "@app/components/common/Snackbar";
import { DataTable } from "@app/components/teknisi-management/DataTable";
import { FromPanel } from "@app/components/teknisi-management/FormPanel";
import { MenuFilter } from "@app/components/teknisi-management/MenuFilter";
import { useModalElement } from "@app/hooks/common/useModalElement";
import { useProfile } from "@app/hooks/common/useProfile";
import useUser from "@app/hooks/common/useUser";
import { useGuard } from "@app/hooks/common/userGuard";
import { useTeknisiUser } from "@app/hooks/teknisi-management/useTeknisiUser";
import { Divider } from "@mui/material";

const TeknisiManagement = () => {
  const { isAuthenticate } = useGuard();
  const { profile } = useProfile();
  const { logout } = useUser();

  const { open, handleOpen, handleClose } = useModalElement();
  const {
    params,
    data,
    masterFilterOptions,
    masterFilterOpstionsIsloading,
    isLoading,
    submitLoading,
    formUserTeknisi,
    errorMessage,
    stepForm,
    onChange,
    formOnChange,
    resetParams,
    onSubmit,
    onResetForm,
    onCloseError,
  } = useTeknisiUser(handleClose);

  if (!isAuthenticate || !profile.name || masterFilterOpstionsIsloading) {
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
      <ModalElement open={open} handleClose={handleClose}>
        <FromPanel
          isAdmin={isAdmin}
          step={stepForm}
          formOnChange={formOnChange}
          onSubmit={onSubmit}
          onResetForm={onResetForm}
          formUserTeknisi={formUserTeknisi}
          onLoading={submitLoading}
          masterFitlerOptions={masterFilterOptions}
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
        isAdmin={isAdmin}
      />
      <DataTable data={data} isLoading={isLoading} isAdmin={isAdmin} />
    </Layout>
  );
};

export default TeknisiManagement;

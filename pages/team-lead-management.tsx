import Layout from "@app/components/common/Layout";
import { ModalElement } from "@app/components/common/Modal";
import { ScreenLoading } from "@app/components/common/ScreenLoading";
import SnackbarMessage from "@app/components/common/Snackbar";
import { DataTable } from "@app/components/team-lead-management/DataTable";
import { FromPanel } from "@app/components/team-lead-management/FormPanel";
import { MenuFilter } from "@app/components/team-lead-management/MenuFilter";
import { useModalElement } from "@app/hooks/common/useModalElement";
import { useProfile } from "@app/hooks/common/useProfile";
import useUser from "@app/hooks/common/useUser";
import { useGuard } from "@app/hooks/common/userGuard";
import { useTeamLeadManagement } from "@app/hooks/team-lead-management/useTeamLeadManagement";
import { Divider } from "@mui/material";

export default function TeamLeadManagementPage() {
  const { isAuthenticate } = useGuard();
  const { profile } = useProfile();
  const { logout } = useUser();

  const { open, handleOpen, handleClose } = useModalElement();

  const {
    params,
    data,
    isLoading,
    masterFilterOptions,
    errorMessage,
    stepForm,
    submitLoading,
    formTeamLeadUser,
    onSubmit,
    formOnChange,
    onChange,
    resetParams,
    onCloseError,
    onResetForm,
    setDefaultPassword,
  } = useTeamLeadManagement(handleClose);

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
        <FromPanel
          formTeamLeadUser={formTeamLeadUser}
          step={stepForm}
          formOnChange={formOnChange}
          onSubmit={onSubmit}
          onResetForm={onResetForm}
          onLoading={submitLoading}
          masterFitlerOptions={masterFilterOptions}
          setDefaultPassword={setDefaultPassword}
        />
      </ModalElement>
      <h2 className="font-semibold text-4xl py-4">Team Lead User Management</h2>
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
}

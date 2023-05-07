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
  console.log({ profile });

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

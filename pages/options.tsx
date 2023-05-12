import Layout from "@app/components/common/Layout";
import { ScreenLoading } from "@app/components/common/ScreenLoading";
import OptionsMenu from "@app/components/options/optionsMenu";
import SnackbarMessage from "@app/components/common/Snackbar";
import { useProfile } from "@app/hooks/common/useProfile";
import useUser from "@app/hooks/common/useUser";
import { useGuard } from "@app/hooks/common/userGuard";
import { useOptions } from "@app/hooks/options/useOptions";
import { Divider } from "@mui/material";
import OptionsTableData from "@app/components/options/optionsTableData";

export default function Options() {
  const { isAuthenticate } = useGuard();
  const { profile } = useProfile();
  const { logout } = useUser();
  const {
    title,
    witel,
    regional,
    partner,
    sector,
    isLoading,
    errorMessage,
    handleOpenModal,
    onCloseError,
  } = useOptions();

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
      <h2 className="font-semibold text-4xl pt-4">Options</h2>
      <h3 className="font-semibold text-xs py-2">
        (* Configure set basic information data application)
      </h3>
      <Divider />
      <OptionsMenu handleOpenModal={handleOpenModal} />
      <OptionsTableData
        title={title}
        isLoading={isLoading}
        sector={sector}
        witel={witel}
        regional={regional}
        partner={partner}
      />
    </Layout>
  );
}

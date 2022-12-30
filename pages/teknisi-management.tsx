import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import { DataTable } from "../components/teknisi-management/DataTable";
import { MenuFilter } from "../components/teknisi-management/MenuFilter";
import { useTeknisiUser } from "../hooks/teknisi-management/useTeknisiUser";
import { useProfile } from "../hooks/common/useProfile";

const TeknisiManagement = () => {
  const { profile } = useProfile();
  const {
    params,
    data,
    masterFilterOptions,
    onChange,
    resetParams,
    isLoading,
  } = useTeknisiUser();
  return (
    <Layout profile={profile}>
      <h2 className="font-semibold text-4xl py-4">Teknisi User Management</h2>
      <Divider />
      <MenuFilter
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

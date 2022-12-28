import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import { DataTable } from "../components/teknisi-management/DataTable";
import { MenuFilter } from "../components/teknisi-management/MenuFilter";
import { useTeknisiUser } from "../hooks/teknisi-management/useTeknisiUser";

const TeknisiManagement = () => {
  const { data, masterFilterOptions } = useTeknisiUser();
  return (
    <Layout>
      <h2 className="font-semibold text-4xl py-4">Teknisi User Management</h2>
      <Divider />
      <MenuFilter masterOptions={masterFilterOptions} />
      <DataTable />
    </Layout>
  );
};

export default TeknisiManagement;

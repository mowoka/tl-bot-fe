import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  FilterOptionsProps,
  FormUserTeknisi,
  MasterFilterOptions,
  UserTeknisi,
  UserTeknisiResponse,
} from "../../hooks/teknisi-management/useTeknisiUser";
import LinearProgress from "@mui/material/LinearProgress";
import { PaginationPage } from "../common/PaginationPage";
import EditIcon from "@mui/icons-material/Edit";
import { ModalElement } from "../common/Modal";
import { useState } from "react";
import FormEditPanel from "./FormEditPanel";
import EditConfirmation from "./EditConfirmation";

interface DataTableProps {
  data: UserTeknisiResponse;
  isLoading: boolean;
  isAdmin: boolean;
  deleteTeknisiUser: (teknisiUserId: number) => void;
  formEditOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
  teamLeadUser: FilterOptionsProps[];
  masterFitlerOptions: MasterFilterOptions;
  handleEditForm: (teknisiUser: UserTeknisi) => void;
  formEditUserTeknisi: FormUserTeknisi;
  submitEditTeknisiForm: () => Promise<void>;
}

export const DataTable = (props: DataTableProps) => {
  const {
    data,
    isLoading,
    isAdmin,
    teamLeadUser,
    masterFitlerOptions,
    formEditUserTeknisi,
    formEditOnChange,
    handleEditForm,
    submitEditTeknisiForm,
  } = props;

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);

  const handleModalEditUser = (user: UserTeknisi) => {
    handleEditForm(user);
    setShowEditModal(true);
  };

  const submitEditForm = async () => {
    setEditLoading(true);
    await submitEditTeknisiForm();
    setShowEditModal(false);
    setEditLoading(false);
  };

  return (
    <div className="py-6">
      <ModalElement
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
      >
        {isAdmin ? (
          <FormEditPanel
            teamLeadUser={teamLeadUser}
            masterFitlerOptions={masterFitlerOptions}
            formOnChange={formEditOnChange}
            formUserTeknisi={formEditUserTeknisi}
            onLoading={editLoading}
            onCancel={() => setShowEditModal(false)}
            onSubmit={submitEditForm}
          />
        ) : (
          <EditConfirmation
            teknisiName={formEditUserTeknisi.name}
            teknisiStatus={formEditUserTeknisi.isActive}
            isLoading={editLoading}
            handleClose={() => setShowEditModal(false)}
            handleSubmit={submitEditForm}
          />
        )}
      </ModalElement>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">NIK</TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">ID Telegram</TableCell>
              <TableCell align="center">Partner</TableCell>
              <TableCell align="center">Regional</TableCell>
              <TableCell align="center">Sector</TableCell>
              <TableCell align="center">Witel</TableCell>
              <TableCell align="center">Status</TableCell>
              {isAdmin && <TableCell align="center">Team Lead</TableCell>}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.nik}</TableCell>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.idTelegram}</TableCell>
                <TableCell align="center">{data.partner.name}</TableCell>
                <TableCell align="center">{data.regional.name}</TableCell>
                <TableCell align="center">{data.sector.name}</TableCell>
                <TableCell align="center">{data.witel.name}</TableCell>
                <TableCell align="center">
                  <p
                    className={`${
                      data.isActive === 1 ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {data.isActive === 1 ? "Active" : "Tidak Active"}
                  </p>
                </TableCell>
                {isAdmin && (
                  <TableCell align="center">{data.user.name}</TableCell>
                )}
                <TableCell align="center">
                  <div className="flex justify-around items-center">
                    <div
                      onClick={() => handleModalEditUser(data)}
                      className="cursor-pointer"
                    >
                      <Tooltip title="Edit">
                        <EditIcon color="action" />
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <div className="w-full">
          <LinearProgress />
        </div>
      )}
      {!isLoading && (
        <div className="w-full flex justify-end items-end py-6">
          <PaginationPage
            pagination={data.metadata.pagination}
            activePage={data.metadata.page}
          />
        </div>
      )}
    </div>
  );
};

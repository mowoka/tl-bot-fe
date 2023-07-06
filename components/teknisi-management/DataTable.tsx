import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Tooltip,
} from "@mui/material";
import {
  // UserTeknisi,
  UserTeknisiResponse,
} from "../../hooks/teknisi-management/useTeknisiUser";
import LinearProgress from "@mui/material/LinearProgress";
import { PaginationPage } from "../common/PaginationPage";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { ModalElement } from "../common/Modal";
// import { DeleteConfirmation } from "./DeleteConfirmation";
// import { useState } from "react";

interface DataTableProps {
  data: UserTeknisiResponse;
  isLoading: boolean;
  isAdmin: boolean;
  deleteTeknisiUser: (teknisiUserId: number) => void;
}

export const DataTable = (props: DataTableProps) => {
  const { data, isLoading, isAdmin } = props;

  // const [userTeknisi, setUserTeknisi] = useState<UserTeknisi>();
  // const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // const handleModalDeleteUser = (user: UserTeknisi) => {
  //   setUserTeknisi(user);
  //   setShowDeleteModal(true);
  // };

  // const handleDeleteTeknisiUser = async () => {
  //   if (userTeknisi === undefined) return;
  //   setDeleteLoading(true);
  //   await deleteTeknisiUser(userTeknisi.id);
  //   setShowDeleteModal(false);
  //   setDeleteLoading(false);
  // };

  return (
    <div className="py-6">
      {/* <ModalElement
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
      >
        <DeleteConfirmation
          userTeknisi={userTeknisi}
          handleClose={() => setShowDeleteModal(false)}
          handleDeleteTeknisiUser={handleDeleteTeknisiUser}
          deleteLoading={deleteLoading}
        />
      </ModalElement> */}
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
              {isAdmin && <TableCell align="center">Team Lead</TableCell>}
              {isAdmin && <TableCell align="center">Action</TableCell>}
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
                {isAdmin && (
                  <TableCell align="center">{data.user.name}</TableCell>
                )}
                {/* {isAdmin && (
                  <TableCell align="center">
                    <div className="flex justify-around items-center">
                      <div
                        onClick={() => handleModalDeleteUser(data)}
                        className="cursor-pointer"
                      >
                        <Tooltip title="Delete">
                          <DeleteIcon color="error" />
                        </Tooltip>
                      </div>
                      Todo : Not Majority but nice to have if we can edit this user
                      <div className="cursor-pointer">
                        <Tooltip title="Edit">
                          <EditIcon color="action" />
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                )} */}
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

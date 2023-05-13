import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { PaginationPage } from "../common/PaginationPage";
import { TeamLeadUserResponse } from "@app/hooks/team-lead-management/useTeamLeadManagement";

interface DataTableProps {
  data: TeamLeadUserResponse;
  isLoading: boolean;
}

export const DataTable = (props: DataTableProps) => {
  const { data, isLoading } = props;
  return (
    <div className="py-6">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">NIK</TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">Partner</TableCell>
              <TableCell align="center">Regional</TableCell>
              <TableCell align="center">Sector</TableCell>
              <TableCell align="center">Witel</TableCell>
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
                <TableCell align="center">{data.partner.name}</TableCell>
                <TableCell align="center">{data.regional.name}</TableCell>
                <TableCell align="center">{data.sector.name}</TableCell>
                <TableCell align="center">{data.witel.name}</TableCell>
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

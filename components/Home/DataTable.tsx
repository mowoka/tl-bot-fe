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

import LinearProgress from "@mui/material/LinearProgress";
import { UserReportData } from "../../hooks/home/useHome";
import { PaginationPage } from "../common/PaginationPage";

interface DataTableProps {
  data: UserReportData;
  isLoading: boolean;
  handleOpenTiketHistory: (title: string, nik: string) => void;
}

export const DataTable = (props: DataTableProps) => {
  const { isLoading, data, handleOpenTiketHistory } = props;

  return (
    <div className="py-6">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">NIK</TableCell>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">
                <Tooltip title="Tiket Reguler">
                  <p>T1</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Lapor Langusng">
                  <p>T2</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Tiket SQM">
                  <p>T3</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Proman">
                  <p>T4</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Tutup ODP">
                  <p>T5</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Valins">
                  <p>T6</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Tiket Unspect">
                  <p>T7</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Gamas Type a">
                  <p>T8</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Gamas Type b">
                  <p>T9</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Gamas Type C">
                  <p>T10</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Survey">
                  <p>T11</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Tiket Redundant">
                  <p>T12</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Rata rata">
                  <p>KPI</p>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.nik}</TableCell>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.ticket_regular.name, data.nik)
                  }
                >
                  {data.ticket_regular.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.lapor_langsung.name, data.nik)
                  }
                >
                  {data.lapor_langsung.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.ticket_sqm.name, data.nik)
                  }
                >
                  {data.ticket_sqm.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.proman.name, data.nik)
                  }
                >
                  {data.proman.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.tutup_odp.name, data.nik)
                  }
                >
                  {data.tutup_odp.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.valins.name, data.nik)
                  }
                >
                  {data.valins.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.unspect.name, data.nik)
                  }
                >
                  {data.unspect.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.gamas_type_a.name, data.nik)
                  }
                >
                  {data.gamas_type_a.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.gamas_type_b.name, data.nik)
                  }
                >
                  {data.gamas_type_b.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.gamas_type_c.name, data.nik)
                  }
                >
                  {data.gamas_type_c.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.survey.name, data.nik)
                  }
                >
                  {data.survey.score}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenTiketHistory(data.ticket_redundant.name, data.nik)
                  }
                >
                  {data.ticket_redundant.score > 0 ? "-" : ""}{" "}
                  {data.ticket_redundant.score}
                </TableCell>
                <TableCell align="center">{data.kpi.toFixed(2)}</TableCell>
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
        <div className="w-full py-6 flex justify-end items-end">
          <PaginationPage
            pagination={data.metadata?.pagination}
            activePage={data.metadata?.page}
          />
        </div>
      )}
    </div>
  );
};

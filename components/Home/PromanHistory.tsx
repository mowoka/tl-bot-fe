import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableHistory } from "./DataTableHistory";
import { MetaData, Proman } from "../../hooks/home/useHome";
import { dateFomatting } from "../../core/utility/dateFormatting";
import { PaginationPage } from "../common/PaginationPage";

interface PromanHistory extends TableHistory {
  datas: Proman[];
  metadata: MetaData;
}

export function PromanHistory(props: PromanHistory) {
  const { isLoading, datas, metadata } = props;
  return (
    <div className="bg-secondary w-full max-w-[1200px] min-h-[400px] border-none outline-none rounded-lg p-6">
      <p className="text-xl uppercase font-semibold">Proman</p>
      <div className="py-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Nama ODP</TableCell>
                <TableCell align="left">Distribusi</TableCell>
                <TableCell align="left">Kapasitas Port</TableCell>
                <TableCell align="left">Status Port Digunakan</TableCell>
                <TableCell align="left">Status Port Tersedia</TableCell>
                <TableCell align="left">ODP gendong</TableCell>
                <TableCell align="left">panjang Opm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                datas?.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" style={{ minWidth: 120 }}>
                      {dateFomatting(data.createAt.toString())}
                    </TableCell>
                    <TableCell align="left">{data.odp_name}</TableCell>
                    <TableCell align="left">{data.distribusi}</TableCell>
                    <TableCell align="left">{data.capacity_port}</TableCell>
                    <TableCell align="left">{data.status_port_use}</TableCell>
                    <TableCell align="left">
                      {data.status_port_available}
                    </TableCell>
                    <TableCell align="left">{data.odp_cradle}</TableCell>
                    <TableCell align="left">{data.opm_length}</TableCell>
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
      </div>
      {!isLoading && (
        <div className="w-full flex justify-end items-end">
          <PaginationPage
            pagination={metadata?.pagination}
            activePage={metadata?.page}
          />
        </div>
      )}
    </div>
  );
}

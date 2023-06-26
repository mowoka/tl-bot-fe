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
import { MetaData } from "../../hooks/home/useHome";
import { dateFomatting } from "../../core/utility/dateFormatting";
import { PaginationPage } from "../common/PaginationPage";
import { TicketInfra } from "@app/hooks/home/getTeknisiHistoryFetcher";

interface InfrakProps extends TableHistory {
  datas: TicketInfra[];
  metadata: MetaData;
}

export function InfraHistory(props: InfrakProps) {
  const { isLoading, datas, metadata } = props;
  return (
    <div className="bg-secondary w-full max-w-[1200px] min-h-[400px] border-none outline-none rounded-lg p-6">
      <p className="text-xl uppercase font-semibold">Tiket Infra</p>
      <div className="py-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Insiden Number</TableCell>
                <TableCell align="left">Keterangan</TableCell>
                <TableCell align="left">Tanggal</TableCell>
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
                      {data.insiden_number}
                    </TableCell>
                    <TableCell align="left">{data.description}</TableCell>
                    <TableCell align="left">
                      {dateFomatting(data.date)}
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

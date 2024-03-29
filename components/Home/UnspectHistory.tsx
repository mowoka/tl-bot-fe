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
import { Unspect } from "@app/hooks/home/getTeknisiHistoryFetcher";

interface UnspectHistory extends TableHistory {
  datas: Unspect[];
  metadata: MetaData;
}

export function UnspectHistory(props: UnspectHistory) {
  const { isLoading, datas, metadata } = props;
  return (
    <div className="bg-secondary w-full max-w-[1200px] min-h-[400px] border-none outline-none rounded-lg p-6">
      <p className="text-xl uppercase font-semibold">Unspect</p>
      <div className="py-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Speedy Number</TableCell>
                <TableCell align="left">ODP</TableCell>
                <TableCell align="left">Problem</TableCell>
                <TableCell align="left">Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                datas?.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {dateFomatting(data.createAt.toString())}
                    </TableCell>
                    <TableCell align="left">{data.speedy_number}</TableCell>
                    <TableCell align="left">{data.odp}</TableCell>
                    <TableCell align="left">{data.problem}</TableCell>
                    <TableCell align="left">{data.description}</TableCell>
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

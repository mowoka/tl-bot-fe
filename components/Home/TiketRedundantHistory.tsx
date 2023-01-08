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

interface TiketRedundant extends TableHistory {}

export function TiketRedundantHistory(props: TiketRedundant) {
  const { isLoading } = props;
  return (
    <div className="bg-secondary w-full max-w-[1200px] min-h-[400px] border-none outline-none rounded-lg p-6">
      <p className="text-xl uppercase font-semibold">Tiket Redundant</p>
      <div className="py-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Insiden Number</TableCell>
                <TableCell align="left">Speedy Number</TableCell>
                <TableCell align="left">Customer Name</TableCell>
                <TableCell align="left">Customer Number</TableCell>
                <TableCell align="left">Problem</TableCell>
                <TableCell align="left">Keterangan</TableCell>
                <TableCell align="left">Minus Point</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {DataDummy.map((data, index) => (
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
                    handleOpenTiketHistory(
                      data.ticket_regular.name,
                      data.nik
                    )
                  }
                >
                  {data.ticket_regular.score}
                </TableCell>
                <TableCell align="center">
                  {data.lapor_langsung.score}
                </TableCell>
                <TableCell align="center">
                  {data.ticket_sqm.score}
                </TableCell>
                <TableCell align="center">{data.proman.score}</TableCell>
                <TableCell align="center">{data.tutup_odp.score}</TableCell>
                <TableCell align="center">{data.valins.score}</TableCell>
                <TableCell align="center">{data.unspect.score}</TableCell>
                <TableCell align="center">
                  {data.gamas_type_a.score}
                </TableCell>
                <TableCell align="center">
                  {data.gamas_type_b.score}
                </TableCell>
                <TableCell align="center">
                  {data.gamas_type_c.score}
                </TableCell>
                <TableCell align="center">{data.survey.score}</TableCell>
                <TableCell align="center">
                  {data.ticket_redundant.score > 0 ? "-" : ""}{" "}
                  {data.ticket_redundant.score}
                </TableCell>
                <TableCell align="center">{data.kpi.toFixed(2)}</TableCell>
              </TableRow>
            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && (
          <div className="w-full">
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
}

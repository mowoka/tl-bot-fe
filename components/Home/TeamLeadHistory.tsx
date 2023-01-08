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
import { MetaData, TiketTeamLead } from "../../hooks/home/useHome";
import { dateFomatting } from "../../core/utility/dateFormatting";
import { PaginationPage } from "../common/PaginationPage";

interface TeamLeadHistoryProps extends TableHistory {
  title: string;
  datas: TiketTeamLead[];
  metadata: MetaData;
}

export function TeamLeadHistory(props: TeamLeadHistoryProps) {
  const _renderTitle = (title: string): string => {
    if (title === "gamas_type_a") return "Gamas Type A";
    if (title === "gamas_type_b") return "Gamas Type B";
    if (title === "gamas_type_c") return "Gamas Type C";
    return "Survey";
  };

  return (
    <div className="bg-secondary w-full max-w-[1200px] min-h-[400px] border-none outline-none rounded-lg p-6">
      <p className="text-xl uppercase font-semibold">
        {_renderTitle(props.title)}
      </p>
      <div className="py-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!props.isLoading &&
                props.datas?.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {dateFomatting(data.createAt.toString())}
                    </TableCell>
                    <TableCell align="left">{data.description}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {props.isLoading && (
          <div className="w-full">
            <LinearProgress />
          </div>
        )}
      </div>
      {!props.isLoading && (
        <div className="w-full flex justify-end items-end">
          <PaginationPage
            pagination={props.metadata?.pagination}
            activePage={props.metadata?.page}
          />
        </div>
      )}
    </div>
  );
}

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
import { PaginationPage } from "../common/PaginationPage";
import { UserReportData } from "@app/hooks/home/getUserTeknisiReportFetcher";

interface DataTableProps {
  data: UserReportData;
  isLoading: boolean;
  handleOpenTiketHistory: (title: string, nik: string) => void;
}

export const DataTable = (props: DataTableProps) => {
  const { isLoading, data, handleOpenTiketHistory } = props;
  const reportData = data?.data;
  const reportMetadata = data?.metadata;
  return (
    <div className="py-6 w-[100%]">
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  position: "sticky",
                  left: 0,
                  background: "white",
                  zIndex: 800,
                }}
                className="min-w-[150px] font-bold"
                align="center"
              >
                Nama
              </TableCell>
              <TableCell
                style={{
                  position: "sticky",
                  left: 150,
                  background: "white",
                  zIndex: 800,
                }}
                className="min-w-[150px] font-bold"
                align="center"
              >
                <Tooltip title="KPI">
                  <p>KPI</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Tiket Reguler">
                  <p>Reguler</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Lapor Langusng">
                  <p>Lapor Langsung</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="SQM">
                  <p>SQM</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Proman">
                  <p>Proman</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Tutup ODP">
                  <p>Tutup ODP</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Valins">
                  <p>Valins</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Unspect">
                  <p>Unspect</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Kendala SQM">
                  <p>Kendala SQM</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Bantek">
                  <p>Bantek</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Infra">
                  <p>Infra</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="US">
                  <p>US</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Gamas Type a">
                  <p>Gamas Type A</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Gamas Type b">
                  <p>Gamas Type B</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Gamas Type C">
                  <p>Gamas Type C</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Survey">
                  <p>Survey</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Gaul Reguler">
                  <p>Gaul Reguler</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Gaul SQM">
                  <p>Gaul SQM</p>
                </Tooltip>
              </TableCell>
              <TableCell className="min-w-[150px] font-bold" align="center">
                <Tooltip title="Gaul US">
                  <p>Gaul US</p>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((item, index) => (
              <TableRow
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <TableCell
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } cursor-pointer`}
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 800,
                  }}
                  align="center"
                >
                  {item.name}
                </TableCell>
                <TableCell
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } cursor-pointer`}
                  style={{
                    position: "sticky",
                    left: 150,
                    zIndex: 800,
                  }}
                  align="center"
                >
                  {item.kpi.toFixed(2)}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_regular.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_regular.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(
                      item.ticket_lapor_langsung.name,
                      item.nik
                    )
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_lapor_langsung.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_sqm.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_sqm.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_proman.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_proman.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_tutup_odp.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_tutup_odp.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_valins.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_valins.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_unspect.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_unspect.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(
                      item.ticket_kendala_sqm.name,
                      item.nik
                    )
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_kendala_sqm.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_bantek.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_bantek.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_infra.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_infra.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_us.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_us.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.gamas_type_a.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.gamas_type_a.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.gamas_type_b.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.gamas_type_b.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.gamas_type_c.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.gamas_type_c.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.survey.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.survey.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(
                      item.ticket_gaul_reguler.name,
                      item.nik
                    )
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_gaul_reguler.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_gaul_sqm.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_gaul_sqm.score}
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleOpenTiketHistory(item.ticket_gaul_us.name, item.nik)
                  }
                  className="cursor-pointer"
                  align="center"
                >
                  {item.ticket_gaul_us.score}
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
        <div className="w-full py-6 flex justify-end items-end">
          <PaginationPage
            pagination={reportMetadata.pagination}
            activePage={reportMetadata.page}
          />
        </div>
      )}
    </div>
  );
};

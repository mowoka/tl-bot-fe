import { Partner } from "@app/hooks/options/getPartnerFetcher";
import { Regional } from "@app/hooks/options/getRegionalFetcher";
import { Sector } from "@app/hooks/options/getSectorFetcher";
import { Witel } from "@app/hooks/options/getWitelFetcher";
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
import { EButton, OButton } from "../common/CButton";
import React, { useState } from "react";
import Input from "../common/Input";

interface OptionsTableDataProps {
  title: string;
  isLoading: boolean;
  sector: Sector[];
  witel: Witel[];
  partner: Partner[];
  regional: Regional[];
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

export default function OptionsTableData(props: OptionsTableDataProps) {
  const { title, isLoading, name, handleOnChange, submit } = props;
  const [showForm, setShowForm] = useState(false);
  if (!title) return <div />;

  const handleRenderData = (title: string) => {
    if (title === "sector") return RenderDataSetor(props.sector);
    if (title === "partner") return RenderDataPartner(props.partner);
    if (title === "witel") return RenderDataWitel(props.witel);
    if (title === "regional") return RenderDataRegional(props.regional);
    return <div />;
  };

  return (
    <div className="py-8">
      <h3 className="font-semibold text-xl mb-4">Configure {title}</h3>
      {!showForm && (
        <div className="py-3 w-full max-w-[150px]">
          <OButton text={`Add ${title}`} onClick={() => setShowForm(true)} />
        </div>
      )}
      {showForm && (
        <div className="max-w-[600px] flex items-center justify-start">
          <Input
            type="text"
            label={`Input ${title} name`}
            value={name}
            placeholder={`Input ${title} name`}
            onChange={(e) => handleOnChange(e)}
          />
          <div className="px-4">
            <OButton onClick={submit} text="Add" />
          </div>
          <div className="">
            <EButton onClick={() => setShowForm(false)} text="Cancel" />
          </div>
        </div>
      )}
      <div className="py-6 w-[600px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nama</TableCell>
                <TableCell align="center">{title} Code</TableCell>
              </TableRow>
            </TableHead>
            {!isLoading && handleRenderData(title.toLowerCase())}
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

function RenderDataSetor(sectors: Sector[]) {
  return (
    <>
      {sectors.map((item, index) => (
        <TableBody key={index}>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.sector_code}</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </>
  );
}

function RenderDataPartner(partners: Partner[]) {
  return (
    <>
      {partners.map((item, index) => (
        <TableBody key={index}>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.partner_code}</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </>
  );
}

function RenderDataWitel(witels: Witel[]) {
  return (
    <>
      {witels.map((item, index) => (
        <TableBody key={index}>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.witel_code}</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </>
  );
}
function RenderDataRegional(regionals: Regional[]) {
  return (
    <>
      {regionals.map((item, index) => (
        <TableBody key={index}>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.regional_code}</TableCell>
          </TableRow>
        </TableBody>
      ))}
    </>
  );
}

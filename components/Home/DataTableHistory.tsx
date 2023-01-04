import { HistoryTable } from "../../hooks/home/useHome";
import { LaporLangsungHistory } from "./LaporLangsungHistory";
import { PromanHistory } from "./PromanHistory";
import { SQMHistory } from "./SQMHistory";
import { TeamLeadHistory } from "./TeamLeadHistory";
import { TiketRedundantHistory } from "./TiketRedundantHistory";
import { TiketRegulerHistory } from "./TiketRegulerHistory";
import { TutupOdpHistory } from "./TutupOdpHistory";
import { UnspectHistory } from "./UnspectHistory";
import { ValinsHistory } from "./ValinsHistory";

interface DataTableHistoryProps {
  historyTable: HistoryTable;
}

export const DataTableHistory = (props: DataTableHistoryProps) => {
  const { historyTable } = props;

  switch (historyTable.title) {
    case "tiket_reguler":
      return <TiketRegulerHistory />;
    case "lapor_langsung":
      return <LaporLangsungHistory />;
    case "ticket_sqm":
      return <SQMHistory />;
    case "proman":
      return <PromanHistory />;
    case "tutup_odp":
      return <TutupOdpHistory />;
    case "valins":
      return <ValinsHistory />;
    case "unspect":
      return <UnspectHistory />;
    case "ticket_redundant":
      return <TiketRedundantHistory />;
    default:
      return <TeamLeadHistory title={historyTable.title} />;
  }
};

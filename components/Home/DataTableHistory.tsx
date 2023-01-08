import {
  HistoryTable,
  MetaData,
  ResponseUserTeknisiHistory,
  TiketReguler,
} from "../../hooks/home/useHome";
import { LaporLangsungHistory } from "./LaporLangsungHistory";
import { PromanHistory } from "./PromanHistory";
import { SQMHistory } from "./SQMHistory";
import { TeamLeadHistory } from "./TeamLeadHistory";
import { TiketRedundantHistory } from "./TiketRedundantHistory";
import { TiketRegulerHistory } from "./TiketRegulerHistory";
import { TutupOdpHistory } from "./TutupOdpHistory";
import { UnspectHistory } from "./UnspectHistory";
import { ValinsHistory } from "./ValinsHistory";

export interface TableHistory {
  isLoading: boolean;
}

interface DataTableHistoryProps {
  historyTable: HistoryTable;
  isLoading: boolean;
  historyData: undefined | ResponseUserTeknisiHistory;
}

export const DataTableHistory = (props: DataTableHistoryProps) => {
  const { historyTable, isLoading, historyData } = props;

  switch (historyTable.title) {
    case "tiket_reguler":
      return (
        <TiketRegulerHistory
          isLoading={isLoading}
          datas={historyData?.history as TiketReguler[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "lapor_langsung":
      return <LaporLangsungHistory isLoading={isLoading} />;
    case "ticket_sqm":
      return <SQMHistory isLoading={isLoading} />;
    case "proman":
      return <PromanHistory isLoading={isLoading} />;
    case "tutup_odp":
      return <TutupOdpHistory isLoading={isLoading} />;
    case "valins":
      return <ValinsHistory isLoading={isLoading} />;
    case "unspect":
      return <UnspectHistory isLoading={isLoading} />;
    case "ticket_redundant":
      return <TiketRedundantHistory isLoading={isLoading} />;
    default:
      return (
        <TeamLeadHistory title={historyTable.title} isLoading={isLoading} />
      );
  }
};

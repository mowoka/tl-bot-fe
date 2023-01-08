import {
  HistoryTable,
  LaporLangsung,
  MetaData,
  Proman,
  ResponseUserTeknisiHistory,
  SQM,
  TiketRedundant,
  TiketReguler,
  TiketTeamLead,
  TutupOdp,
  Unspect,
  Valins,
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
      return (
        <LaporLangsungHistory
          isLoading={isLoading}
          datas={historyData?.history as LaporLangsung[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "ticket_sqm":
      return (
        <SQMHistory
          isLoading={isLoading}
          datas={historyData?.history as SQM[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "proman":
      return (
        <PromanHistory
          isLoading={isLoading}
          datas={historyData?.history as Proman[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tutup_odp":
      return (
        <TutupOdpHistory
          isLoading={isLoading}
          datas={historyData?.history as TutupOdp[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "valins":
      return (
        <ValinsHistory
          isLoading={isLoading}
          datas={historyData?.history as Valins[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "unspect":
      return (
        <UnspectHistory
          isLoading={isLoading}
          datas={historyData?.history as Unspect[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "ticket_redundant":
      return (
        <TiketRedundantHistory
          isLoading={isLoading}
          datas={historyData?.history as TiketRedundant[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    default:
      return (
        <TeamLeadHistory
          title={historyTable.title}
          isLoading={isLoading}
          datas={historyData?.history as TiketTeamLead[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
  }
};

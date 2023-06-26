import {
  KendalaSQM,
  LaporLangsung,
  Proman,
  ResponseUserTeknisiHistory,
  SQM,
  TicketBantek,
  TicketGaulReguler,
  TicketGaulSqm,
  TicketGaulUs,
  TicketInfra,
  TicketReguler,
  TicketUS,
  TiketTeamLead,
  TutupOdp,
  Unspect,
  Valins,
} from "@app/hooks/home/getTeknisiHistoryFetcher";
import { HistoryTable, MetaData } from "../../hooks/home/useHome";
import { LaporLangsungHistory } from "./LaporLangsungHistory";
import { PromanHistory } from "./PromanHistory";
import { SQMHistory } from "./SQMHistory";
import { TeamLeadHistory } from "./TeamLeadHistory";
import { TiketRegulerHistory } from "./TiketRegulerHistory";
import { TutupOdpHistory } from "./TutupOdpHistory";
import { UnspectHistory } from "./UnspectHistory";
import { ValinsHistory } from "./ValinsHistory";
import { KendalaSQMHistory } from "./KendalaSQMHistory";
import { BantekHistory } from "./BantekHistory";
import { InfraHistory } from "./InfraHistory";
import { USHistory } from "./UsHistory";
import { TiketGaulRegulerHistory } from "./TiketGaulRegulerHistory";
import { GaulSQMHistory } from "./GaulSQMHistory";
import { GaulUSHistory } from "./GaulUsHistory";

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
    case "tiketreguler":
      return (
        <TiketRegulerHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketReguler[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "laporlangsung":
      return (
        <LaporLangsungHistory
          isLoading={isLoading}
          datas={historyData?.history as LaporLangsung[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketsqm":
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
    case "tutupodp":
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
    case "tiketkendalasqm":
      return (
        <KendalaSQMHistory
          isLoading={isLoading}
          datas={historyData?.history as KendalaSQM[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketbantek":
      return (
        <BantekHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketBantek[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketinfra":
      return (
        <InfraHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketInfra[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketus":
      return (
        <USHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketUS[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketgaulreguler":
      return (
        <TiketGaulRegulerHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketGaulReguler[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketgaulsqm":
      return (
        <GaulSQMHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketGaulSqm[]}
          metadata={historyData?.metadata as MetaData}
        />
      );
    case "tiketgaulus":
      return (
        <GaulUSHistory
          isLoading={isLoading}
          datas={historyData?.history as TicketGaulUs[]}
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

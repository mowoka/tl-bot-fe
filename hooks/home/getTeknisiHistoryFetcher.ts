import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { HistoryTable, MetaData } from "./useHome";

export async function getTeknisiHistoryFetcher(
    { url, params, token }: { url: string, params: HistoryTable, token: string }
) {
    if (!token) return;
    const URLParams = { user_id: params.user_id.toString(), job_title: params.title, page: params.page }
    const res = await ApiFetchRaw<ResponseUserTeknisiHistory>(url + '?' + new URLSearchParams(URLParams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode === 200) return res.body.data;


    return {
        history: [],
        metadata: {
            total: 0,
            page: 1,
            pagination: 1,
        }
    }
}

export interface ResponseUserTeknisiHistory {
    history: LaporLangsung[] |
    TutupOdp[] |
    TicketReguler[] |
    SQM[] |
    Proman[] |
    Unspect[] |
    Valins[] |
    TiketTeamLead[] |
    KendalaSQM[] |
    TicketInfra[] |
    TicketBantek[] |
    TicketUS[] |
    TicketGaulReguler[] |
    TicketGaulSqm[] |
    TicketGaulUs[];
    metadata: MetaData;
}


export interface TiketTeamLead {
    id: number;
    createAt: Date;
    updateAt: Date;
    description: string;
    teknisi_user_id: number;
    team_lead_job_id: number;
}

export interface Valins {
    id: number;
    createAt: Date;
    updateAt: Date;
    valins_id: string;
    odp: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface Unspect {
    id: number;
    createAt: Date;
    updateAt: Date;
    speedy_number: string;
    odp: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface Proman {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    distribusi: string;
    capacity_port: number;
    status_port_use: number;
    status_port_available: number;
    odp_cradle: number;
    opm_length: number;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface SQM {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_number: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface TicketReguler {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_number: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;

}

export interface TutupOdp {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    odp_address: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface LaporLangsung {
    id: number;
    createAt: Date;
    updateAt: Date;
    speedy_number: string;
    customer_phone: string;
    customer_name: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string
}

export type KendalaSQM = SQM

export interface TicketInfra {
    insiden_number: string;
    description: string;
    date: string;
}

export interface TicketBantek {
    ticket_number: string;
    description: string;
    date: string;
    teknisi_bantek: string;
}

export interface TicketUS {
    speedy_number: string;
    odp: string;
    description: string;
    date: string
}

export type TicketGaulReguler = TicketReguler;
export type TicketGaulSqm = SQM;
export type TicketGaulUs = TicketUS;
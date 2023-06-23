import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { MetaData, ParamsUserReport } from "./useHome";

export async function getUserTeknisiReportFetcher(
    { url, params, token }: { url: string, params: ParamsUserReport, token: string }
) {
    const URLparams = { ...params }
    const res = await ApiFetchRaw<UserReportData>(url + '?' + new URLSearchParams(URLparams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode === 200) return res.body.data;

    return {
        data: [],
        metadata: {
            total: 0,
            page: 1,
            pagination: 1,
        }
    }
}

export interface UserReportData {
    data: UserReport[];
    metadata: MetaData,
}


export interface KpiUser {
    name: string,
    score: number,
}

export interface UserReport {
    id: number,
    createAt: Date;
    updateAt: Date;
    nik: string;
    name: string;
    idTelegram: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
    ticket_lapor_langsung: KpiUser;
    ticket_tutup_odp: KpiUser;
    ticket_regular: KpiUser;
    ticket_sqm: KpiUser;
    ticket_proman: KpiUser;
    ticket_unspect: KpiUser;
    ticket_valins: KpiUser;
    ticket_kendala_sqm: KpiUser;
    ticket_bantek: KpiUser;
    ticket_infra: KpiUser;
    ticket_us: KpiUser;
    ticket_gaul_reguler: KpiUser;
    ticket_gaul_sqm: KpiUser;
    ticket_gaul_us: KpiUser;
    gamas_type_a: KpiUser;
    gamas_type_b: KpiUser;
    gamas_type_c: KpiUser;
    survey: KpiUser;
    kpi: number;
}

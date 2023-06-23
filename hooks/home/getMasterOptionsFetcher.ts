import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { MasterFiltersResponse } from "../teknisi-management/useTeknisiUser";

export async function getUserTeknisiFilterMasterOptionsFetcher(
    { url, token }: { url: string, token: string }
) {
    const res = await ApiFetchRaw<MasterFiltersResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode === 200) return res.body.data;

    return {
        partner: [],
        regional: [],
        sector: [],
        witel: [],
    }
}
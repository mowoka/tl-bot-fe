import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { MasterFiltersResponse } from "./useTeknisiUser";

export async function getUserTeknisiFilterMasterOptionsFetcher({ url, token }: { url: string, token: string }) {
    const res = await ApiFetchRaw<MasterFiltersResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    return res.body;
}
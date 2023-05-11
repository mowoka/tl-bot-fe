import { ApiFetchRaw } from "@app/core/clients/apiFetch"
import { LeadJob } from "./useBoard";

export async function getTeamLeadJobFetcher(
    { url, token }:
        {
            url: string,
            token: string,
        }
) {

    const res = await ApiFetchRaw<LeadJob[]>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.body;
}
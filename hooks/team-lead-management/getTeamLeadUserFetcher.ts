import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { TeamLeadParamsProps, TeamLeadUserResponse } from "./useTeamLeadManagement";


export async function getTeamLeadUserFetcher(
    {
        url, params, token,
    }: {
        url: string,
        params: TeamLeadParamsProps,
        token: string,
    }
) {
    const URLParams = { ...params }
    const res = await ApiFetchRaw<TeamLeadUserResponse>(url + new URLSearchParams(URLParams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.body;
}
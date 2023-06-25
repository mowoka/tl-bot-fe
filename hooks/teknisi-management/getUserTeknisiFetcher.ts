import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { ParamsProps, UserTeknisiResponse } from "./useTeknisiUser";


export async function getUserTeknisiFetcher(
    {
        url, params, token, userInformation,
    }: {
        url: string,
        params: ParamsProps,
        token: string,
        userInformation: { role: string, id: number }
    }
) {
    if (!token) return;
    const URLParams = { ...params }
    if (userInformation.role == 'team-lead') {
        URLParams.teknisi_lead_id = userInformation.id.toString();
    }
    const res = await ApiFetchRaw<UserTeknisiResponse>(url + new URLSearchParams(URLParams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.body;
}
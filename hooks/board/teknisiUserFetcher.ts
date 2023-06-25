import { ApiFetchRaw } from "@app/core/clients/apiFetch"
import { UserTeknisiResponse } from "../teknisi-management/useTeknisiUser"

export async function getUserTeknisiFetcher(
    { url, token, userInformation, }:
        {
            url: string,
            token: string,
            userInformation: { role: string, id: number }
        }
) {
    if (!token) return;
    const URLParams = {
        tekni_lead_id: userInformation.id.toString()
    }

    const res = await ApiFetchRaw<UserTeknisiResponse>(url + new URLSearchParams(URLParams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.body;
}
import { ApiFetchRaw } from "@app/core/clients/apiFetch"
import { FilterOptionsProps, UserTeknisiResponse } from "../teknisi-management/useTeknisiUser"

export async function getUserTeknisiFetcher(
    { url, token, userInformation }:
        {
            url: string,
            token: string,
            userInformation: { role: string, id: number }
        }
) {
    if (!token) return;
    const URLParams = {
        teknisi_lead_id: userInformation.id.toString()
    }

    const res = await ApiFetchRaw<UserTeknisiResponse>(url + new URLSearchParams(URLParams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) return [];

    const data = res.body.data.data;

    const teknisiUserOptions: FilterOptionsProps[] = [];

    data.map((teknisi) => {
        teknisiUserOptions.push({ id: teknisi.id, name: teknisi.name })
    })

    return teknisiUserOptions;
}
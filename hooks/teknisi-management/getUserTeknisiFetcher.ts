import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { ParamsProps, UserTeknisiResponse } from "./useTeknisiUser";


export async function getUserTeknisiFetcher({ url, params, token }: { url: string, params: ParamsProps, token: string }) {
    const URLParams = { ...params }
    const res = await ApiFetchRaw<UserTeknisiResponse>(url + new URLSearchParams(URLParams), {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return res.body;
}
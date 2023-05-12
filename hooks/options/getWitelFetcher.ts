import { ApiFetchRaw } from "@app/core/clients/apiFetch";

export interface Witel {
    id: number;
    name: string;
    witel_code: string;
    createAt: Date;
    updateAt: Date;
}

export interface WitelResponse {
    data: Witel[];
}

export async function getWitelFetcher(
    {
        url, token,
    }: {
        url: string,
        token: string,
    }
) {
    const res = await ApiFetchRaw<WitelResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) {
        return [];
    }

    return res.body.data;
}
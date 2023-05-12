import { ApiFetchRaw } from "@app/core/clients/apiFetch";

export interface Regional {
    id: number;
    name: string;
    regional_code: string;
    createAt: Date;
    updateAt: Date;
}

export interface RegionalResponse {
    data: Regional[];
}

export async function getRegionalFetcher(
    {
        url, token,
    }: {
        url: string,
        token: string,
    }
) {
    const res = await ApiFetchRaw<RegionalResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) {
        return [];
    }

    return res.body.data;
}
import { ApiFetchRaw } from "@app/core/clients/apiFetch";

export interface Sector {
    id: number;
    name: string;
    sector_code: string;
    createAt: Date;
    updateAt: Date;
}

export interface SectorResponse {
    data: Sector[];
}

export async function getSectorFetcher(
    {
        url, token,
    }: {
        url: string,
        token: string,
    }
) {
    const res = await ApiFetchRaw<SectorResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) {
        return [];
    }

    return res.body.data;
}
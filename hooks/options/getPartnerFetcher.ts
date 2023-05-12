import { ApiFetchRaw } from "@app/core/clients/apiFetch";

export interface Partner {
    id: number;
    name: string;
    partner_code: string;
    createAt: Date;
    updateAt: Date;
}

export interface PartnerResponse {
    data: Partner[];
}

export async function getPartnerFetcher(
    {
        url, token,
    }: {
        url: string,
        token: string,
    }
) {
    const res = await ApiFetchRaw<PartnerResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) {
        return [];
    }

    return res.body.data;
}
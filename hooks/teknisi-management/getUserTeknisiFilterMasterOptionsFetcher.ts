import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { FilterOptionsProps, MasterFilterOptions, MasterFiltersResponse } from "./useTeknisiUser";

export async function getUserTeknisiFilterMasterOptionsFetcher({ url, token }: { url: string, token: string }) {
    if (!token) return;
    const res = await ApiFetchRaw<MasterFiltersResponse>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) return {
        partner: [],
        regional: [],
        sector: [],
        witel: [],
    }

    const data = res.body.data;

    const tempPartner: FilterOptionsProps[] = []
    const tempSector: FilterOptionsProps[] = []
    const tempRegional: FilterOptionsProps[] = []
    const tempWitel: FilterOptionsProps[] = []

    data.partner.map((p) => {
        tempPartner.push({ id: p.id, name: p.name })
    })
    data.regional.map((p) => {
        tempRegional.push({ id: p.id, name: p.name })
    })
    data.sector.map((p) => {
        tempSector.push({ id: p.id, name: p.name })
    })
    data.witel.map((p) => {
        tempWitel.push({ id: p.id, name: p.name })
    })

    const masterOptionsData: MasterFilterOptions = {
        partner: tempPartner,
        sector: tempSector,
        regional: tempRegional,
        witel: tempWitel,
    }

    return masterOptionsData;
}
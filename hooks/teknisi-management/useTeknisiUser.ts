import { useEffect, useState } from "react";
import { useProfile } from "../common/useProfile";
import { ApiFetchRaw, reqFetchAPI } from "../../core/clients/apiFetch";
import useUser from "../common/useUser";


interface UserTeknisi {
    id: string;
    nik: string;
    name: string;
    idTelegram: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
}

interface FilterOptionsProps {
    key: string;
    value: string;
}

export interface MasterFilterOptions {
    partner: FilterOptionsProps[];
    regional: FilterOptionsProps[];
    sector: FilterOptionsProps[];

}

interface UseTeknisiUserProps {
    data: UserTeknisi[]
    masterFilterOptions: MasterFilterOptions;
}

interface MasterFiltersResponse {
    partner: string[];
    regional: string[];
    sector: string[];
}

const initialMasterFilter: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: []
}

export function useTeknisiUser(): UseTeknisiUserProps {
    const { getProfile } = useProfile();
    const { getToken } = useUser();
    const token = getToken();
    const [data, setData] = useState<UserTeknisi[]>([]);
    const [masterFilterOptions, setMasterFilterOptionsData] = useState<MasterFilterOptions>(initialMasterFilter);


    const getUserTeknisiFilterMaster = async () => {
        console.log(token);
        const res = await ApiFetchRaw<MasterFiltersResponse>(process.env.BASE_URL_API + 'teknisi-user/master-filters', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if (res.body.statusCode === 200) {
            const { data } = res.body
            let tempPartner: FilterOptionsProps[] = []
            let tempSector: FilterOptionsProps[] = []
            let tempRegional: FilterOptionsProps[] = []
            data.partner.map((p) => {
                tempPartner.push({ key: p, value: p })
            })
            data.regional.map((p) => {
                tempRegional.push({ key: p, value: p })
            })
            data.sector.map((p) => {
                tempSector.push({ key: p, value: p })
            })
            const tempData: MasterFilterOptions = {
                partner: tempPartner,
                sector: tempSector,
                regional: tempRegional
            }
            setMasterFilterOptionsData(tempData);
        }
    }


    useEffect(() => {
        getUserTeknisiFilterMaster();
    }, [])


    return {
        data,
        masterFilterOptions
    }
}
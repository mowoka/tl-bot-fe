import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import useUser from "../common/useUser";


export interface UserTeknisi {
    id: string;
    nik: string;
    name: string;
    idTelegram: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
}

interface UserTeknisiResponse {
    teknisi_user: UserTeknisi[]
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

interface MasterFiltersResponse {
    partner: string[];
    regional: string[];
    sector: string[];
}

export interface ParamsProps {
    partner: string;
    regional: string;
    sector: string;
}

interface UseTeknisiUserProps {
    params: ParamsProps;
    data: UserTeknisi[]
    masterFilterOptions: MasterFilterOptions;
    isLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    resetParams: () => void;
}

const initialMasterFilter: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: []
}

export function useTeknisiUser(): UseTeknisiUserProps {
    const { getToken } = useUser();

    const token = getToken();
    const [data, setData] = useState<UserTeknisi[]>([]);
    const [masterFilterOptions, setMasterFilterOptionsData] = useState<MasterFilterOptions>(initialMasterFilter);
    const [params, setParams] = useState<ParamsProps>({
        partner: '',
        regional: '',
        sector: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getUserTeknisiFilterMaster = async () => {
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        if (name === 'partner') {
            setParams((prev) => ({ ...prev, partner: e.target.value }))
        } else if (name === 'regional') {
            setParams((prev) => ({ ...prev, regional: e.target.value }))
        } else {
            setParams((prev) => ({ ...prev, sector: e.target.value }))
        }
    }

    const resetParams = () => {
        setParams({ sector: '', partner: '', regional: '' });
    }

    const getUserTeknisi = async () => {
        setIsLoading(true);
        const URLParams = { ...params }
        const res = await ApiFetchRaw<UserTeknisiResponse>(process.env.BASE_URL_API + 'teknisi-user?' + new URLSearchParams(URLParams), {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (res.body.statusCode === 200) {
            setData(res.body.data.teknisi_user);
            setIsLoading(false);
        } else {
            setData([]);
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getUserTeknisiFilterMaster();
    }, [])

    useEffect(() => {
        getUserTeknisi();
    }, [params])

    return {
        params,
        data,
        masterFilterOptions,
        isLoading,
        onChange,
        resetParams,
    }
}
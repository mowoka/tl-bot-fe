import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import useUser from "../common/useUser";
import { ErrrorMessage } from "../registers/useRegister";
import { userTeknisiFormValidator } from "../../core/utility/validator";
import useSWR from "swr";
import { getUserTeknisiFetcher } from "./getUserTeknisiFetcher";
import { getUserTeknisiFilterMasterOptionsFetcher } from "./getUserTeknisiFilterMasterOptionsFetcher";




interface UseTeknisiUserProps {
    params: ParamsProps;
    data: UserTeknisiResponse;
    masterFilterOptions: MasterFilterOptions;
    isLoading: boolean;
    submitLoading: boolean;
    formUserTeknisi: FormUserTeknisi;
    errorMessage: ErrrorMessage;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    resetParams: () => void;
    onSubmit: () => void;
    onCloseError: () => void;
}

const initialMasterFilter: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: []
}


const initialFormTeknsiUser: FormUserTeknisi = {
    nik: '',
    name: '',
    idTelegram: '',
    partner: '',
    sector: '',
    witel: '',
    regional: '',
}

const intialUserTeknisi: UserTeknisiResponse = {
    data: [],
    metadata: {
        page: 1,
        pagination: 1,
        total: 0,
    }
}

export function useTeknisiUser(): UseTeknisiUserProps {
    const { getToken, getUserInformation } = useUser();
    const [masterFilterOptions, setMasterFilterOptionsData] = useState<MasterFilterOptions>(initialMasterFilter);
    const [params, setParams] = useState<ParamsProps>({
        partner_id: '',
        regional_id: '',
        sector_id: '',
        teknisi_lead_id: '',
    })
    const [formUserTeknisi, setFormUserTeknisi] = useState<FormUserTeknisi>(initialFormTeknsiUser);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
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
        setParams({ sector_id: '', partner_id: '', regional_id: '', teknisi_lead_id: '' });
    }

    const formOnChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        if (name === 'nik') {
            setFormUserTeknisi((prev) => ({ ...prev, nik: e.target.value }))
        } else if (name === 'name') {
            setFormUserTeknisi((prev) => ({ ...prev, name: e.target.value }))
        } else if (name === 'idTelegram') {
            setFormUserTeknisi((prev) => ({ ...prev, idTelegram: e.target.value }))
        } else if (name === 'partner') {
            setFormUserTeknisi((prev) => ({ ...prev, partner: e.target.value }))
        } else if (name === 'sector') {
            setFormUserTeknisi((prev) => ({ ...prev, sector: e.target.value }))
        } else if (name === 'regional') {
            setFormUserTeknisi((prev) => ({ ...prev, regional: e.target.value }))
        } else {
            setFormUserTeknisi((prev) => ({ ...prev, witel: e.target.value }))
        }
    }

    const onSubmit = async () => {
        const { valid, message } = userTeknisiFormValidator(formUserTeknisi);
        if (!valid) {
            setErrorMessage({
                show: true,
                message: message,
                status: "error"
            });
        } else {
            // logic input teknisi 
            setSubmitLoading(true);
            try {
                const data = { ...formUserTeknisi }

                const res = await ApiFetchRaw(process.env.BASE_URL_API + 'teknisi-user', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`
                    },
                    body: JSON.stringify(data),
                })

                if (res.body.statusCode === 200) {
                    setFormUserTeknisi(initialFormTeknsiUser);
                } else {
                    setErrorMessage({
                        show: true,
                        message: res.body.message,
                        status: "error"
                    });
                }
                setSubmitLoading(false)
            } catch (e) {
                console.error(e);
                setSubmitLoading(false)
            }
        }

    }

    const userTeknisiFilterMasterOptions = useSWR({ url: process.env.BASE_URL_API + 'teknisi-user/master-filters?', token: getToken() }, getUserTeknisiFilterMasterOptionsFetcher)

    const userTeknisiData = useSWR({ url: process.env.BASE_URL_API + 'teknisi-user?', params: params, token: getToken(), userInformation: getUserInformation() }, getUserTeknisiFetcher)

    const isLoading = userTeknisiData.isLoading;

    useEffect(() => {
        if (!userTeknisiFilterMasterOptions.data) return;
        const { data } = userTeknisiFilterMasterOptions.data;
        const tempPartner: FilterOptionsProps[] = []
        const tempSector: FilterOptionsProps[] = []
        const tempRegional: FilterOptionsProps[] = []
        data.partner.map((p) => {
            tempPartner.push({ id: p.id, name: p.name })
        })
        data.regional.map((p) => {
            tempRegional.push({ id: p.id, name: p.name })
        })
        data.sector.map((p) => {
            tempSector.push({ id: p.id, name: p.name })
        })
        const tempData: MasterFilterOptions = {
            partner: tempPartner,
            sector: tempSector,
            regional: tempRegional
        }
        setMasterFilterOptionsData(tempData);
    }, [
        userTeknisiFilterMasterOptions.data
    ])

    return {
        params,
        data: userTeknisiData.data?.data ?? intialUserTeknisi,
        masterFilterOptions,
        isLoading: isLoading,
        submitLoading,
        formUserTeknisi,
        errorMessage,
        onChange,
        formOnChange,
        resetParams,
        onSubmit,
        onCloseError
    }
}

export interface TeamLead {
    id: number;
    nik: string;
    name: string;
    role: string;
}

export interface UserTeknisi {
    id: number;
    nik: string;
    name: string;
    idTelegram: string;
    partner: FilterOptionsProps;
    sector: FilterOptionsProps;
    witel: FilterOptionsProps;
    regional: FilterOptionsProps;
    user: TeamLead;
}

export interface FormUserTeknisi {
    nik: string;
    name: string;
    idTelegram: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
}

export interface UserTeknisiResponse {
    data: UserTeknisi[]
    metadata: MetaData;
}

export interface FilterOptionsProps {
    id: number;
    name: string;
}

export interface MetaData {
    total: number;
    page: number;
    pagination: number;
}

export interface MasterFilterOptions {
    partner: FilterOptionsProps[];
    regional: FilterOptionsProps[];
    sector: FilterOptionsProps[];
}


export interface MasterFiltersResponse {
    partner: FilterOptionsProps[];
    regional: FilterOptionsProps[];
    sector: FilterOptionsProps[];
}

export interface ParamsProps {
    partner_id: string;
    regional_id: string;
    sector_id: string;
    teknisi_lead_id: string;
}
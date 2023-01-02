import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import useUser from "../common/useUser";
import { ErrrorMessage } from "../register/useRegister";
import { userTeknisiFormValidator } from "../../core/utility/validator";


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

export interface FormUserTeknisi {
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
    const [formUserTeknisi, setFormUserTeknisi] = useState<FormUserTeknisi>(initialFormTeknsiUser);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }
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
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data),
                })

                if (res.body.statusCode === 200) {
                    getUserTeknisi();
                    getUserTeknisiFilterMaster();
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
            console.log(formUserTeknisi);
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
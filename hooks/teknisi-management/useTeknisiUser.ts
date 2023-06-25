import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import useUser from "../common/useUser";
import { ErrrorMessage } from "../registers/useRegister";
import { userTeknisiFormValidator, validateNikForm } from "../../core/utility/validator";
import useSWR from "swr";
import { getUserTeknisiFetcher } from "./getUserTeknisiFetcher";
import { getUserTeknisiFilterMasterOptionsFetcher } from "./getUserTeknisiFilterMasterOptionsFetcher";




interface UseTeknisiUserProps {
    params: ParamsProps;
    data: UserTeknisiResponse;
    masterFilterOptions: MasterFilterOptions;
    masterFilterOpstionsIsloading: boolean;
    isLoading: boolean;
    submitLoading: boolean;
    formUserTeknisi: FormUserTeknisi;
    errorMessage: ErrrorMessage;
    stepForm: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    resetParams: () => void;
    onSubmit: () => void;
    onResetForm: () => void;
    onCloseError: () => void;
}

const initialMasterFilter: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: [],
    witel: [],
}


const initialFormTeknsiUser: FormUserTeknisi = {
    nik: '',
    name: '',
    idTelegram: '',
    partner_id: '',
    sector_id: '',
    witel_id: '',
    regional_id: '',
    user_id: '',
}

const intialUserTeknisi: UserTeknisiResponse = {
    data: [],
    metadata: {
        page: 1,
        pagination: 1,
        total: 0,
    }
}

export function useTeknisiUser(
    handleClose: () => void,
): UseTeknisiUserProps {
    const { token, userInformation } = useUser();
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
    const [stepForm, setStepForm] = useState<number>(1);

    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        if (name === 'partner') {
            setParams((prev) => ({ ...prev, partner_id: e.target.value }))
        } else if (name === 'regional') {
            setParams((prev) => ({ ...prev, regional_id: e.target.value }))
        } else {
            setParams((prev) => ({ ...prev, sector_id: e.target.value }))
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
            setFormUserTeknisi((prev) => ({ ...prev, partner_id: e.target.value }))
        } else if (name === 'sector') {
            setFormUserTeknisi((prev) => ({ ...prev, sector_id: e.target.value }))
        } else if (name === 'regional') {
            setFormUserTeknisi((prev) => ({ ...prev, regional_id: e.target.value }))
        } else if (name === 'team-lead') {
            setFormUserTeknisi((prev) => ({ ...prev, user_id: e.target.value }))
        }
        else {
            setFormUserTeknisi((prev) => ({ ...prev, witel_id: e.target.value }))
        }
    }

    async function submitTeknisUserForm() {
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
                const data = {
                    ...formUserTeknisi,
                    partner_id: parseInt(formUserTeknisi.partner_id),
                    sector_id: parseInt(formUserTeknisi.sector_id),
                    witel__id: parseInt(formUserTeknisi.witel_id),
                    regional: parseInt(formUserTeknisi.regional_id),
                    user_id: userInformation.role !== 'admin' ? userInformation.id : parseInt(formUserTeknisi.user_id),
                }

                const res = await ApiFetchRaw(process.env.BASE_URL_API + 'teknisi-user', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data),
                })

                if (res.body.statusCode === 201) {
                    setErrorMessage({
                        show: true,
                        message: res.body.message,
                        status: "success"
                    });
                    setStepForm(1);
                    setFormUserTeknisi(initialFormTeknsiUser);
                    userTeknisiData.mutate();
                    handleClose();
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

    async function validateNik() {
        const { valid, message } = validateNikForm(formUserTeknisi.nik);
        if (!valid) {
            setErrorMessage({
                show: true,
                message: message,
                status: "error"
            });
        } else {
            const data = {
                nik: formUserTeknisi.nik
            }

            const res = await ApiFetchRaw(process.env.BASE_URL_API + 'auth/validate/teknisi-user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            if (res.body.statusCode === 201) {
                setErrorMessage({
                    show: true,
                    message: res.body.message,
                    status: "success"
                });
                setStepForm(2);
            } else {
                setErrorMessage({
                    show: true,
                    message: res.body.message,
                    status: "error"
                });
            }
        }
    }

    const onSubmit = async () => {
        if (stepForm == 1) {
            validateNik();
        } else {
            submitTeknisUserForm();
        }
    }

    const onResetForm = () => {
        setStepForm(1);
        setFormUserTeknisi(initialFormTeknsiUser);
        handleClose();
    }

    const userTeknisiFilterMasterOptions = useSWR({ url: process.env.BASE_URL_API + 'teknisi-user/master-filters?', token: token }, getUserTeknisiFilterMasterOptionsFetcher)

    const userTeknisiData = useSWR({ url: process.env.BASE_URL_API + 'teknisi-user?', params: params, token: token, userInformation: userInformation }, getUserTeknisiFetcher)

    const isLoading = userTeknisiData.isLoading;

    useEffect(() => {
        if (!userTeknisiFilterMasterOptions.data?.data) return;
        const { data } = userTeknisiFilterMasterOptions.data;

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
        const tempData: MasterFilterOptions = {
            partner: tempPartner,
            sector: tempSector,
            regional: tempRegional,
            witel: tempWitel,
        }
        setMasterFilterOptionsData(tempData);
    }, [
        userTeknisiFilterMasterOptions.data
    ])

    return {
        params,
        data: userTeknisiData.data?.data ?? intialUserTeknisi,
        masterFilterOptions,
        masterFilterOpstionsIsloading: userTeknisiFilterMasterOptions.isLoading,
        isLoading: isLoading,
        submitLoading,
        formUserTeknisi,
        errorMessage,
        stepForm,
        onChange,
        formOnChange,
        resetParams,
        onSubmit,
        onResetForm,
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
    partner_id: string;
    sector_id: string;
    witel_id: string;
    regional_id: string;
    user_id: string;
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
    witel: FilterOptionsProps[];
}


export interface MasterFiltersResponse {
    partner: FilterOptionsProps[];
    regional: FilterOptionsProps[];
    sector: FilterOptionsProps[];
    witel: FilterOptionsProps[];
}

export interface ParamsProps {
    partner_id: string;
    regional_id: string;
    sector_id: string;
    teknisi_lead_id: string;
}
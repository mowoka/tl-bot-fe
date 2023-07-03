import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import useUser from "../common/useUser";
import { ErrrorMessage } from "../registers/useRegister";
import { userTeknisiFormValidator, validateNikForm } from "../../core/utility/validator";
import useSWR from "swr";
import { getUserTeknisiFetcher } from "./getUserTeknisiFetcher";
import { getUserTeknisiFilterMasterOptionsFetcher } from "./getUserTeknisiFilterMasterOptionsFetcher";
import { useRouter } from "next/router";
import { TeamLeadUser, TeamLeadUserResponse } from "../team-lead-management/useTeamLeadManagement";
import { useProfile } from "../common/useProfile";


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
    teamLeadUser: FilterOptionsProps[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    resetParams: () => void;
    onSubmit: () => void;
    onResetForm: () => void;
    onCloseError: () => void;
}

const initialMasterFilterOptions: MasterFilterOptions = {
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
    const router = useRouter();
    const { token, userInformation } = useUser();
    const { profile } = useProfile();
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
    const [teamLeadUserOptions, setTeamLeadUserOptions] = useState<FilterOptionsProps[]>([]);
    const [teamLeadUser, setTeamLeadUser] = useState<TeamLeadUser[]>([]);
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
            if (userInformation.role !== 'admin') return;

            const teamLead = teamLeadUser.find((item) => item.id === parseInt(e.target.value));
            setFormUserTeknisi((prev) =>
            ({
                ...prev,
                partner_id: teamLead?.partner?.id.toString() ?? '',
                sector_id: teamLead?.sector?.id.toString() ?? '',
                regional_id: teamLead?.regional?.id.toString() ?? '',
                witel_id: teamLead?.witel?.id.toString() ?? '',
            }))

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
                if (userInformation.role !== 'admin') {
                    const options = userTeknisiFilterMasterOptions.data;
                    const partner_id = options?.partner.find((i) => i.name === profile.partner);
                    const sector_id = options?.sector.find((i) => i.name === profile.sector);
                    const regional_id = options?.regional.find((i) => i.name === profile.regional);
                    const witel_id = options?.witel.find((i) => i.name === profile.witel);
                    setFormUserTeknisi((prev) => ({ ...prev, partner_id: partner_id?.id.toString() || '', sector_id: sector_id?.id.toString() || '', regional_id: regional_id?.id.toString() || '', witel_id: witel_id?.id.toString() || '' }));
                } else {
                    await getTeamLeadUser();
                }
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

    async function getTeamLeadUser() {
        const res = await ApiFetchRaw<TeamLeadUserResponse>(process.env.BASE_URL_API + 'team-lead-user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (res.body.statusCode === 200) {
            const data = res.body.data;
            const tempTeamLeadUserOptions: FilterOptionsProps[] = []
            data.data.map((i) => {
                tempTeamLeadUserOptions.push({ id: i.id, name: i.name })
            })
            setTeamLeadUser(res.body.data.data);
            setTeamLeadUserOptions(tempTeamLeadUserOptions);
        } else {
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
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

    const userTeknisiFilterMasterOptions = useSWR(router.isReady &&
    {
        url: process.env.BASE_URL_API + 'teknisi-user/master-filters?',
        token: token
    },
        getUserTeknisiFilterMasterOptionsFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    const userTeknisiData = useSWR(router.isReady &&
    {
        url: process.env.BASE_URL_API + 'teknisi-user?',
        params: params,
        token: token,
        userInformation: userInformation
    },
        getUserTeknisiFetcher,
        {
            revalidateOnFocus: false
        }
    )

    useEffect(() => {
        if (!userTeknisiFilterMasterOptions.error) return
        setErrorMessage({
            show: true,
            message: userTeknisiFilterMasterOptions.error.message,
            status: "error"
        });
    }, [userTeknisiFilterMasterOptions.error])

    useEffect(() => {
        if (!userTeknisiData.error) return
        setErrorMessage({
            show: true,
            message: userTeknisiData.error.message,
            status: "error"
        });
    }, [userTeknisiData.error])


    return {
        params,
        data: userTeknisiData.data?.data ?? intialUserTeknisi,
        masterFilterOptions: userTeknisiFilterMasterOptions.data ?? initialMasterFilterOptions,
        masterFilterOpstionsIsloading: userTeknisiFilterMasterOptions.isLoading,
        isLoading: userTeknisiData.isLoading,
        submitLoading,
        formUserTeknisi,
        errorMessage,
        stepForm,
        teamLeadUser: teamLeadUserOptions,
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
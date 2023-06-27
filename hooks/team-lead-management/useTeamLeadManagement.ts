import { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { FilterOptionsProps, MasterFilterOptions, MetaData } from "../teknisi-management/useTeknisiUser";
import { ErrrorMessage } from "../registers/useRegister";
import { getUserTeknisiFilterMasterOptionsFetcher } from "../teknisi-management/getUserTeknisiFilterMasterOptionsFetcher";
import useSWR from "swr";
import { getTeamLeadUserFetcher } from "./getTeamLeadUserFetcher";
import { ApiFetchRaw } from "@app/core/clients/apiFetch";
import { teamLeadUserFormValidator, validateNikForm } from "@app/core/utility/validator";
import { useRouter } from "next/router";



interface TeamLeadManagement {
    params: TeamLeadParamsProps;
    data: TeamLeadUserResponse;
    masterFilterOptions: MasterFilterOptions;
    masterFilterOptionsLoading: boolean;
    errorMessage: ErrrorMessage;
    isLoading: boolean;
    stepForm: number;
    submitLoading: boolean;
    formTeamLeadUser: FormTeamLeadUser;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    formOnChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    resetParams: () => void;
    onCloseError: () => void;
    onSubmit: () => void;
    onResetForm: () => void;
    setDefaultPassword: () => void;
}

const initialFormTeamLeadUser: FormTeamLeadUser = {
    nik: '',
    name: '',
    partner_id: '',
    sector_id: '',
    witel_id: '',
    regional_id: '',
    password: '',
}

const initialMasterFilterOptions: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: [],
    witel: [],
}

const initialTeamLeadUser: TeamLeadUserResponse = {
    data: [],
    metadata: {
        page: 1,
        pagination: 1,
        total: 0,
    }
}


export function useTeamLeadManagement(
    handleClose: () => void
): TeamLeadManagement {
    const router = useRouter();
    const { token } = useUser();
    const [params, setParams] = useState<TeamLeadParamsProps>({
        partner_id: '',
        regional_id: '',
        sector_id: '',
    })
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const [formTeamLeadUser, setFormTeamLeadUser] = useState<FormTeamLeadUser>(initialFormTeamLeadUser);
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
        setParams({ sector_id: '', partner_id: '', regional_id: '', });
    }

    const setDefaultPassword = () => {
        setFormTeamLeadUser((prev) => ({ ...prev, password: 'YakinMokaz123!' }))
    }

    const formOnChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        if (name === 'nik') {
            setFormTeamLeadUser((prev) => ({ ...prev, nik: e.target.value }))
        } else if (name === 'name') {
            setFormTeamLeadUser((prev) => ({ ...prev, name: e.target.value }))
        } else if (name === 'partner') {
            setFormTeamLeadUser((prev) => ({ ...prev, partner_id: e.target.value }))
        } else if (name === 'sector') {
            setFormTeamLeadUser((prev) => ({ ...prev, sector_id: e.target.value }))
        } else if (name === 'regional') {
            setFormTeamLeadUser((prev) => ({ ...prev, regional_id: e.target.value }))
        } else if (name === 'password') {
            setFormTeamLeadUser((prev) => ({ ...prev, password: e.target.value }))
        } else {
            setFormTeamLeadUser((prev) => ({ ...prev, witel_id: e.target.value }))
        }
    }

    const onResetForm = () => {
        setStepForm(1);
        setFormTeamLeadUser(initialFormTeamLeadUser);
        handleClose();
    }

    async function submitTeamLeadUserForm() {
        const { valid, message } = teamLeadUserFormValidator(formTeamLeadUser);
        if (!valid) {
            setErrorMessage({
                show: true,
                message: message,
                status: "error"
            });
            return;
        }
        if (submitLoading) return;
        setSubmitLoading(true);

        const data = {
            nik: formTeamLeadUser.nik,
            name: formTeamLeadUser.name,
            partner_id: formTeamLeadUser.partner_id,
            sector_id: formTeamLeadUser.sector_id,
            witel_id: formTeamLeadUser.witel_id,
            regional_id: formTeamLeadUser.regional_id,
            password: formTeamLeadUser.password,
        }

        const res = await ApiFetchRaw(process.env.BASE_URL_API + 'team-lead-user', {
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
            setFormTeamLeadUser(initialFormTeamLeadUser);
            handleClose();
            teamLeadUserData.mutate();
        } else {
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
        setSubmitLoading(false);
        return;
    }

    async function validateNik() {
        const { valid, message } = validateNikForm(formTeamLeadUser.nik);
        if (!valid) {
            setErrorMessage({
                show: true,
                message: message,
                status: "error"
            });
        } else {
            const data = {
                nik: formTeamLeadUser.nik
            }

            const res = await ApiFetchRaw(process.env.BASE_URL_API + 'auth/validate/team-lead', {
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

    const onSubmit = () => {
        if (stepForm === 1) {
            validateNik()
        } else {
            submitTeamLeadUserForm();
        }
        return;
    }


    const FilterMasterOptions = useSWR(router.isReady &&
    {
        url: process.env.BASE_URL_API + 'teknisi-user/master-filters?',
        token: token
    },
        getUserTeknisiFilterMasterOptionsFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    const teamLeadUserData = useSWR(router.isReady &&
    {
        url: process.env.BASE_URL_API + 'team-lead-user?',
        params: params,
        token: token
    },
        getTeamLeadUserFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    useEffect(() => {
        if (!FilterMasterOptions.error) return;
        setErrorMessage({
            show: true,
            message: FilterMasterOptions.error.message,
            status: "error"
        });
    }, [FilterMasterOptions.error])

    useEffect(() => {
        if (!teamLeadUserData.error) return;
        setErrorMessage({
            show: true,
            message: teamLeadUserData.error.message,
            status: "error"
        });
    }, [teamLeadUserData.error])




    const isLoading = teamLeadUserData.isLoading;

    return {
        params,
        data: teamLeadUserData.data?.data ?? initialTeamLeadUser,
        masterFilterOptions: FilterMasterOptions.data ?? initialMasterFilterOptions,
        masterFilterOptionsLoading: FilterMasterOptions.isLoading,
        errorMessage,
        isLoading,
        stepForm,
        submitLoading,
        formTeamLeadUser,
        onSubmit,
        formOnChange,
        onChange,
        resetParams,
        onCloseError,
        onResetForm,
        setDefaultPassword
    }
}


export interface TeamLeadParamsProps {
    partner_id: string;
    regional_id: string;
    sector_id: string;
}

export interface TeamLeadUser {
    id: number;
    nik: string;
    name: string;
    role: string;
    partner: FilterOptionsProps;
    sector: FilterOptionsProps;
    witel: FilterOptionsProps;
    regional: FilterOptionsProps;
}

export interface TeamLeadUserResponse {
    data: TeamLeadUser[]
    metadata: MetaData;
}

export interface FormTeamLeadUser {
    nik: string;
    name: string;
    partner_id: string;
    sector_id: string;
    witel_id: string;
    regional_id: string;
    password: string;
}

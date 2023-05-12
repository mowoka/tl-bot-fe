import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch"
import useUser from "../common/useUser";
import { FilterOptionsProps, } from "../teknisi-management/useTeknisiUser";
import { ErrrorMessage } from "../registers/useRegister";
import { formTLBoardValidator } from "../../core/utility/validator";
import useSWR from "swr";
import { getUserTeknisiFetcher } from "./teknisiUserFetcher";
import { getTeamLeadJobFetcher } from "./teamLeadJobFetcher";

export interface LeadJob {
    id: number,
    createAt: string;
    updateAt: string;
    name: string;
    point: number;
}

export interface FormDataProps {
    teknisiUserId: string;
    jobId: string;
    nilai: string;
    keterangan: string;
}

export interface OptionsFormData {
    teknisi: FilterOptionsProps[];
    leadJob: FilterOptionsProps[];
}

interface UseBoardProps {
    optionsData: OptionsFormData;
    formData: FormDataProps;
    isLoading: boolean;
    errorMessage: ErrrorMessage;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => void;
    onSubmit: () => void;
    onCloseError: () => void;
}

const initialOptionsFormData: OptionsFormData = {
    teknisi: [],
    leadJob: []
}

export const useBoard = (): UseBoardProps => {
    const { getToken, getUserInformation } = useUser();
    const [optionsData, setOptionsData] = useState<OptionsFormData>(initialOptionsFormData);
    const [masterJobData, setMasterJobData] = useState<LeadJob[]>([])
    const [formData, setFormData] = useState<FormDataProps>({
        teknisiUserId: '',
        jobId: '',
        nilai: '',
        keterangan: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        if (name === 'teknisi') {
            setFormData((prev) => ({ ...prev, teknisiUserId: e.target.value, }))
        } else if (name === 'job') {
            const findJob = masterJobData.filter((job) => job.id == parseInt(e.target.value));
            setFormData((prev) => ({ ...prev, jobId: e.target.value, nilai: findJob[0].point.toString(), }))
        } else {
            setFormData((prev) => ({ ...prev, keterangan: e.target.value }))
        }
    }


    const onSubmit = async () => {
        const { valid, message } = formTLBoardValidator(formData)
        if (!valid) {
            setErrorMessage({
                show: true,
                message: message,
                status: "error"
            });
        } else {
            setIsLoading(true);
            try {
                const data = {
                    teknisi_user_id: parseInt(formData.teknisiUserId),
                    jobId: parseInt(formData.jobId),
                    keterangan: formData.keterangan
                }

                const res = await ApiFetchRaw(process.env.BASE_URL_API + 'tiket-team-lead', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`
                    },
                    body: JSON.stringify(data),
                })

                if (res.body.statusCode === 201) {
                    setErrorMessage({
                        show: true,
                        message: res.body.message,
                        status: "success"
                    });
                    setFormData({
                        teknisiUserId: '',
                        jobId: '',
                        nilai: '',
                        keterangan: '',
                    })
                } else {
                    setErrorMessage({
                        show: true,
                        message: res.body.message,
                        status: "error"
                    });
                }
                setIsLoading(false)
            } catch (e) {
                console.error(e);
                setIsLoading(false)
            }
        }
    }


    const teknisiUser = useSWR({ url: process.env.BASE_URL_API + 'teknisi-user?', token: getToken(), userInformation: getUserInformation() }, getUserTeknisiFetcher)
    const teamLeadJob = useSWR({ url: process.env.BASE_URL_API + 'team-leader-job', token: getToken(), }, getTeamLeadJobFetcher)

    useEffect(() => {
        if (!teknisiUser.data) return;
        const { data } = teknisiUser.data.data;
        const tempTeknisi: FilterOptionsProps[] = [];
        data.map((teknisi) => {
            tempTeknisi.push({ id: teknisi.id, name: teknisi.name })
        })
        setOptionsData((prev) => ({ ...prev, teknisi: tempTeknisi }))
    }, [teknisiUser.data])

    useEffect(() => {
        if (!teamLeadJob.data) return;
        const { data } = teamLeadJob.data;
        const tempJob: FilterOptionsProps[] = [];
        data.map((job) => {
            tempJob.push({ id: job.id, name: job.name })
        })
        setOptionsData((prev) => ({ ...prev, leadJob: tempJob }))
        setMasterJobData(data);
    }, [teamLeadJob.data])

    return {
        optionsData,
        formData,
        isLoading,
        errorMessage,
        onChange,
        onSubmit,
        onCloseError
    }
}
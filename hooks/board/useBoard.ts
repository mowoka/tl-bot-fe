import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch"
import useUser from "../common/useUser";
import { FilterOptionsProps, UserTeknisi, UserTeknisiResponse } from "../teknisi-management/useTeknisiUser";
import { ErrrorMessage } from "../register/useRegister";
import { formTLBoardValidator } from "../../core/utility/validator";

interface LeadJob {
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    onSubmit: () => void;
    onCloseError: () => void;
}

const initialOptionsFormData: OptionsFormData = {
    teknisi: [],
    leadJob: []
}

export const useBoard = (): UseBoardProps => {
    const { getToken } = useUser();
    const token = getToken();
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


    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
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
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data),
                })

                if (res.body.statusCode === 200) {
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

    const getUserTeknisi = async () => {

        const res = await ApiFetchRaw<UserTeknisiResponse>(process.env.BASE_URL_API + 'teknisi-user', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if (res.body.statusCode === 200) {
            return res.body.data.teknisi_user;
        }
        return []
    }

    const getTeamLeadJob = async () => {
        const res = await ApiFetchRaw<LeadJob[]>(process.env.BASE_URL_API + 'team-leader-job', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if (res.body.statusCode === 200) {
            return res.body.data;
        }
        return []
    }

    const getMasterData = async () => {
        const [userTeknisi, LeadJob] = await Promise.all([
            getUserTeknisi(),
            getTeamLeadJob()
        ])
        let tempTeknisi: FilterOptionsProps[] = [];
        let tempLeadJob: FilterOptionsProps[] = [];
        userTeknisi.map(teknisi => {
            tempTeknisi.push({
                key: `${teknisi.nik} ${teknisi.name}`,
                value: teknisi.id.toString(),
            })
        })
        LeadJob.map((job) => {
            tempLeadJob.push({
                key: `TUGAS TL ${job.name}`,
                value: job.id.toString(),
            })
        })
        const tempData: OptionsFormData = {
            teknisi: tempTeknisi,
            leadJob: tempLeadJob,
        }
        setMasterJobData(LeadJob);
        setOptionsData(tempData);
    }


    useEffect(() => {
        getMasterData();
    }, [])


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
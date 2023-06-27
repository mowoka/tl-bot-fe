import React, { useEffect, useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch"
import useUser from "../common/useUser";
import { FilterOptionsProps, } from "../teknisi-management/useTeknisiUser";
import { ErrrorMessage } from "../registers/useRegister";
import { formTLBoardValidator } from "../../core/utility/validator";
import useSWR from "swr";
import { getUserTeknisiFetcher } from "./teknisiUserFetcher";
import { getTeamLeadJobFetcher } from "./teamLeadJobFetcher";
import { useRouter } from "next/router";

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
export interface LeadJobOptions extends FilterOptionsProps {
    point: number
}



interface UseBoardProps {
    teknisiUserOptions: FilterOptionsProps[];
    teknisiUserOptionsLoading: boolean;
    teamLeadJobOptions: FilterOptionsProps[];
    teamLeadJobOptionsLoading: boolean;
    formData: FormDataProps;
    isLoading: boolean;
    errorMessage: ErrrorMessage;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => void;
    onSubmit: () => void;
    onCloseError: () => void;
}


export const useBoard = (): UseBoardProps => {
    const { token, userInformation } = useUser();
    const router = useRouter();
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
            const findJob = teamLeadJobRes ? teamLeadJobRes.data?.filter((job) => job.id == parseInt(e.target.value)) : [];
            setFormData((prev) => ({ ...prev, jobId: e.target.value, nilai: findJob ? findJob[0].point.toString() : '0', }))
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


    const teknisiUserRes = useSWR(router.isReady && {
        url: process.env.BASE_URL_API + 'teknisi-user?',
        token: token,
        userInformation: userInformation
    },
        getUserTeknisiFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    const teamLeadJobRes = useSWR({
        url: process.env.BASE_URL_API + 'team-leader-job',
        token: token,
    },
        getTeamLeadJobFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    useEffect(() => {
        if (!teknisiUserRes.error) return;
        setErrorMessage({
            show: true,
            message: teknisiUserRes.error.message,
            status: "error"
        });
    }, [teknisiUserRes.error])

    useEffect(() => {
        if (!teamLeadJobRes.error) return;
        setErrorMessage({
            show: true,
            message: teamLeadJobRes.error.message,
            status: "error"
        });
    }, [teamLeadJobRes.error])


    return {
        teknisiUserOptions: teknisiUserRes.data ?? [],
        teknisiUserOptionsLoading: teknisiUserRes.isLoading,
        teamLeadJobOptions: teamLeadJobRes.data ?? [],
        teamLeadJobOptionsLoading: teamLeadJobRes.isLoading,
        formData,
        isLoading,
        errorMessage,
        onChange,
        onSubmit,
        onCloseError
    }
}
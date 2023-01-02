
import { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import { ErrrorMessage } from "../register/useRegister";

interface HomeProps {
    data: UserReport[];
    isLoading: boolean;
    errorMessage: ErrrorMessage;
    onCloseError: () => void;
}

const useHome = (): HomeProps => {
    const { getToken } = useUser();
    const token = getToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserReport[]>([]);

    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }
    const getUserTeknisiReport = async () => {
        setIsLoading(true);
        const res = await ApiFetchRaw<UserReport[]>(process.env.BASE_URL_API + 'teknisi-user/report', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (res.body.statusCode === 200) {
            setData(res.body.data);
            setIsLoading(false);
        } else {
            setData([]);
            setIsLoading(false);
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
    }


    useEffect(() => {
        // getUserTeknisiReport();
    }, [])

    return {
        data,
        isLoading,
        errorMessage,
        onCloseError,
    }

}


export interface KpiUser {
    name: string,
    score: number,
}

export interface UserReport {
    id: number,
    createAt: Date;
    updateAt: Date;
    nik: string;
    name: string;
    idTelegram: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
    lapor_langsung: KpiUser;
    tutup_odp: KpiUser;
    ticket_regular: KpiUser;
    ticket_sqm: KpiUser;
    proman: KpiUser;
    unspect: KpiUser;
    valins: KpiUser;
    ticket_redundant: KpiUser;
    gamas_type_a: KpiUser;
    gamas_type_b: KpiUser;
    gamas_type_c: KpiUser;
    survey: KpiUser;
    kpi: number;
}


export default useHome;

import React, { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import { ErrrorMessage } from "../register/useRegister";
import { FilterOptionsProps, MasterFilterOptions, MasterFiltersResponse, ParamsProps } from "../teknisi-management/useTeknisiUser";
import dayjs from "dayjs";

interface HomeProps {
    data: UserReport[];
    isLoading: boolean;
    errorMessage: ErrrorMessage;
    masterFilterOptions: MasterFilterOptions;
    params: ParamsUserReport;
    onCloseError: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
    onChangeDate: (value: string, name: string) => void;
    resetFilter: () => void;
}



const initialMasterFilter: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: []
}

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth(), 30);

const useHome = (): HomeProps => {
    const { getToken } = useUser();
    const token = getToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserReport[]>([]);
    const [masterFilterOptions, setMasterFilterOptionsData] = useState<MasterFilterOptions>(initialMasterFilter);
    const [params, setParams] = useState<ParamsUserReport>({
        partner: '',
        regional: '',
        sector: '',
        startDate: dayjs(firstDay).format("YYYY-MM-DD").toString(),
        endDate: dayjs(lastDay).format("YYYY-MM-DD").toString(),
    })
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
        } else if (name === 'sector') {
            setParams((prev) => ({ ...prev, sector: e.target.value }))
        }
    }

    const onChangeDate = (value: string, name: string) => {

        const checkIsNegative = (start: number, end: number) => {
            const calculate = end - start
            if (calculate > 0) return false
            return true
        }

        if (name === 'startDate') {
            const start = new Date(value).getTime();
            const end = new Date(params.endDate).getTime();
            const isNegative = checkIsNegative(start, end);
            if (isNegative) {
                setParams((prev) => ({ ...prev, endDate: value, startDate: prev.endDate }))
            } else {
                setParams((prev) => ({ ...prev, startDate: value }))
            }
        } else {
            const start = new Date(params.startDate).getTime();
            const end = new Date(value).getTime();
            const isNegative = checkIsNegative(start, end);
            if (isNegative) {
                setParams((prev) => ({ ...prev, startDate: value, endDate: prev.startDate }))
            } else {

                setParams((prev) => ({ ...prev, endDate: value }))
            }
        }
    }

    const resetFilter = () => {
        setParams({
            partner: '',
            regional: '',
            sector: '',
            startDate: dayjs(firstDay).format("YYYY-MM-DD").toString(),
            endDate: dayjs(lastDay).format("YYYY-MM-DD").toString(),
        })
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

    const getUserTeknisiReport = async () => {
        setIsLoading(true);
        const URLParams = { ...params }
        const res = await ApiFetchRaw<UserReport[]>(process.env.BASE_URL_API + 'teknisi-user/report?' + new URLSearchParams(URLParams), {
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
        getUserTeknisiReport();
    }, [])

    useEffect(() => {
        getUserTeknisiFilterMaster()
    }, [])

    return {
        data,
        isLoading,
        errorMessage,
        masterFilterOptions,
        params,
        onCloseError,
        onChange,
        onChangeDate,
        resetFilter
    }

}

export interface ParamsUserReport extends ParamsProps {
    startDate: string;
    endDate: string;
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
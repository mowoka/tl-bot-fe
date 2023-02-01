
import React, { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import { ErrrorMessage } from "../registers/useRegister";
import { FilterOptionsProps, MasterFilterOptions, MasterFiltersResponse, ParamsProps } from "../teknisi-management/useTeknisiUser";
import dayjs from "dayjs";
import { useModalElement } from "../common/useModalElement";

interface HomeProps {
    data: UserReportData;
    isLoading: boolean;
    errorMessage: ErrrorMessage;
    masterFilterOptions: MasterFilterOptions;
    params: ParamsUserReport;
    open: boolean;
    historyTable: HistoryTable;
    isHistoryLoading: boolean;
    historyData: undefined | ResponseUserTeknisiHistory;
    onCloseError: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
    onChangeDate: (value: string, name: string) => void;
    resetFilter: () => void;
    handleClose: () => void;
    handleOpenTiketHistory: (title: string, nik: string) => void;
}

const initialMasterFilter: MasterFilterOptions = {
    partner: [],
    regional: [],
    sector: []
}

const intialUserReportData: UserReportData = {
    data: [],
    metadata: {
        total: 0,
        page: 1,
        pagination: 1,
    },
}

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth(), 30);

const useHome = (): HomeProps => {
    const { getToken } = useUser();
    const { open, handleClose, handleOpen } = useModalElement();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<UserReportData>(intialUserReportData);
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
    const [historyTable, setHistoryTable] = useState<HistoryTable>({
        title: '',
        nik: '',
        page: '1',
    });
    const [isHistoryLoading, setIsHitoryLoading] = useState<boolean>(false);
    const [historyData, setHistoryData] = useState<ResponseUserTeknisiHistory | undefined>();
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

    const handleOpenTiketHistory = (title: string, nik: string) => {
        setHistoryTable((prev) => ({ ...prev, nik, title }))
        handleOpen();
    }


    async function getUserTeknisiHistory() {
        setIsHitoryLoading(true);
        const URLParams = { nik: historyTable.nik, ticket_title: historyTable.title, page: historyTable.page }
        const res = await ApiFetchRaw<ResponseUserTeknisiHistory>(process.env.BASE_URL_API + 'teknisi-user/history?' + new URLSearchParams(URLParams), {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
        })

        if (res.body.statusCode === 200) {
            setHistoryData(res.body.data);
        } else {
            setHistoryData({
                history: [],
                metadata: {
                    total: 0,
                    pagination: 1,
                    page: 1
                }
            })
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
        setIsHitoryLoading(false);

    }

    async function getUserTeknisiFilterMaster() {
        const res = await ApiFetchRaw<MasterFiltersResponse>(process.env.BASE_URL_API + 'teknisi-user/master-filters', {
            headers: {
                'Authorization': `Bearer ${getToken()}`
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

    async function getUserTeknisiReport() {
        setIsLoading(true);
        const URLParams = { ...params }
        const res = await ApiFetchRaw<UserReportData>(process.env.BASE_URL_API + 'teknisi-user/report?' + new URLSearchParams(URLParams), {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
        })

        if (res.body.statusCode === 200) {
            setData(res.body.data);
        } else {
            setData(intialUserReportData);
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
        setIsLoading(false);
    }



    useEffect(() => {
        getUserTeknisiReport();
    }, [params])

    useEffect(() => {
        getUserTeknisiFilterMaster();
    }, [])

    useEffect(() => {
        if (!historyTable.nik || !historyTable.title) return
        getUserTeknisiHistory();
    }, [historyTable])

    return {
        data,
        isLoading,
        errorMessage,
        masterFilterOptions,
        params,
        open,
        historyTable,
        isHistoryLoading,
        historyData,
        onCloseError,
        onChange,
        onChangeDate,
        resetFilter,
        handleClose,
        handleOpenTiketHistory,

    }
}

export interface ResponseUserTeknisiHistory {
    history: LaporLangsung[] | TutupOdp[] | TiketReguler[] | SQM[] | Proman[] | Unspect[] | Valins[] | TiketRedundant[] | TiketTeamLead[];
    metadata: MetaData;
}

export interface TiketTeamLead {
    id: number;
    createAt: Date;
    updateAt: Date;
    description: string;
    teknisi_user_id: number;
    team_lead_job_id: number;
}

export interface TiketRedundant {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_number: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface Valins {
    id: number;
    createAt: Date;
    updateAt: Date;
    valins_id: string;
    odp: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface Unspect {
    id: number;
    createAt: Date;
    updateAt: Date;
    speedy_number: string;
    odp: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface Proman {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    distribusi: string;
    capacity_port: number;
    status_port_use: number;
    status_port_available: number;
    odp_cradle: number;
    opm_length: number;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface SQM {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_number: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface TiketReguler {
    id: number;
    createAt: Date;
    updateAt: Date;
    insiden_number: string;
    speedy_number: string;
    customer_name: string;
    customer_number: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string;

}

export interface TutupOdp {
    id: number;
    createAt: Date;
    updateAt: Date;
    odp_name: string;
    odp_address: string;
    teknisi_job_id: string;
    idTelegram: string;
}

export interface LaporLangsung {
    id: number;
    createAt: Date;
    updateAt: Date;
    speedy_number: string;
    customer_phone: string;
    customer_name: string;
    problem: string;
    description: string;
    teknisi_job_id: string;
    idTelegram: string
}

export interface MetaData {
    total: number;
    page: number;
    pagination: number;
}

export interface HistoryTable {
    title: string;
    nik: string;
    page: string;
}

export interface ParamsUserReport extends ParamsProps {
    startDate: string;
    endDate: string;
}


export interface KpiUser {
    name: string,
    score: number,
}

export interface UserReportData {
    data: UserReport[];
    metadata: MetaData,
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
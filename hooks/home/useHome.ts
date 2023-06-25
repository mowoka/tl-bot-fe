
import React, { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { ErrrorMessage } from "../registers/useRegister";
import { FilterOptionsProps, MasterFilterOptions, ParamsProps } from "../teknisi-management/useTeknisiUser";
import dayjs from "dayjs";
import { useModalElement } from "../common/useModalElement";
import useSWR from "swr";
import { getUserTeknisiFilterMasterOptionsFetcher } from "./getMasterOptionsFetcher";
import { UserReportData, getUserTeknisiReportFetcher } from "./getUserTeknisiReportFetcher";

interface HomeProps {
    data: UserReportData;
    isLoading: boolean;
    errorMessage: ErrrorMessage;
    masterFilterOptions: MasterFilterOptions;
    masterFilterOptionsLoading: boolean;
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
    sector: [],
    witel: [],
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
    const { token } = useUser();
    const { open, handleClose, handleOpen } = useModalElement();
    const [data, setData] = useState<UserReportData>(intialUserReportData);
    const [masterFilterOptions, setMasterFilterOptionsData] = useState<MasterFilterOptions>(initialMasterFilter);
    const [params, setParams] = useState<ParamsUserReport>({
        teknisi_lead_id: '',
        partner_id: '',
        regional_id: '',
        sector_id: '',
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
            setParams((prev) => ({ ...prev, partner_id: e.target.value }))
        } else if (name === 'regional') {
            setParams((prev) => ({ ...prev, regional_id: e.target.value }))
        } else if (name === 'sector') {
            setParams((prev) => ({ ...prev, sector_id: e.target.value }))
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
            teknisi_lead_id: '',
            partner_id: '',
            regional_id: '',
            sector_id: '',
            startDate: dayjs(firstDay).format("YYYY-MM-DD").toString(),
            endDate: dayjs(lastDay).format("YYYY-MM-DD").toString(),
        })
    }

    const handleOpenTiketHistory = (title: string, nik: string) => {
        setHistoryTable((prev) => ({ ...prev, nik, title }))
        handleOpen();
    }


    const masterFilterOptionsRes = useSWR({
        url: process.env.BASE_URL_API + 'teknisi-user/master-filters',
        token: token
    },
        getUserTeknisiFilterMasterOptionsFetcher
    )

    const userTeknisiReportRes = useSWR({
        url: process.env.BASE_URL_API + 'teknisi-user/report',
        params: params,
        token: token,
    },
        getUserTeknisiReportFetcher,
    )

    useEffect(() => {
        if (!userTeknisiReportRes.data) return;
        setData(userTeknisiReportRes.data);
    }, [
        userTeknisiReportRes
    ])

    useEffect(() => {
        if (userTeknisiReportRes.error) {
            setErrorMessage({
                show: true,
                message: userTeknisiReportRes.error.message,
                status: "error"
            });
        }
    }, [userTeknisiReportRes.error])

    useEffect(() => {
        if (!masterFilterOptionsRes.data) return;
        const { data } = masterFilterOptionsRes;

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
    }, [masterFilterOptionsRes])

    // async function getUserTeknisiHistory() {
    //     setIsHitoryLoading(true);
    //     const URLParams = { nik: historyTable.nik, ticket_title: historyTable.title, page: historyTable.page }
    //     const res = await ApiFetchRaw<ResponseUserTeknisiHistory>(process.env.BASE_URL_API + 'teknisi-user/history?' + new URLSearchParams(URLParams), {
    //         headers: {
    //             'Authorization': `Bearer ${getToken()}`
    //         },
    //     })

    //     if (res.body.statusCode === 200) {
    //         setHistoryData(res.body.data);
    //     } else {
    //         setHistoryData({
    //             history: [],
    //             metadata: {
    //                 total: 0,
    //                 pagination: 1,
    //                 page: 1
    //             }
    //         })
    //         setErrorMessage({
    //             show: true,
    //             message: res.body.message,
    //             status: "error"
    //         });
    //     }
    //     setIsHitoryLoading(false);

    // }


    // async function getUserTeknisiReport() {
    //     setIsLoading(true);
    //     const URLParams = { ...params }
    //     const res = await ApiFetchRaw<UserReportData>(process.env.BASE_URL_API + 'teknisi-user/report?' + new URLSearchParams(URLParams), {
    //         headers: {
    //             'Authorization': `Bearer ${getToken()}`
    //         },
    //     })

    //     if (res.body.statusCode === 200) {
    //         setData(res.body.data);
    //     } else {
    //         setData(intialUserReportData);
    //         setErrorMessage({
    //             show: true,
    //             message: res.body.message,
    //             status: "error"
    //         });
    //     }
    //     setIsLoading(false);
    // }



    // useEffect(() => {
    //     getUserTeknisiReport();
    // }, [params])

    // useEffect(() => {
    //     getUserTeknisiFilterMaster();
    // }, [])

    // useEffect(() => {
    //     if (!historyTable.nik || !historyTable.title) return
    //     getUserTeknisiHistory();
    // }, [historyTable])

    return {
        data,
        isLoading: userTeknisiReportRes.isLoading,
        errorMessage,
        masterFilterOptions,
        masterFilterOptionsLoading: masterFilterOptionsRes.isLoading,
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

export interface ResponseUserTeknisiHistory {
    history: LaporLangsung[] | TutupOdp[] | TiketReguler[] | SQM[] | Proman[] | Unspect[] | Valins[] | TiketTeamLead[];
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


export default useHome;
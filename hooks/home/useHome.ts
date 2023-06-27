
import React, { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { ErrrorMessage } from "../registers/useRegister";
import { MasterFilterOptions, ParamsProps } from "../teknisi-management/useTeknisiUser";
import dayjs from "dayjs";
import { useModalElement } from "../common/useModalElement";
import useSWR from "swr";
import { getUserTeknisiFilterMasterOptionsFetcher } from "./getMasterOptionsFetcher";
import { UserReportData, getUserTeknisiReportFetcher } from "./getUserTeknisiReportFetcher";
import { ResponseUserTeknisiHistory, getTeknisiHistoryFetcher } from "./getTeknisiHistoryFetcher";
import { useRouter } from "next/router";

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
    handleOpenTiketHistory: (title: string, user_id: number) => void;
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

const initialHistoryData: ResponseUserTeknisiHistory = {
    history: [],
    metadata: {
        total: 0,
        page: 1,
        pagination: 1,
    }
}

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth(), 30);

const useHome = (): HomeProps => {
    const { token } = useUser();
    const router = useRouter();
    const { open, handleClose, handleOpen } = useModalElement();
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
        user_id: 0,
        page: '1',
    });

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

    const handleOpenTiketHistory = (title: string, user_id: number) => {
        setHistoryTable(prev => ({ ...prev, title, user_id }));
        handleOpen();
    }


    const masterFilterOptionsRes = useSWR(router.isReady && {
        url: process.env.BASE_URL_API + 'teknisi-user/master-filters',
        token: token
    },
        getUserTeknisiFilterMasterOptionsFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    const userTeknisiReportRes = useSWR(router.isReady && {
        url: process.env.BASE_URL_API + 'teknisi-user/report',
        params: params,
        token: token,
    },
        getUserTeknisiReportFetcher,
        {
            revalidateOnFocus: false,
        }
    )

    const userTeknisiHistory = useSWR(router.isReady && historyTable.title && {
        url: process.env.BASE_URL_API + 'teknisi-user/history',
        params: historyTable,
        token: token,
    },
        getTeknisiHistoryFetcher,
        {
            revalidateOnFocus: false
        }
    )

    useEffect(() => {
        if (!masterFilterOptionsRes.error) return;
        setErrorMessage({
            show: true,
            message: masterFilterOptionsRes.error.message,
            status: "error"
        });
    }, [masterFilterOptionsRes.error])

    useEffect(() => {
        if (!userTeknisiReportRes.error) return;

        setErrorMessage({
            show: true,
            message: userTeknisiReportRes.error.message,
            status: "error"
        });
    }, [userTeknisiReportRes.error])

    useEffect(() => {
        if (userTeknisiHistory.error) {
            setErrorMessage({
                show: true,
                message: userTeknisiHistory.error.message,
                status: "error"
            });
        }
    }, [userTeknisiHistory.error])

    return {
        data: userTeknisiReportRes.data ?? intialUserReportData,
        isLoading: userTeknisiReportRes.isLoading,
        errorMessage,
        masterFilterOptions: masterFilterOptionsRes.data ?? initialMasterFilter,
        masterFilterOptionsLoading: masterFilterOptionsRes.isLoading || !masterFilterOptionsRes.data,
        params,
        open,
        historyTable,
        isHistoryLoading: userTeknisiHistory.isLoading,
        historyData: userTeknisiHistory.data ?? initialHistoryData,
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
    user_id: number;
    page: string;
}

export interface ParamsUserReport extends ParamsProps {
    startDate: string;
    endDate: string;
}

export default useHome;
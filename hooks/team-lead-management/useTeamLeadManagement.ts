import { useEffect, useState } from "react";
import useUser from "../common/useUser";
import { FilterOptionsProps, MasterFilterOptions, MetaData } from "../teknisi-management/useTeknisiUser";
import { ErrrorMessage } from "../registers/useRegister";
import { getUserTeknisiFilterMasterOptionsFetcher } from "../teknisi-management/getUserTeknisiFilterMasterOptionsFetcher";
import useSWR from "swr";
import { getTeamLeadUserFetcher } from "./getTeamLeadUserFetcher";



interface TeamLeadManagement {
    params: TeamLeadParamsProps;
    data: TeamLeadUserResponse;
    masterFilterOptions: MasterFilterOptions;
    errorMessage: ErrrorMessage;
    isLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    resetParams: () => void;
    onCloseError: () => void;
}

const initialMasterFilter: MasterFilterOptions = {
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


export function useTeamLeadManagement(): TeamLeadManagement {
    const { getToken } = useUser();
    const [masterFilterOptions, setMasterFilterOptionsData] = useState<MasterFilterOptions>(initialMasterFilter);
    const [params, setParams] = useState<TeamLeadParamsProps>({
        partner_id: '',
        regional_id: '',
        sector_id: '',
    })
    // const [submitLoading, setSubmitLoading] = useState<boolean>(false)
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


    const FilterMasterOptions = useSWR({ url: process.env.BASE_URL_API + 'teknisi-user/master-filters?', token: getToken() }, getUserTeknisiFilterMasterOptionsFetcher)

    const teamLeadUserData = useSWR({ url: process.env.BASE_URL_API + 'team-lead-user?', params: params, token: getToken() }, getTeamLeadUserFetcher)

    useEffect(() => {
        if (!FilterMasterOptions.data?.data) return;
        const { data } = FilterMasterOptions.data;

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
    }, [
        FilterMasterOptions.data
    ])

    const isLoading = teamLeadUserData.isLoading;

    return {
        params,
        data: teamLeadUserData.data?.data ?? initialTeamLeadUser,
        masterFilterOptions,
        errorMessage,
        isLoading,
        onChange,
        resetParams,
        onCloseError
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
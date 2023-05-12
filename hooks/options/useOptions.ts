import { useState } from "react";
import { ErrrorMessage } from "../registers/useRegister";
import useSWR from "swr";
import useUser from "../common/useUser";
import { Sector, getSectorFetcher } from "./getSectorFetcher";
import { Witel, getWitelFetcher } from "./getWitelFetcher";
import { Partner, getPartnerFetcher } from "./getPartnerFetcher";
import { Regional, getRegionalFetcher } from "./getRegionalFetcher";

interface UseOptionsProps {
    title: string;
    errorMessage: ErrrorMessage;
    isLoading: boolean;
    sector: Sector[];
    partner: Partner[];
    witel: Witel[];
    regional: Regional[];
    handleOpenModal: (title: string) => void;
    onCloseError: () => void;
}

export function useOptions(): UseOptionsProps {
    const { getToken, } = useUser();
    const [title, setTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });

    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }

    const handleOpenModal = (title: string) => {
        setTitle(title);
    }

    const sector = useSWR(title === 'Sector' && { url: process.env.BASE_URL_API + 'sector', token: getToken() }, getSectorFetcher);
    const witel = useSWR(title === 'Witel' && { url: process.env.BASE_URL_API + 'witel', token: getToken() }, getWitelFetcher);
    const partner = useSWR(title === 'Partner' && { url: process.env.BASE_URL_API + 'partner', token: getToken() }, getPartnerFetcher);
    const regional = useSWR(title === 'Regional' && { url: process.env.BASE_URL_API + 'regional', token: getToken() }, getRegionalFetcher);

    return {
        sector: sector.data as Sector[],
        witel: witel.data as Witel[],
        partner: partner.data as Partner[],
        regional: regional.data as Regional[],
        title,
        errorMessage,
        isLoading: sector.isLoading || witel.isLoading || partner.isLoading || regional.isLoading,
        handleOpenModal,
        onCloseError

    }
}
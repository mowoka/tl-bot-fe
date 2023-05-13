import { useState } from "react";
import { ErrrorMessage } from "../registers/useRegister";
import useSWR from "swr";
import useUser from "../common/useUser";
import { Sector, getSectorFetcher } from "./getSectorFetcher";
import { Witel, getWitelFetcher } from "./getWitelFetcher";
import { Partner, getPartnerFetcher } from "./getPartnerFetcher";
import { Regional, getRegionalFetcher } from "./getRegionalFetcher";
import { ApiFetchRaw } from "@app/core/clients/apiFetch";

interface UseOptionsProps {
    title: string;
    errorMessage: ErrrorMessage;
    isLoading: boolean;
    sector: Sector[];
    partner: Partner[];
    witel: Witel[];
    regional: Regional[];
    name: string;
    handleOpenModal: (title: string) => void;
    onCloseError: () => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submit: () => void;
}

export function useOptions(): UseOptionsProps {
    const { getToken, } = useUser();
    const [title, setTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const [name, setName] = useState<string>('');
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }

    const handleOpenModal = (title: string) => {
        setTitle(title);
        setName('');
    }

    async function submitSector() {
        const data = {
            'name': name,
        }
        const res = await ApiFetchRaw(process.env.BASE_URL_API + 'sector', {
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
            sector.mutate();
            setName('');
        } else {
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
    }

    async function submitWitel() {
        const data = {
            'name': name,
        }
        const res = await ApiFetchRaw(process.env.BASE_URL_API + 'witel', {
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
            witel.mutate();
            setName('');
        } else {
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
    }

    async function submitPartner() {
        const data = {
            'name': name,
        }
        const res = await ApiFetchRaw(process.env.BASE_URL_API + 'partner', {
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
            partner.mutate();
            setName('');
        } else {
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
    }

    async function submitRegional() {
        const data = {
            'name': name,
        }
        const res = await ApiFetchRaw(process.env.BASE_URL_API + 'regional', {
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
            regional.mutate();
            setName('');
        } else {
            setErrorMessage({
                show: true,
                message: res.body.message,
                status: "error"
            });
        }
    }

    const submit = async () => {
        if (!name) {
            setErrorMessage({
                show: true,
                message: 'Please input Name',
                status: "error"
            });
        } else {
            setSubmitLoading(true);

            if (title === 'Sector') {
                await submitSector();
            } else if (title === 'Witel') {
                await submitWitel();
            } else if (title === 'Partner') {
                await submitPartner();
            } else if (title === 'Regional') {
                await submitRegional();
            } else {
                // handle bila mana melakukan submit tapi tidak ada title
                setErrorMessage({
                    show: true,
                    message: 'Something went wrong',
                    status: "error"
                });
            }
            setSubmitLoading(false);
        }

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
        name,
        isLoading: sector.isLoading || witel.isLoading || partner.isLoading || regional.isLoading || submitLoading,
        handleOpenModal,
        onCloseError,
        handleOnChange,
        submit
    }
}
import { useEffect, useState } from "react";

interface UseTokenProps {
    token: string;
}

export function useToken(): UseTokenProps {
    const [token, setToken] = useState('');

    const getToken = (): string => {
        try {
            const persistStr = window.sessionStorage.getItem('persist:root');
            const persists = persistStr ? JSON.parse(persistStr) : ''
            if (persists) return persists.userToken
            return ''
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    useEffect(() => {
        const token = getToken();
        setToken(token);
    }, [])


    return {
        token: token,
    }
}
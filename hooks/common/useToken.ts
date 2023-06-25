import { useEffect, useState } from "react";
import { SESSION_KEY } from "./useUser";

interface UseTokenProps {
    token: string;
}

export function useToken(): UseTokenProps {
    const [token, setToken] = useState('');



    useEffect(() => {
        const persistStr = localStorage.getItem(SESSION_KEY);
        const persists = persistStr ? JSON.parse(persistStr) : ''
        if (persists) {
            setToken(persists.userToken);
        } else {
            setToken('')
        }
    }, [token])


    useEffect(() => {
        const persistStr = localStorage.getItem(SESSION_KEY);
        const persists = persistStr ? JSON.parse(persistStr) : ''
        if (persists) {
            setToken(persists.userToken);
        } else {
            setToken('')
        }

    }, [])

    return {
        token: token,
    }
}
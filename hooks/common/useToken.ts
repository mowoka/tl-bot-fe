import { useEffect, useState } from "react";
import { SESSION_KEY } from "./useUser";
import { useRouter } from "next/router";

interface UseTokenProps {
    token: string;
}

export function useToken(): UseTokenProps {
    const router = useRouter();
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
        if (!router.isReady) return;
        const persistStr = localStorage.getItem(SESSION_KEY);
        const persists = persistStr ? JSON.parse(persistStr) : ''
        if (persists) {
            setToken(persists.userToken);
        } else {
            setToken('')
        }

    }, [router])

    return {
        token: token,
    }
}
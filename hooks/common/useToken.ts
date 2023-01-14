import { useRouter } from "next/router";
import { useEffect, useState } from "react";


interface UseTokenProps {
    token: string;
}

export function useToken(): UseTokenProps {
    const router = useRouter();
    const [token, setToken] = useState<string>('');

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



    return {
        token: getToken(),
    }
}
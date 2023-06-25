import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SESSION_KEY } from "./useUser";


interface UseGuardProps {
    isAuthenticate: boolean;
}

export function useGuard(): UseGuardProps {
    const router = useRouter();

    const [isAuthenticate, setIsAuthenticate] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        const persistStr = localStorage.getItem(SESSION_KEY);
        const persists = persistStr ? JSON.parse(persistStr) : ''
        if (persists.isAuthenticate) {
            setIsAuthenticate(true);
        } else {
            setIsAuthenticate(false)
            router.push("/accounts/login");
        }

    }, [router])

    return {
        isAuthenticate
    }
}
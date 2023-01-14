import { useRouter } from "next/router";
import { useEffect, useState } from "react";


interface UseGuardProps {
    isAuthenticate: boolean;
}

export function useGuard(): UseGuardProps {
    const router = useRouter();

    const [isAuthenticate, setIsAuthenticate] = useState(false);

    const checkAuthenticate = () => {
        if (typeof window !== undefined) {
            try {
                const persistStorage = window.sessionStorage.getItem('persist:root');
                if (!persistStorage) {
                    return false;
                } else {
                    const persist = JSON.parse(persistStorage);
                    if (!persist.isAuthenticate) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        const checkIsAuthenticate = checkAuthenticate();
        if (checkIsAuthenticate === false) {
            setIsAuthenticate(false)
            router.push("/accounts/login");
        } else {
            setIsAuthenticate(true)
            return
        }
    }, [])

    return {
        isAuthenticate
    }
}
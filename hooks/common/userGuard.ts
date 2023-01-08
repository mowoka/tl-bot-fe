import { useRouter } from "next/router";
import { useEffect } from "react";

export function useGuard() {
    const router = useRouter();

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
        const isAuthenticate = checkAuthenticate();
        if (isAuthenticate === false) {
            router.push("/accounts/login");
        } else {
            return
        }
    }, [])


}
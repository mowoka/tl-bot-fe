import { useRouter } from "next/router";

export function useGuard() {
    const router = useRouter();

    const checkAuthenticate = () => {
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

    const isAuthenticate = checkAuthenticate();
    if (!router.isReady) return;
    if (isAuthenticate === false) {
        router.push("/accounts/login");
    }
}
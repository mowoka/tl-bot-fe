import { UserProfile } from "./useUser";

interface UseProfileProps {
    getProfile: () => UserProfile | {};
}

export function useProfile(): UseProfileProps {

    const getProfile = (): UserProfile | {} => {
        try {
            const persistStorage = window.sessionStorage.getItem('ION-profile');
            if (!persistStorage) {
                return {}
            } else {
                const persist = JSON.parse(persistStorage);
                if (!persist.userProfile) {
                    return {}
                } else {
                    return persist.userProfile;
                }
            }
        } catch (error) {
            console.error(error);
            return {}
        }
    }

    return {
        getProfile,
    }

}
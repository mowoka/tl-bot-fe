import { useEffect, useState } from "react";
import { UserProfile } from "./useUser";

interface UseProfileProps {
    profile: UserProfile
}

const initialProfile: UserProfile = {
    nik: '',
    name: '',
    idTelegram: '',
    partner: '',
    sector: '',
    witel: '',
    regional: '',
    role: ''
}

export function useProfile(): UseProfileProps {

    const [profile, setProfile] = useState<UserProfile>(initialProfile)

    const getProfile = (): UserProfile => {
        try {
            const persistStorage = window.sessionStorage.getItem('ION-profile');
            if (!persistStorage) {
                return initialProfile
            } else {
                const persist = JSON.parse(persistStorage);
                if (!persist.userProfile) {
                    return initialProfile
                } else {
                    const userProfile = JSON.parse(persist.userProfile)
                    const profile: UserProfile = {
                        nik: userProfile.nik,
                        name: userProfile.name,
                        idTelegram: userProfile.idTelegram,
                        partner: userProfile.partner,
                        sector: userProfile.sector,
                        witel: userProfile.witel,
                        regional: userProfile.regional,
                        role: userProfile.role
                    }

                    return profile
                }
            }
        } catch (error) {
            console.error(error);
            return initialProfile
        }
    }

    useEffect(() => {
        const profileValue = getProfile();
        setProfile(profileValue);
    }, [])


    return {
        profile
    }

}
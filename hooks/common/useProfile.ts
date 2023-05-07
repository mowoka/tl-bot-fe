import { useEffect, useState } from "react";
import { UserProfile } from "./useUser";

interface UseProfileProps {
    profile: UserProfile
}

const initialProfile: UserProfile = {
    nik: '',
    name: '',
    role: '',
    partner: '',
    sector: '',
    witel: '',
    regional: '',
}

export function useProfile(): UseProfileProps {

    const [profile, setProfile] = useState<UserProfile>(initialProfile)

    const getProfile = (): UserProfile => {
        if (typeof window !== undefined) {
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
                            role: userProfile.role,
                            partner: userProfile.partner.name,
                            sector: userProfile.sector.name,
                            witel: userProfile.witel.name,
                            regional: userProfile.regional.name,
                        }

                        return profile
                    }
                }
            } catch (error) {
                console.error(error);
                return initialProfile
            }
        } else {
            return initialProfile;
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
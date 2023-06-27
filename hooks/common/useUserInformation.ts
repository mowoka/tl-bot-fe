import { useEffect, useState } from "react";
import { SESSION__PROFILE_KEY } from "./useUser";
import { useRouter } from "next/router";


export interface UserInformation {
    role: string;
    id: number;
}

export interface UserInformationHooks {
    userInformation: UserInformation
}

export function useUserInformation(): UserInformationHooks {
    const router = useRouter();
    const [userInformation, setUserInformation] = useState<UserInformation>({ role: '', id: 0 });

    useEffect(() => {
        if (!router.isReady) return;
        const persistStr = localStorage.getItem(SESSION__PROFILE_KEY);
        const persists = persistStr ? JSON.parse(persistStr) : ''
        if (!persists) {
            setUserInformation({ role: '', id: 0 });
        } else {
            const userProfile = JSON.parse(persists.userProfile);
            if (!userProfile) {
                setUserInformation({ role: '', id: 0 });
            } else {
                setUserInformation({ role: userProfile.role, id: userProfile.id });
            }
        }
    }, [router]);

    return {
        userInformation: userInformation
    }
}

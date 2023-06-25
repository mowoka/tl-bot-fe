import { useEffect, useState } from "react";
import { SESSION__PROFILE_KEY } from "./useUser";


export interface UserInformation {
    role: string;
    id: number;
}

export interface UserInformationHooks {
    userInformation: UserInformation
}

export function useUserInformation(): UserInformationHooks {
    const [userInformation, setUserInformation] = useState<UserInformation>({ role: '', id: 0 });


    useEffect(() => {
        const persistStr = localStorage.getItem(SESSION__PROFILE_KEY);
        const persists = persistStr ? JSON.parse(persistStr) : ''
        if (!persists) setUserInformation({ role: '', id: 0 });
        const userProfile = JSON.parse(persists.userProfile);
        if (!userProfile) setUserInformation({ role: '', id: 0 });
        setUserInformation({ role: userProfile.role, id: userProfile.id });
    }, []);

    return {
        userInformation: userInformation
    }
}

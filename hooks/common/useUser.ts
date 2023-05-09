import { useRouter } from "next/router";
import { ApiFetchRaw } from "../../core/clients/apiFetch";

export interface UserProfile {
    id: number;
    nik: string;
    name: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
    role: string;
}

interface LoginResponse {
    statusCode: number;
    message: string;
}

interface LoginApiResponse {
    access_token: string;
}

export interface UserProps {
    login: (nik: string, password: string) => Promise<LoginResponse>;
    logout: () => void;
    getToken: () => string;
    getUserInformation: () => { role: string, id: number };
}

const SESSION_KEY = 'persist:root';
const SESSION__PROFILE_KEY = 'ION-profile';

function useUser(): UserProps {
    const router = useRouter();

    const login = async (nik: string, password: string): Promise<LoginResponse> => {
        const resLogin = await ApiFetchRaw<LoginApiResponse>(process.env.BASE_URL_API + 'auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nik,
                password
            }),
        })
        const { body } = resLogin;
        if (body.statusCode == 200) {
            await saveTokenToLocalStorage(body.data.access_token);
            await getMe(body.data.access_token);
            return {
                statusCode: 200,
                message: body.message,
            }
        } else {
            return {
                ...body
            }
        }
    }

    const getMe = async (token: string) => {
        const res = await ApiFetchRaw<UserProfile>(process.env.BASE_URL_API + 'users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if (res.status == 200) {
            saveProfileToLocalStorage(res.body.data);
        }
    }

    const logout = () => {
        try {
            if (window !== undefined) {
                window.sessionStorage.removeItem(SESSION_KEY);
                window.sessionStorage.removeItem(SESSION__PROFILE_KEY);
                router.push('/accounts/login');
            }
        } catch (e) {
            console.error(e);
        }
    }


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

    const getUserInformation = (): { role: string, id: number } => {
        try {
            const persistStr = window.sessionStorage.getItem(SESSION__PROFILE_KEY);
            const persists = persistStr ? JSON.parse(persistStr) : ''
            if (!persists) throw new Error('no profile data');
            const userProfile = JSON.parse(persists.userProfile);
            if (!userProfile) throw new Error('no user profile data');
            return { role: userProfile.role, id: userProfile.id }
        } catch (e) {
            console.error(e);
            return { role: '', id: 0 }
        }
    }

    const saveProfileToLocalStorage = (profile: UserProfile) => {
        try {
            if (window !== undefined) {
                const persistStr = window.sessionStorage.getItem(SESSION__PROFILE_KEY);
                const persist = persistStr ? JSON.parse(persistStr) : {
                    userProfile: '{"nik":null,"name":null,"partner":null,"sector":null,"witel":null,"regional":null,"role":null,user}',
                }
                persist.userProfile = JSON.stringify(profile);
                window.sessionStorage.setItem(SESSION__PROFILE_KEY, JSON.stringify(persist));
            }
        } catch (e) {
            console.error('error save profile', e)
        }
    }

    const saveTokenToLocalStorage = async (token: string) => {
        try {
            if (window !== undefined) {
                const persistStr = window.sessionStorage.getItem(SESSION_KEY);
                const persist = persistStr ? JSON.parse(persistStr) :
                    {
                        userToken: null,
                        isAuthenticate: false,
                        _persist: '{"version":-1,"rehydrated":true}',
                    }
                persist.userToken = token;
                persist.isAuthenticate = true;
                window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(persist));
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        login,
        logout,
        getToken,
        getUserInformation,
    }
}


export default useUser;

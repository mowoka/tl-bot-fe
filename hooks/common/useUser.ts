import { ApiFetchRaw } from "../../core/clients/apiFetch";

interface UserProfile {
    "nik": string,
    "name": string,
    "idTelegram": string,
    "partner": string,
    "sector": string,
    "witel": string,
    "regional": string,
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
}

function useUser(): UserProps {

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
            saveTokenToLocalStorage(body.data.access_token);
            return {
                statusCode: 200,
                message: body.message,
            }
            // logic for set session storage
        } else {
            if (body.statusCode == 403) {
                return {
                    statusCode: body.statusCode,
                    message: body.message,
                }
            } else {
                return {
                    statusCode: body.statusCode,
                    message: body.message.length ? body.message[0] : '',
                }
            }
        }
    }

    const logout = async () => {
        try {
            window.sessionStorage.removeItem('persist:root');
        } catch (e) {
            console.error(e);
        }
    }

    const saveTokenToLocalStorage = (token: string) => {
        try {
            const sessionKey = 'persist:root';
            const persistStr = window.sessionStorage.getItem(sessionKey);
            const persist = persistStr ? JSON.parse(persistStr) :
                {
                    userProfile: '{"nik":null,"name":null,"idTelegram":null,"partner":null,"sector":null,"witel":null,"regional":null}',
                    userToken: null,
                    _persist: '{"version":-1,"rehydrated":true}',
                }
            persist.userToken = token;
            window.sessionStorage.setItem(sessionKey, JSON.stringify(persist));
        } catch (e) {
            console.error(e);
        }
    }

    return {
        login,
    }

}


export default useUser;

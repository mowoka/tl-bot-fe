import { useRouter } from "next/router";
import React, { useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";

export interface RegisterRootProps {
    nik: string;
    name: string;
    idTelegram: string;
    partner: string;
    sector: string;
    witel: string;
    regional: string;
    password: string
    confirmPassword: string;
}

export interface ErrrorMessage {
    show: boolean;
    message: string;
    status: "error" | "warning" | "info" | "success";
}

interface useRegisterProps {
    registerRoot: RegisterRootProps;
    errorMessage: ErrrorMessage;
    nik: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
    onValidateNik: () => void;
    onSubmit: () => void;
    onCloseError: () => void;
}

function useRegister(): useRegisterProps {
    const [nik, setNik] = useState<string>('');
    const [registerRoot, setRegisterRoot] = useState<RegisterRootProps>({
        nik: '',
        name: '',
        idTelegram: '',
        partner: '',
        sector: '',
        witel: '',
        regional: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });

    const router = useRouter();

    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }

    const onValidateNik = async () => {
        if (!nik) {
            setErrorMessage({
                show: true,
                message: 'NIK field required',
                status: 'info'
            })
        } else {
            if (nik.length < 16) {
                setErrorMessage({
                    show: true,
                    message: 'Minimal NIK character 16',
                    status: 'info'
                })
            } else {
                // logic for validate nik
                const data = JSON.stringify({
                    "nik": nik,
                })
                const resValidateNik = await ApiFetchRaw(process.env.BASE_URL_API + 'auth/validate', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                const { body } = resValidateNik;
                if (body.success == true) {
                    setRegisterRoot((prev) => ({ ...prev, nik: nik }));
                } else {
                    setErrorMessage({
                        show: true,
                        message: body.message,
                        status: 'info'
                    })
                }
            }
        }

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, desc: string) => {
        if (desc === 'nik') {
            setNik(e.target.value);
        } else if (desc === 'name') {
            setRegisterRoot((prev) => ({ ...prev, name: e.target.value }));
        } else if (desc === 'idTelegram') {
            setRegisterRoot((prev) => ({ ...prev, idTelegram: e.target.value }));
        } else if (desc === 'partner') {
            setRegisterRoot((prev) => ({ ...prev, partner: e.target.value }));
        } else if (desc === 'sector') {
            setRegisterRoot((prev) => ({ ...prev, sector: e.target.value }));
        } else if (desc === 'witel') {
            setRegisterRoot((prev) => ({ ...prev, witel: e.target.value }));
        } else if (desc === 'regional') {
            setRegisterRoot((prev) => ({ ...prev, regional: e.target.value }));
        } else if (desc === 'password') {
            setRegisterRoot((prev) => ({ ...prev, password: e.target.value }));
        } else if (desc === 'confirm_password') {
            setRegisterRoot((prev) => ({ ...prev, confirmPassword: e.target.value }));
        }

    }

    const onSubmit = async () => {
        if (registerRoot.confirmPassword !== registerRoot.password) {
            setErrorMessage({
                show: true,
                message: 'Password must be same',
                status: 'info'
            });
        } else {
            const resRegisterAccount = await ApiFetchRaw(process.env.BASE_URL_API + 'auth/signup', {
                method: 'POST',
                body: JSON.stringify(registerRoot),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            const { body } = resRegisterAccount;
            if (body.statusCode === 200) {
                router.push('/accounts/login')
            } else {
                setErrorMessage({
                    show: true,
                    message: body.message.length ? body.message[0] : '',
                    status: 'info'
                });
            }
        }
    }

    return {
        registerRoot,
        errorMessage,
        nik,
        onChange,
        onValidateNik,
        onSubmit,
        onCloseError
    }

}

export default useRegister;
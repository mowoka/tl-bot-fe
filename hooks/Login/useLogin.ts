import React, { useState } from "react";
import { ApiFetchRaw } from "../../core/clients/apiFetch";
import { ErrrorMessage } from "../register/useRegister";

interface useLoginProps {
    nik: string;
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
    onSubmit: () => void;
    errorMessage: ErrrorMessage;
    onCloseError: () => void;
}

function useLogin(): useLoginProps {
    const [nik, setNik] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });

    const onCloseError = () => {
        setErrorMessage((prev) => ({ ...prev, show: false }))
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>, desc: string) => {
        if (desc !== 'password') {
            setNik(e.target.value);
        } else {
            setPassword(e.target.value)
        }
    }

    const onSubmit = async () => {
        const resLogin = await ApiFetchRaw(process.env.BASE_URL_API + 'auth/signin', {
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
            console.log('success');
        } else {
            if (body.statusCode == 403) {
                setErrorMessage({
                    show: true,
                    message: body.message,
                    status: "error"
                });
            } else {
                setErrorMessage({
                    show: true,
                    message: body.message.length ? body.message[0] : '',
                    status: "error"
                });
            }
        }
    }


    return {
        nik,
        password,
        onChange,
        onSubmit,
        onCloseError,
        errorMessage,
    }
}

export default useLogin;
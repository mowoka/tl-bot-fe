import React, { useState } from "react";
import { ErrrorMessage } from "../registers/useRegister";
import useUser from "../common/useUser";
import { useRouter } from "next/router";

interface useLoginProps {
    nik: string;
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
    onSubmit: () => void;
    errorMessage: ErrrorMessage;
    onCloseError: () => void;
}

export function useLogin(): useLoginProps {
    const [nik, setNik] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<ErrrorMessage>({
        show: false,
        message: '',
        status: "info"
    });
    const router = useRouter();

    const { login } = useUser();

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
        const res = await login(nik, password);
        if (res.statusCode == 200) {
            router.push('/');
        } else {
            setErrorMessage({
                show: true,
                message: res.message,
                status: "error"
            });
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

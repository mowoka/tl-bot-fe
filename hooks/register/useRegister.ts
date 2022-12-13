import React, { useState } from "react";

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

interface useRegisterProps {
    registerRoot: RegisterRootProps;
    nik: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
    onValidateNik: () => void;
    onSubmit: () => void;
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


    const onValidateNik = () => {
        console.log(nik)
        // logic for validate nik
        setRegisterRoot((prev) => ({ ...prev, nik: nik }));
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

    const onSubmit = () => {
        // add logic if password not same
    }

    return {
        registerRoot,
        nik,
        onChange,
        onValidateNik,
        onSubmit,
    }

}

export default useRegister;
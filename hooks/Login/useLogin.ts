import React, { useState } from "react";

interface useLoginProps {
    nik: string;
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
    onSubmit: () => void;
}

function useLogin(): useLoginProps {
    const [nik, setNik] = useState('');
    const [password, setPassword] = useState('');


    const onChange = (e: React.ChangeEvent<HTMLInputElement>, desc: string) => {
        if (desc !== 'password') {
            setNik(e.target.value);
        } else {
            setPassword(e.target.value)
        }
    }

    const onSubmit = () => {
        console.log({ nik, password });
    }


    return {
        nik,
        password,
        onChange,
        onSubmit
    }
}

export default useLogin;
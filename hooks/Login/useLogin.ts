import React, { useState } from "react";

interface useLoginProps {
    email: string;
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, desc: string) => void;
    onSubmit: () => void;
}

function useLogin(): useLoginProps {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onChange = (e: React.ChangeEvent<HTMLInputElement>, desc: string) => {
        if (desc !== 'password') {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value)
        }
    }

    const onSubmit = () => {
        console.log({ email, password });
    }


    return {
        email,
        password,
        onChange,
        onSubmit
    }
}

export default useLogin;
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

const Login = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/sign-in').then(() => {
        });
    })

};

export default Login;

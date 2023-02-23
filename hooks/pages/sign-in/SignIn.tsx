import React, {useEffect} from "react";
import {Form, Schema} from "rsuite";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "@/store/store";
import {AnyAction} from "@reduxjs/toolkit";
import {login} from "@/store/reducers/User/UserThunks";
import {UserState} from "@/store/reducers/User/types";
import {useRouter} from "next/router";

export const {StringType, NumberType} = Schema.Types;

export const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.'),
});

export interface FormValues {
    email: string;
    password: string;
}


const useSignIn = () => {
    const router = useRouter();
    const userState: UserState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (userState.auth.data.isAuthenticated) {
            router.push('/home').then(() => {
            });
        } else {

        }
    });

    const formRef = React.useRef<React.ElementRef<typeof Form>>(null);
    const [formValue, setFormValue] = React.useState<FormValues>({
        email: '',
        password: '',
    });
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

    const handleSubmit = () => {
        const resultCheck = formRef.current?.check();
        if (!resultCheck) {
            return;
        }
        dispatch(login({email: formValue.email, password: formValue.password}));
    };

    return {formValue, setFormValue, handleSubmit, formRef}
}

export default useSignIn;
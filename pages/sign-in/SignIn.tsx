import React from 'react';
import {Button, Divider, Form, IconButton, Panel, Schema, Stack} from 'rsuite';
import GithubIcon from '@rsuite/icons/legacy/Github';
import FacebookIcon from '@rsuite/icons/legacy/Facebook';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import Brand from "../../components/Brand";
import Link from "next/link"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";

const { StringType, NumberType } = Schema.Types;


const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.'),
});

interface FormValues {
    email: string;
    password: string;
}

const SignIn = () => {
    const formRef = React.useRef<React.ElementRef<typeof Form>>(null);
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState<FormValues>({
        email: '',
        password: '',
    });
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userState = useSelector((state: RootState) => state.user);
    const handleSubmit = () => {
        debugger;
        console.log("Here")
        const resultCheck = formRef.current?.check();
        if (!resultCheck) {
            console.error('Form Error');
            return;
        }
        console.log(formValue, 'Form Value');
    };
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{
                height: '100vh'
            }}
        >
            <Brand style={{marginBottom: 10}}/>

            <Panel bordered style={{background: '#fff', width: 400}} header={<h3>Sign In</h3>}>
                <p style={{marginBottom: 10}}>
                    <span className="text-muted">New Here? </span>{' '}
                    <Link href="/sign-up"> Create an Account</Link>
                </p>

                <Form fluid
                      ref={formRef}
                      onChange={(value, event) => setFormValue(value as FormValues)}
                      onCheck={setFormError}
                      formValue={formValue}
                      model={model}>
                    <Form.Group>
                        <Form.ControlLabel>Email address</Form.ControlLabel>
                        <Form.Control name="email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>
                            <span>Password</span>
                            <a style={{float: 'right'}}>Forgot password?</a>
                        </Form.ControlLabel>
                        <Form.Control name="password" type="password"/>
                    </Form.Group>
                    <Form.Group>
                        <Stack spacing={6} divider={<Divider vertical/>}>
                            <Button onClick={handleSubmit} appearance="primary">Sign in</Button>
                            <Stack spacing={6}>
                                <IconButton icon={<WechatIcon/>} appearance="subtle"/>
                                <IconButton icon={<GithubIcon/>} appearance="subtle"/>
                                <IconButton icon={<FacebookIcon/>} appearance="subtle"/>
                                <IconButton icon={<GoogleIcon/>} appearance="subtle"/>
                            </Stack>
                        </Stack>
                    </Form.Group>
                </Form>
            </Panel>
        </Stack>
    );
};

export default SignIn;


